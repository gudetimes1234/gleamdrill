-- The last five clean solves per card in one track, oldest first: passed,
-- not revealed, not auto-failed, not a recall review, and timed. The
-- duration is never null here, which the "!" tells Squirrel.
select category, subcategory, title, at, duration_ms as "duration_ms!"
  from (
    select c.category, c.subcategory, c.title,
           extract(epoch from r.reviewed_at)::float8 as at,
           r.duration_ms,
           row_number() over (
             partition by r.card_id order by r.reviewed_at desc
           ) as recency
      from reviews r
      join cards c on c.id = r.card_id
     where r.user_id = $1 and c.category = $2
       and r.rating > 1
       and not r.revealed
       and not r.auto_failed
       and not r.recall
       and r.duration_ms is not null
  ) latest
 where recency <= 5
 order by category, subcategory, title, at
