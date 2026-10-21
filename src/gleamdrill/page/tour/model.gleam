//// The Gleam Language Tour's own state: which face is up (the contents or
//// one lesson), the program in the editor, and the contents cursor. Edits
//// per lesson are shared, so leaving the tour and coming back keeps them;
//// the last lesson opened is a shared device preference; and a run goes
//// through the shared run engine.

pub type Face {
  Contents
  Lesson(Int)
}

pub type Model {
  Model(face: Face, draft: String, cursor: Int)
}

pub fn init(lesson: Int) -> Model {
  Model(face: Contents, draft: "", cursor: lesson)
}
