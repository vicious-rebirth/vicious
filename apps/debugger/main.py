from abc import ABC
import gdb
import os


class Game(ABC):
    entry = 0
    debug = 0


class SpyVsSpy(Game):
    entry = 0xc3f50
    debug = 0x27b3a0


def attach_qemu() -> None:
    gdb.execute("target remote localhost:1234")


def attach_entry(
    game: Game,
    map: int | str | None = None,
    regions: list[str] | None = None,
    cinematic: str | None = None,
    connect: str | None = None,
    server: bool | str | None = None,
    max_connections: int | str | None = None,
    vis_debug: bool | str | None = None,
) -> None:
    args = []

    if map is not None: args.append(f"/map \"{map}\"")
    if regions: args += [f"/region{i} {r}" for i, r in enumerate(regions)]
    if cinematic is not None: args.append(f"/cinematic \"{cinematic}\"")
    if connect is not None: args.append(f"/connect \"{connect}\"")
    if server: args.append(f"/server \"1\"")
    if max_connections is not None: args.append(f"/max_connections \"{max_connections}\"")
    if vis_debug: args.append(f"/visDebug \"1\"")

    if args:
        entry_bp = gdb.Breakpoint(f"*{game.entry}")
        gdb.execute("continue")

        entry_bp.delete()

        inferior = gdb.selected_inferior()
        inferior.write_memory(game.debug, " ".join(args).encode() + b"\0")


def main():
    game = SpyVsSpy()

    attach_qemu()
    attach_entry(game, map=os.getenv("MAP"), cinematic=os.getenv("CINEMATIC"))

    gdb.execute("continue")
    gdb.execute("exit")


if __name__ == "__main__":
    main()
