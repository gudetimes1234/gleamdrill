-- The current study day's bounds, as epoch seconds, and one track's counts
-- within it: reviews done, cards introduced, and cards due now. $2 is the
-- timezone, $3 the day_start_hour the day rolls over at, $4 now.
with bounds as (
  select date_trunc('day', (to_timestamp($4::float8) at time zone $2)
                           - make_interval(hours => $3))
         + make_interval(hours => $3) as local_start
)
select
  extract(epoch from (local_start at time zone $2))::float8 as day_start,
  extract(epoch from ((local_start + interval '1 day') at time zone $2))::float8
    as day_end,
  (select count(*) from reviews r
     join cards rc on rc.id = r.card_id
    where r.user_id = $1 and rc.category = $5
      and r.reviewed_at >= (local_start at time zone $2))::int as reviews_done,
  (select count(*) from cards c
    where c.user_id = $1 and c.category = $5
      and c.introduced_at >= (local_start at time zone $2))::int
    as new_introduced,
  (select count(*) from cards c
    where c.user_id = $1 and c.category = $5
      and not c.suspended
      and c.reps > 0
      and c.due <= to_timestamp($4::float8))::int as due_now
from bounds
