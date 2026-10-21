-- Re-attaches one archived review to the user's card for its problem, or
-- writes nothing when there is no such card. reviewed_at is epoch seconds;
-- stability_after and duration_ms are nullable and arrive as
-- zero-or-one-element arrays through the migration 10 helpers. A restored
-- review has no snapshot, so it cannot be undone.
insert into reviews (
  user_id, card_id, rating, state_before, reviewed_at,
  elapsed_days, scheduled_days, stability_after, difficulty_after,
  duration_ms, auto_failed, revealed, recall)
select $1, id, $5, $6, to_timestamp($7::float8),
       0, $8, float8_or_null($9), null, int_or_null($10), $11, $12, $13
  from cards
 where user_id = $1 and category = $2 and subcategory = $3 and title = $4
