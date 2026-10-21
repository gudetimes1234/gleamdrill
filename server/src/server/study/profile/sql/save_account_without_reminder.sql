-- Writes the account-wide knobs, with the daily reminder off.
update settings
   set day_start_hour = $2, timezone = $3, reminder_hour = null
 where user_id = $1
