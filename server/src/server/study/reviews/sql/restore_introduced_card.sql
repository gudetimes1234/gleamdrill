-- Puts back the two columns a review never touches but an undo must, for a
-- card that had been introduced before the undone review; introduced_at is
-- epoch seconds.
update cards
   set introduced_at = to_timestamp($2::float8), suspended = $3
 where id = $1
