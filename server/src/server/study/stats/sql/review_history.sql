-- A year of one track's reviews, tallied per study day as "days ago". $2 is
-- the timezone and $3 the day_start_hour the study day rolls over at.
with study_day as (
  select date_trunc('day', (now() at time zone $2)
                           - make_interval(hours => $3))::date as today
)
select (select today from study_day)
       - date_trunc('day', (reviewed_at at time zone $2)
                           - make_interval(hours => $3))::date as days_ago,
       count(*)::int as total,
       count(*) filter (where r.rating > 1)::int as correct
  from reviews r
  join cards c on c.id = r.card_id
 where r.user_id = $1 and c.category = $4
   and r.reviewed_at >= now() - interval '365 days'
 group by 1
 order by 1
