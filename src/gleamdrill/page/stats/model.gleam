//// The progress page's own state: the keyboard cursor in its problem lists
//// and the review history open for one problem. The stats and insights it
//// draws are shared -- the study and tracks screens read them too.

import gleam/option.{type Option, None}
import gleamdrill/content/problem.{type ProblemRef}
import gleamdrill/store/remote
import wire

pub type Model {
  Model(
    /// Index into the problem lists, as the keyboard moves through them.
    cursor: Int,
    /// One problem's review timeline, while its panel is open.
    detail: Option(#(ProblemRef, remote.Data(List(wire.ReviewRow)))),
  )
}

pub fn init() -> Model {
  Model(cursor: 0, detail: None)
}
