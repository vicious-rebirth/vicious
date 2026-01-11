# Vicious

A clean-room reverse engineering of [Vicious Engine](https://www.viciousengine.com/).

## Getting Started

There are multiple ways to build/use the project. I strongly recommend buildng on a Linux host/VM, other methods will likely not be up to date.

### Linux (Recommended)

This is a full "bare-metal" install of the repo. Best way to get full access and fix any bugs I added.

#### Dependencies

Following are all depedencies that should be installed:

- [Node 22.x](https://nodejs.org/en/download) (for codegen)
    - [pnpm 10.x](https://pnpm.io/installation)
- [CMake 3.x or 4.x](https://cmake.org/download/) (for building apps/libs)
    - [Make](https://www.gnu.org/software/make/), [Ninja](https://ninja-build.org/), or any build tool compatible with CMake
- [GCC](https://www.gnu.org/software/gcc/), [Clang](https://releases.llvm.org/download.html), or any C99 compiler (for building apps/libs)
    - (Optional) [OpenGL](https://www.opengl.org/) (for GUI apps) 
- [Git](https://git-scm.com/install/) (needed by CMake)
- (Optional) [extract-xiso](https://github.com/XboxDev/extract-xiso) (for Xbox disks)

For `Alpine`:

```sh
apk add \
    cmake \
    clang \
    git \
    libc-dev \
    linux-headers \
    make

# TODO: Install Node + Pnpm and OpenGL
```

For `Arch`:

```sh
pacman -S \
    base-devel \
    cmake \
    git

# TODO: Install Node + Pnpm and OpenGL
```

#### Setup

`Release` binaries:

```
pnpm install
pnpm setup:release
```

`Debug` binaries:

```
pnpm install
pnpm setup:debug
```

#### Build

Executables:

```
pnpm build:exe
```

(Files can be found in `/apps/*/build/exe`)

Libraries:

```
pnpm build:lib
```

(Files can be found in `/packages/*/build/lib`)

### Docker

This is a CLI-only version of the repo. Best way to get running quickly.

#### Dependencies

- [Docker](https://www.docker.com/get-started/)

#### Build

```
docker build -t vicious -f packages/docker/build/alpine/Dockerfile .
```

#### Usage

Run in a shell with a mounted host folder. The folder should have a disc-unpacked version of the game (aka that `Games`, `Maps`, etc folders are extracted).

```
docker run -v /path/to/folder:/workdir -it vicious /bin/sh
```

## Support

### Spy vs. Spy 2005

#### PS2

Untested but may partially work.

#### Xbox

Reverse engineering efforts were primarily done on this version.

All `.gam`, `.map` (except a few old test maps), `.ls`, `.cin`, `.mus`, and `.loc` are fully decodable and re-encodable.
