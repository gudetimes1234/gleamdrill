-- Writes a card carried over with the scheduling it earned, leaving any
-- existing card alone. Times are epoch seconds; step, stability,
-- difficulty, last_review and introduced_at are nullable and arrive as
-- zero-or-one-element arrays through the migration 10 helpers.
insert into cards (
  user_id, category, subcategory, title,
  state, step, stability, difficulty, due, last_review,
  reps, lapses, introduced_at)
values ($1, $2, $3, $4,
        $5, int_or_null($6), float8_or_null($7), float8_or_null($8),
        to_timestamp($9::float8), to_timestamp_or_null($10),
        $11, $12, to_timestamp_or_null($13))
on conflict (user_id, category, subcategory, title) do nothing
