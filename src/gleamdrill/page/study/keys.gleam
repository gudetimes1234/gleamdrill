//// The study screen's keys: start a sitting, or go anywhere else.

import gleam/list
import gleamdrill/model as shared_model
import gleamdrill/page/study/model.{type Model}
import gleamdrill/page/study/msg.{
  type Msg, UserClickedBrowse, UserClickedQueue, UserClickedRecall,
  UserClickedStartExam, UserClickedStats, UserClickedStudy, UserClickedTour,
  UserClickedTracks, UserPickedActiveQueue, UserToggledBlitz, UserToggledHelp,
}
import gleamdrill/shared.{type Shared}
import gleamdrill/ui/binding.{type Binding, Binding}

pub const label = "STUDY"

pub fn bindings(shared: Shared, _page: Model) -> List(Binding(Msg)) {
  list.flatten([
    [
      Binding(
        ["Enter", "s"],
        "study",
        "Start studying what is due",
        UserClickedStudy,
      ),
      // Shift, like `G`: lowercase `t` has meant Stats since before tracks
      // existed, and moving it would cost more than it bought.
      Binding(["T"], "tracks", "Switch track", UserClickedTracks),
      Binding(
        ["c"],
        "recall",
        "Recall what is due, no editor",
        UserClickedRecall,
      ),
      Binding(
        ["z"],
        "blitz",
        "A timed run of random problems",
        UserToggledBlitz,
      ),
    ],
    // Only once there is a second queue to step to.
    case shared.queues {
      [] -> []
      _ -> [
        Binding(
          ["n"],
          "next queue",
          "Study from the next queue",
          UserPickedActiveQueue(shared_model.next_queue(shared)),
        ),
      ]
    },
    [
      Binding(["q"], "queue", "Manage the study queue", UserClickedQueue),
      Binding(["b"], "browse", "Browse problems by hand", UserClickedBrowse),
      Binding(["t"], "stats", "Statistics", UserClickedStats),
      Binding(["x"], "exam", "System design exam", UserClickedStartExam),
      Binding(["g"], "tour", "Play the Gleam Language Tour", UserClickedTour),
      Binding(["?"], "keys", "This cheatsheet", UserToggledHelp),
    ],
  ])
}
