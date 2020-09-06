
# Development has moved to https://github.com/mermaid-js/mermaid-live-editor

# mermaid-live-editor

Edit, preview and share mermaid charts/diagrams.


## Features

- edit and preview flowcharts, sequence diagrams, gantt diagrams in real time.
- save the result as a svg
- get a link to a viewer of the diagram so that you can share it with others.
- get a link to edit the diagram so that someone else can tweak it and send a new link back


## Setup

Setup is simple.

```
yarn install
```

Or run an HTTP server with Docker

```sh
docker build -t mermaidjs/mermaid-live-editor https://github.com/mermaidjs/mermaid-live-editor.git
docker run -d -p 8000:8000 mermaidjs/mermaid-live-editor
```

And access it at [http://localhost:8000](http://localhost:8000)


## Development

```
yarn dev
open http://localhost:1234
```

This app is created with React + React Router v4.


## Release

```
yarn release
```
