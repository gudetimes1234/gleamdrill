-- Resolves a session token's hash to its user and slides the expiry $2
-- days out, in one statement: an expired session matches nothing.
with touched as (
  update sessions
     set last_seen = now(),
         expires_at = now() + make_interval(days => $2)
   where token_hash = $1
     and expires_at > now()
  returning user_id
)
select u.id, u.email
  from users u
  join touched t on t.user_id = u.id
