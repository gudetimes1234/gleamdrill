-- Deletes every queue the user has, in every track: a restore's, and only
-- a restore's.
delete from queues
 where user_id = $1
