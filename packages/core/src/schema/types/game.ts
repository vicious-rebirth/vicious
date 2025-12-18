import { Class, field } from "../core";
import {
  AssetReference,
  AssetReferenceSuffix,
  AssetReferenceSuffixSizedList,
} from "./asset";
import { GroupList } from "./group";
import { ID, IDList } from "./id";
import { LocalizedObject } from "./localizedObject";
import { Script } from "./script";
import { V435 } from "./v435";

export class Game extends Class {
  __id = 100;
  __folder = "Games";
  __ext = "gam";
  __offset = 0x6c700;

  base = field(LocalizedObject);
  groups = field(GroupList);
  maps = field(IDList);
  mainMap = field(ID);
  mainLoadingScreen = field(ID, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
  loadingScreens = field(IDList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
  enumerations = field(AssetReferenceSuffixSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x354 = field(AssetReferenceSuffix, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0x35c = field(AssetReferenceSuffix, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  dialogFileSystemError = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 14),
  });
  f_1 = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 21),
  });
  f_0x36c = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 21),
  });
  dialogSkipping = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 21),
  });
  v435 = field(V435, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 9) });
  onGameStarted = field(Script);
  onMapStarted = field(Script);
  onMapEnded = field(Script);
  onUIFocusedChanged = field(Script);
  onUIConfirm = field(Script);
  onUIBack = field(Script);
  onControllerChanged = field(Script);
  onPlayerAssigned = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  onGameCanSave = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 20),
  });
  onGameSaved = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 11),
  });
  onGameRestored = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 11),
  });
  onStreamedCinematicCanPlay = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 18),
  });
  onStreamedCinematicPlayed = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 10),
  });
  onStreamedCinematicStarted = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  onStreamedCinematicEnding = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 12),
  });
  onStreamedCinematicEnded = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  onCinematicStarted = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  onCinematicEnding = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 12),
  });
  onCinematicEnded = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  onStreamedCinematicChained = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
  onCinematicChained = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
  onInGameLobbyStarted = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 13),
  });
  onClientDisconnected = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 13),
  });
  onLobbyNotification = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 15),
  });
  onNetworkError = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 19),
  });
  onPlayerJoining = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 16),
  });
  onPlayerLeft = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 16),
  });
  onPlayerJoined = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 16),
  });
}
