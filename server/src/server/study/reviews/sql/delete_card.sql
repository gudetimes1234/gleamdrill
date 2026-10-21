-- Deletes one card: undoing the review that created it.
delete from cards
 where id = $1
