// Blocking dialogs (legacy UX kept deliberately) and a keyed debounce used to
// coalesce editor keystrokes into one localStorage write.

const timers = new Map();

export function debounce(key, ms, callback) {
  clearTimeout(timers.get(key));
  timers.set(key, setTimeout(callback, ms));
}

export function confirmDialog(message) {
  return confirm(message);
}

export function alertDialog(message) {
  alert(message);
}
