-- Ends one session, by the hash of its token.
delete from sessions
 where token_hash = $1
