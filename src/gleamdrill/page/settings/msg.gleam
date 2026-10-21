import gleamdrill/page/settings/model.{type Field}
import gleamdrill/store/remote.{type ApiError}
import wire

pub type Msg {
  UserChangedSetting(Field, String)
  UserClickedDeviceTimezone
  SettingsSaved(Result(wire.Profile, ApiError))
  UserChangedKeymap(String)
  UserClickedExport
  ArchiveReady(Result(wire.Archive, ApiError))
  UserClickedImport
  ImportPicked(String)
  /// Answer to "replace everything?": True replaces, False keeps.
  ImportConfirmed(Bool)
  ArchiveRestored(Result(Nil, ApiError))
  UserClickedWarmCache
  CacheWarmed(ok: Bool, done: Int, total: Int, finished: Bool)
  CacheMeasured(Int)
  UserClickedBack
  UserToggledHelp
}
