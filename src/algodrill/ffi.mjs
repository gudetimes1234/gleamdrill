// Browser interop the Gleam stdlib cannot cover: UTF-16 cursor arithmetic
// (selectionStart counts code units, gleam/string counts graphemes) and the
// blocking confirm/alert dialogs the legacy app used.

export function spliceTab(value, start, end) {
  return value.slice(0, start) + "    " + value.slice(end);
}

export function setSelection(id, position) {
  const el = document.getElementById(id);
  if (el) {
    el.selectionStart = el.selectionEnd = position;
    el.focus();
  }
}

export function confirmDialog(message) {
  return confirm(message);
}

export function alertDialog(message) {
  alert(message);
}
