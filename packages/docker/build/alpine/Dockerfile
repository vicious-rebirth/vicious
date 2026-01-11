FROM docker.io/node:22-alpine AS base

RUN apk update

RUN corepack enable

FROM base AS prune

RUN pnpm dlx turbo --version

USER node

WORKDIR /repo

COPY --chown=node:node . .

RUN pnpm dlx turbo prune --docker --out-dir pruned-audio @repo/audio \
    && pnpm dlx turbo prune --docker --out-dir pruned-mesh @repo/mesh \
    && pnpm dlx turbo prune --docker --out-dir pruned-pack @repo/pack \
    && pnpm dlx turbo prune --docker --out-dir pruned-texture @repo/texture

FROM base AS build

RUN apk add --no-cache \
    cmake \
    clang \
    git \
    libc-dev \
    linux-headers \
    make

USER node

WORKDIR /build

FROM build AS audio

COPY --from=prune /repo/pruned-audio/full /build

RUN pnpm install

RUN pnpm codegen
RUN pnpm setup:release
RUN pnpm build:exe

FROM build AS mesh

COPY --from=prune /repo/pruned-mesh/full /build

RUN pnpm install

RUN pnpm codegen
RUN pnpm setup:release
RUN pnpm build:exe

FROM build AS pack

COPY --from=prune /repo/pruned-pack/full /build

RUN pnpm install

RUN pnpm codegen
RUN pnpm setup:release
RUN pnpm build:exe

FROM build AS texture

COPY --from=prune /repo/pruned-texture/full /build

RUN pnpm install

RUN pnpm codegen
RUN pnpm setup:release
RUN pnpm build:exe

FROM docker.io/node:22-alpine AS worker

USER node

ENV PATH="/tools:${PATH}"

COPY --from=audio /build/apps/audio/build/exe/* /tools/
COPY --from=mesh /build/apps/mesh/build/exe/* /tools/
COPY --from=pack /build/apps/pack/build/exe/* /tools/
COPY --from=texture /build/apps/texture/build/exe/* /tools/

WORKDIR /workdir
