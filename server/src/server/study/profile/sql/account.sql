-- The account-wide knobs: one row per user, created at signup.
select day_start_hour, timezone, reminder_hour
  from settings
 where user_id = $1
