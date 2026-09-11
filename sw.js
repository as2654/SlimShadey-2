// sw.js — streams export downloads straight to the browser's download manager,
// bypassing the File System Access API (and its .crswap commit step) entirely.
//
// Protocol with the page:
//   page -> SW : { url, filename } + a MessagePort, registered in `pending`
//   SW -> page : { registered: true } ack — the page clicks the anchor only
//                after this, so the fetch can never race the registration
//   a <a download> navigation to `url` triggers the fetch listener
//   SW pulls: every pull() asks the page for exactly one chunk ({ next: true }),
//   so a 10GB export never accumulates in memory anywhere
//   page -> SW : { chunk: Uint8Array } per pull, { done: true } to finish
//   user cancels the download -> SW posts { cancelled: true } and closes the port

const pending = new Map();

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("message", (e) => {
  const data = e.data || {};
  if (!data.url || !e.ports[0]) return;
  pending.set(data.url, { port: e.ports[0], filename: data.filename });
  e.ports[0].postMessage({ registered: true }); // ack: safe to click now
});

self.addEventListener("fetch", (e) => {
  const entry = pending.get(e.request.url);
  if (!entry) return; // not ours — let it through
  pending.delete(e.request.url);
  const { port, filename } = entry;

  const stream = new ReadableStream({
    pull(controller) {
      return new Promise((resolve) => {
        port.onmessage = (me) => {
          const msg = me.data || {};
          if (msg.done) {
            controller.close();
            port.close();
          } else {
            controller.enqueue(msg.chunk);
          }
          resolve();
        };
        port.postMessage({ next: true }); // ask page for next chunk
      });
    },
    cancel() {
      port.postMessage({ cancelled: true });
      port.close();
    }
  });

  e.respondWith(
    new Response(stream, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${String(filename).replace(/"/g, "")}"`
      }
    })
  );
});
