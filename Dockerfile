ARG BASE_IMAGE_MERMAID_BUILDER=node
ARG NODE_VERSION=12
ARG BASE_IMAGE_HTTP_BUILDER=golang
ARG GO_VERSION=1.13
ARG ALPINE_VERSION=3.10

FROM node:${NODE_VERSION}-alpine AS mermaid-builder
RUN apk add --update --no-cache -q --progress util-linux
WORKDIR /tmp
COPY . .
RUN npm install
RUN yarn release
RUN rm docs/*.map

FROM ${BASE_IMAGE_HTTP_BUILDER}:${GO_VERSION}-alpine${ALPINE_VERSION} AS http-builder
ARG GOARCH=amd64
ARG GOARM
RUN apk --update add git build-base
WORKDIR /tmp
RUN printf "package main\n\nimport \"net/http\"\n\nfunc main() {\n	http.Handle(\"/\", http.FileServer(http.Dir(\"/srv\")))\n	http.ListenAndServe(\":8000\", nil)\n}" > main.go
RUN CGO_ENABLED=0 GOOS=linux GOARCH=${GOARCH} GOARM=${GOARM} go build -ldflags="-s -w" -o app

FROM scratch
ARG BUILD_DATE
ARG VCS_REF
LABEL \
    org.opencontainers.image.authors="quentin.mcgaw@gmail.com" \
    org.opencontainers.image.created=$BUILD_DATE \
    org.opencontainers.image.version="" \
    org.opencontainers.image.revision=$VCS_REF \
    org.opencontainers.image.url="https://github.com/mermaidjs/mermaid-live-editor" \
    org.opencontainers.image.documentation="https://github.com/mermaidjs/mermaid-live-editor/blob/master/README.md" \
    org.opencontainers.image.source="https://github.com/mermaidjs/mermaid-live-editor" \
    org.opencontainers.image.title="Mermaid" \
    org.opencontainers.image.description="Generation of diagram and flowchart from text in a similar manner as markdown"
ENTRYPOINT ["/server"]
EXPOSE 8000
COPY --from=http-builder --chown=1000 /tmp/app /server
COPY --from=mermaid-builder --chown=1000 /tmp/docs/ /srv/
USER 1000
