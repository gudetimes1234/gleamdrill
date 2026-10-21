-- Every review the user has, oldest first, each with its problem: the
-- archive's review list. reviewed_at is epoch seconds.
select c.category, c.subcategory, c.title,
       extract(epoch from r.reviewed_at)::float8 as at, r.rating,
       r.duration_ms, r.revealed, r.auto_failed, r.state_before,
       r.scheduled_days, r.stability_after, r.recall
  from reviews r
  join cards c on c.id = r.card_id
 where r.user_id = $1
 order by r.reviewed_at, r.id
