-- Users whose reminder hour is the current hour of their own day, who have
-- not had today's mail, and who have something due. day is their local
-- date as text (YYYY-MM-DD), the key reminders_sent is claimed under.
select id, email, day, due
  from (
    select u.id, u.email,
           (now() at time zone s.timezone)::date::text as day,
           (select count(*) from cards c
             where c.user_id = u.id and not c.suspended
               and c.reps > 0 and c.due <= now())::int as due
      from users u
      join settings s on s.user_id = u.id
     where s.reminder_hour is not null
       and extract(hour from now() at time zone s.timezone)::int
           = s.reminder_hour
       and not exists (
         select 1 from reminders_sent r
          where r.user_id = u.id
            and r.day = (now() at time zone s.timezone)::date)
  ) owed
 where due > 0
