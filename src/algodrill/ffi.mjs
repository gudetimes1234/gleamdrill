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

// Used to sample and order exam questions. Gleam has no stdlib randomness on
// the JavaScript target, and an exam that asks the same questions in the same
// order every sitting measures memory of the exam, not of the material.
export function randomInt(bound) {
  return bound <= 0 ? 0 : Math.floor(Math.random() * bound);
}
