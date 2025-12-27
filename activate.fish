#!/usr/bin/env fish

set REPO_ROOT (realpath (dirname (status --current-filename)))

set -gx PATH "$REPO_ROOT/apps/audio/build" "$REPO_ROOT/apps/edit/build" "$REPO_ROOT/apps/pack/build" "$REPO_ROOT/apps/texture/build" $PATH
