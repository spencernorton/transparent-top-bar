# Changelog

All notable changes to this fork of Transparent Top Bar are documented here. The history before 2.0.0 is upstream's.

## 2.0.1 — 2026-11-27

- Connect `global.window_group` and `global.window_manager` listeners only while `dark-full-screen` is enabled.
- Replace the 101-class generated stylesheet and legacy GNOME 3 `.panel-corner` rules with a scoped inline panel background declaration that preserves sibling inline styles.
- Cache wallpaper opacity measurements by effective URI, scaling mode, clamp bounds, and primary monitor geometry, and read precomputed `panelLuminanceP95` sidecars when present to skip redundant pixbuf decodes.

## 2.0.0 — 2026-09-29

The first release of this fork, on upstream `74b3ae8`.

- The top bar's opacity is measured from the wallpaper behind the panel: the lowest opacity at which the panel text reaches 4.5:1, within a minimum and maximum set in the preferences. A spanned wallpaper across several monitors is measured correctly.
- High contrast makes the bar opaque; reduced motion changes the opacity without animating.
- The UUID is `transparent-top-bar@spencercnorton.github.io` and the settings schema `org.gnome.shell.extensions.transparent-top-bar`, so the fork installs alongside the upstream extension instead of sharing its settings.
- GLib timeouts and signals are released on disable, window-geometry updates are coalesced to one scan per frame, and the extension stays inert in a nested development Shell.
- Supports GNOME Shell 50 and 51.
