-- One problem's review log, oldest first, for the per-problem timeline.
select extract(epoch from r.reviewed_at)::float8 as at, r.rating,
       r.duration_ms, r.revealed, r.auto_failed, r.state_before,
       r.scheduled_days, r.stability_after, r.recall
  from reviews r
  join cards c on c.id = r.card_id
 where r.user_id = $1
   and c.category = $2 and c.subcategory = $3 and c.title = $4
 order by r.reviewed_at
