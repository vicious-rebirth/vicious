#!/usr/bin/env fish

set REPO_ROOT (realpath (dirname (status --current-filename)))

set -gx PATH \
    "$REPO_ROOT/apps/audio/build/exe" \
    "$REPO_ROOT/apps/edit/build/exe" \
    "$REPO_ROOT/apps/pack/build/exe" \
    "$REPO_ROOT/apps/texture/build/exe" \
    $PATH
