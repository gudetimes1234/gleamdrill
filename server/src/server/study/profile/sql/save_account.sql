-- Writes the account-wide knobs, with a daily reminder at reminder_hour.
update settings
   set day_start_hour = $2, timezone = $3, reminder_hour = $4
 where user_id = $1
