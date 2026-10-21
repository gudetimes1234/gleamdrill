-- Drops every session that has already expired.
delete from sessions
 where expires_at < now()
