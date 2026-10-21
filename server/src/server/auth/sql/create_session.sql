-- Stores a new session by the SHA-256 of its token, expiring in $3 days.
insert into sessions (token_hash, user_id, expires_at)
values ($1, $2, now() + make_interval(days => $3))
