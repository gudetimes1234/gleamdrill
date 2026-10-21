-- Deletes one track's queues, and with them their items. The track filter
-- is what keeps a PUT of one track's set from wiping every other track's.
delete from queues
 where user_id = $1 and track = $2
