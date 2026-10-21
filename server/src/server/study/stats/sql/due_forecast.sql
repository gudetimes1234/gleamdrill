-- How many of one track's cards fall due on each of the next 30 study days;
-- anything overdue counts as today. $2 and $3 as in review_history.
with study_day as (
  select date_trunc('day', (now() at time zone $2)
                           - make_interval(hours => $3))::date as today
)
select greatest(
         0,
         date_trunc('day', (due at time zone $2)
                           - make_interval(hours => $3))::date
         - (select today from study_day)
       ) as days_ahead,
       count(*)::int as count
  from cards
 where user_id = $1 and category = $4
   and not suspended
   and due < now() + interval '30 days'
 group by 1
 order by 1
