-- Writes a solved problem from before accounts as a Review card due now
-- ($7, epoch seconds) with one rep and the given memory, leaving any
-- existing card alone.
insert into cards (
  user_id, category, subcategory, title,
  state, step, stability, difficulty, due, reps, introduced_at)
values ($1, $2, $3, $4, 2, null, $5, $6,
        to_timestamp($7::float8), 1, to_timestamp($7::float8))
on conflict (user_id, category, subcategory, title) do nothing
