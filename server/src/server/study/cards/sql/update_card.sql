-- Writes a card's scheduling after a review. step, stability, difficulty
-- and last_review are nullable, and arrive as zero-or-one-element arrays
-- through the migration 10 helpers; due and last_review are epoch seconds.
update cards
   set state = $2,
       step = int_or_null($3),
       stability = float8_or_null($4),
       difficulty = float8_or_null($5),
       due = to_timestamp($6::float8),
       last_review = to_timestamp_or_null($7),
       reps = $8,
       lapses = $9
 where id = $1
