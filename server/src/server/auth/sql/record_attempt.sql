-- Counts one attempt against a throttling key and answers with the count in
-- the current window; a window older than $2 minutes starts over at 1.
insert into login_attempts (key, attempts, window_start)
values ($1, 1, now())
on conflict (key) do update set
  attempts = case
    when login_attempts.window_start < now() - make_interval(mins => $2)
    then 1 else login_attempts.attempts + 1 end,
  window_start = case
    when login_attempts.window_start < now() - make_interval(mins => $2)
    then now() else login_attempts.window_start end
returning attempts
