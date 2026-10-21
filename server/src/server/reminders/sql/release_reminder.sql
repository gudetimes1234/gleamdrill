-- Gives a claimed slot back after a failed send, so the next tick retries.
delete from reminders_sent
 where user_id = $1 and day = to_date($2::text, 'YYYY-MM-DD')
