-- Takes a user's reminder slot for one day, or touches nothing when it is
-- taken. The day travels as text: pog types a $n::date parameter as a date
-- and refuses a string for it, so the cast happens here.
insert into reminders_sent (user_id, day)
values ($1, to_date($2::text, 'YYYY-MM-DD'))
on conflict (user_id, day) do nothing
