-- Deletes everything a restore replaces, in one statement: reviews, cards,
-- drafts, notes and queues (queue items go with their queues). Settings
-- are not deleted; the restore overwrites them.
with reviews_gone as (
  delete from reviews where user_id = $1
), cards_gone as (
  delete from cards where user_id = $1
), drafts_gone as (
  delete from drafts where user_id = $1
), notes_gone as (
  delete from notes where user_id = $1
)
delete from queues where user_id = $1
