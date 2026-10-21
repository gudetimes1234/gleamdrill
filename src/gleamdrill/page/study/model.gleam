//// The study screen keeps one thing of its own: whether the Blitz chooser
//// is open. What it reports -- due, new, the queue, the streak -- is
//// shared, and every way out of it starts something another screen owns.

pub type Model {
  Model(blitz_chooser: Bool)
}

pub fn init() -> Model {
  Model(blitz_chooser: False)
}
