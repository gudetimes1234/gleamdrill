pub type Msg {
  UserOpenedLesson(Int)
  UserClickedNext
  UserClickedPrev
  UserClickedContents
  UserResetLesson
  EditorChanged(String)
  EditorResized(Int)
  UserFocusedEditor
  /// Compile and run now: the pause after typing, or `r`.
  RunTicked
  CursorMoved(Int)
  /// Enter on the contents: open the lesson under the cursor.
  Activated
  /// The app's word that a runtime finished loading.
  RuntimeReady(String)
  UserClickedBack
  UserToggledHelp
}
