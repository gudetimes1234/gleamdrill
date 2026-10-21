//// Bounds on what a request may ask for: the scheduler knobs, the
//// account-wide knobs, and how large one queue batch may be.
////
//// Pure checks over wire shapes, shared by the settings form, the archive
//// restore and the queue endpoints.

import gleam/list
import gleam/option.{Some}
import wire

/// Guard rails on the knobs a user can turn. These bounds are not arbitrary:
/// outside them FSRS produces intervals that are useless rather than merely
/// aggressive.
pub fn settings(settings: wire.Settings) -> Result(wire.Settings, String) {
  let scheduler = settings.scheduler
  let steps_valid =
    list.all(scheduler.learning_steps, fn(step) { step >= 1 })
    && list.all(scheduler.relearning_steps, fn(step) { step >= 1 })

  case
    list.length(scheduler.parameters) == 21,
    scheduler.desired_retention >=. 0.7 && scheduler.desired_retention <=. 0.99,
    scheduler.maximum_interval >= 1,
    steps_valid,
    settings.new_per_day >= 0 && settings.reviews_per_day >= 0
  {
    False, _, _, _, _ -> Error("Expected exactly 21 FSRS parameters.")
    _, False, _, _, _ ->
      Error("Desired retention must be between 0.7 and 0.99.")
    _, _, False, _, _ -> Error("Maximum interval must be at least 1 day.")
    _, _, _, False, _ ->
      Error("Learning and relearning steps must be at least 1 minute.")
    _, _, _, _, False -> Error("Daily limits cannot be negative.")
    _, _, _, _, _ -> Ok(settings)
  }
}

/// The account-wide knobs have their own bounds, because they are about the
/// person rather than the scheduler: an hour outside the day is a typo, not
/// an aggressive setting.
pub fn account(
  account: wire.AccountSettings,
) -> Result(wire.AccountSettings, String) {
  case account.day_start_hour >= 0 && account.day_start_hour <= 23 {
    False -> Error("Day start hour must be between 0 and 23.")
    True ->
      case account.reminder_hour {
        Some(hour) if hour < 0 || hour > 23 ->
          Error("Reminder hour must be between 0 and 23.")
        _ -> Ok(account)
      }
  }
}

/// One topic is at most a few dozen problems and the whole catalogue is about
/// twelve hundred, so this admits "add everything" while still bounding a
/// single statement.
pub const queue_batch_limit = 1500
