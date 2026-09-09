# SlimShadey 2.0

**A browser-based application for interactive visualization, annotation, and figure preparation of multiple sequence alignments.**

SlimShadey 2.0 is a complete reimplementation of the [original SlimShadey](https://github.com/shaha65/slim-shadey) desktop application as a zero-installation web app. Alignments are rendered on the GPU via WebGL2, keeping panning, recoloring, and selection responsive regardless of alignment size. The program runs entirely client-side. No account, no server, no data ever leaves your machine.

**[Try it here](https://slimshadey.adsbio.net)** · **Read the [user manual](https://slimshadey-manual.adsbio.net)**

## Features

### Shading

- **Standard** — editable per-residue color schemes with automatic nucleotide/protein detection and a global luminance control for automatic text contrast
- **ClustalX** — the original amino acid color-scheme provided by ClustalX's UI
- **Frequency** — shade residues by column frequency against a tunable threshold, with optional inversion
- **Uniqueness** — highlight residues that occur at most *n* times in a column, with optional gap shading
- **Substitution matrix** — shade against a reference sequence or the column majority using any matrix from the built-in BLOSUM, PAM, and Gonnet families, with a continuous color gradient between perfect match and absolute mismatch
- **By sequence** — independent colors for identity, similarity, and difference relative to a reference sequence, with optional similarity-based row sorting
- **Regex** — highlight arbitrary regular-expression patterns across all sequences, any number of patterns simultaneously, each with its own color
- **ScanProsite** — a fully client-side implementation of the PROSITE pattern-scanning algorithm: the entire PROSITE database is retrieved once, cached locally, and evaluated against every sequence in the alignment, with an interactive color legend per signature
- **Clear shading** — reset all shading with one click

### Editing and selection

- Direct cell editing (character and background color) in the alignment, annotation rows, and consensus row
- Column-range selection by drag with edge auto-scroll (long-press and drag on touch devices)
- Selected columns can be deleted, exported to a new tab, or rendered as a sequence logo
- On-demand consensus generation (simple majority or dots-and-identity)
- Add, remove, reorder, rename, and recolor annotation tracks; rename, reorder, and delete sequences

### Output

- **Print preview** — render the alignment in configurable blocks (columns per row, font size, name width, numbering interval, optional annotation and consensus tracks) and export high-resolution, publication-quality PNGs
- **Sequence logos** — PNG export with optional small-sample error correction
- **RTF export** — fully colored alignment in a document format
- **FASTA export** and a native `.slim` project format that preserves sequences, annotations, per-cell colors, and view settings

### Portability

Works on all operating systems, including mobile. Touch gestures provide panning, column selection, and layout adjustment. Multiple alignments can be open simultaneously in a tabbed interface.

## Getting started

You can use SlimShadey 2.0 by visiting [SlimShadey](https://slimshadey.adsbio.net).

No build step is required. Clone the repository and open `index.html` in a browser, or serve the directory with any static file server.

Alignments load from FASTA files, shareable .slim format project files, or from the bundled example datasets.

## License

GNU GPL v3.

## Citation

If you use SlimShadey 2.0 in published work, please cite:

> [Citation to be added.]
