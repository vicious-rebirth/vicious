FROM docker.io/node:22-alpine AS base

RUN apk update

RUN corepack enable

FROM base AS prune

RUN pnpm dlx turbo --version

USER node

WORKDIR /repo

COPY --chown=node:node . .

RUN    pnpm dlx turbo prune --docker --out-dir pruned-animation @repo/animation \
    && pnpm dlx turbo prune --docker --out-dir pruned-audio @repo/audio \
    && pnpm dlx turbo prune --docker --out-dir pruned-doc @repo/doc \
    && pnpm dlx turbo prune --docker --out-dir pruned-material @repo/material \
    && pnpm dlx turbo prune --docker --out-dir pruned-mesh @repo/mesh \
    && pnpm dlx turbo prune --docker --out-dir pruned-pack @repo/pack \
    && pnpm dlx turbo prune --docker --out-dir pruned-pak @repo/pak \
    && pnpm dlx turbo prune --docker --out-dir pruned-texture @repo/texture

FROM base AS build

RUN apk add --no-cache \
    cmake \
    doxygen \
    gcompat \
    git \
    libc6-compat \
    libc-dev \
    linux-headers \
    make \
    python3

WORKDIR /opt

RUN git clone https://github.com/emscripten-core/emsdk.git

WORKDIR /opt/emsdk

RUN ./emsdk install latest \
    && ./emsdk activate latest

RUN echo "NODE_JS = \"node\"" >> /opt/emsdk/.emscripten

ENV EMSDK=/opt/emsdk
ENV PATH="$EMSDK:$EMSDK/upstream/emscripten:$EMSDK/upstream/bin:$PATH"

USER node

WORKDIR /build

FROM build AS doc

COPY --from=prune /repo/pruned-doc/full /build

RUN pnpm install

RUN pnpm codegen
RUN pnpm build:docs

FROM build AS pack

COPY --from=prune /repo/pruned-pack/full /build

RUN pnpm install

RUN pnpm codegen
RUN pnpm setup:web
RUN pnpm build:web

FROM build AS pak

COPY --from=prune /repo/pruned-pak/full /build

RUN pnpm install

RUN pnpm setup:web
RUN pnpm build:web

FROM docker.io/node:22-alpine AS worker

USER node

WORKDIR /out

COPY --chown=node:node --from=doc /build/apps/doc/out/html /out/docs
COPY --chown=node:node --from=pack /build/apps/pack/build_web/exe/* /out/tools/
COPY --chown=node:node --from=pak /build/apps/pak/build_web/exe/* /out/tools/
