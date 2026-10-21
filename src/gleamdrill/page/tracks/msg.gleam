pub type Msg {
  UserPickedTrack(String)
  /// Enter a track that has nothing queued, with twenty easy problems added.
  UserPickedTrackWithStarter(String)
  UserClickedStats
  UserClickedBack
  UserToggledHelp
}
