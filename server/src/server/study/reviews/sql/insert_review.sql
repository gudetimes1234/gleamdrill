-- Appends one review to the log. reviewed_at is epoch seconds; the
-- nullable stability_after, difficulty_after and duration_ms arrive as
-- zero-or-one-element arrays through the migration 10 helpers. card_before
-- is the card as it stood, which is what an undo restores.
insert into reviews (
  user_id, card_id, rating, state_before, reviewed_at,
  elapsed_days, scheduled_days, stability_after, difficulty_after,
  duration_ms, auto_failed, revealed, recall, card_before)
values ($1, $2, $3, $4, to_timestamp($5::float8),
        $6, $7, float8_or_null($8), float8_or_null($9),
        int_or_null($10), $11, $12, $13, $14)
