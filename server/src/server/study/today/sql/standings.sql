-- Where every track the user has cards in stands today, with that track's
-- settings row. The settings come from a left join, so a track with no row
-- of its own has every one of them null ("?"). $2-$4 as in day_counts.
with bounds as (
  select date_trunc('day', (to_timestamp($4::float8) at time zone $2)
                           - make_interval(hours => $3))
         + make_interval(hours => $3) as local_start
)
select c.category as track,
       count(*)::int as cards,
       count(*) filter (
         where not c.suspended and c.reps > 0
           and c.due <= to_timestamp($4::float8))::int as due_now,
       count(*) filter (
         where c.introduced_at
               >= (select local_start at time zone $2 from bounds))::int
         as introduced_today,
       (select count(*) from reviews r
          join cards rc on rc.id = r.card_id
         where r.user_id = $1 and rc.category = c.category
           and r.reviewed_at
               >= (select local_start at time zone $2 from bounds))::int
         as reviews_today,
       t.parameters as "parameters?",
       t.desired_retention as "desired_retention?",
       t.learning_steps as "learning_steps?",
       t.relearning_steps as "relearning_steps?",
       t.maximum_interval as "maximum_interval?",
       t.enable_fuzz as "enable_fuzz?",
       t.new_per_day as "new_per_day?",
       t.reviews_per_day as "reviews_per_day?"
  from cards c
  left join track_settings t
         on t.user_id = c.user_id and t.track = c.category
 where c.user_id = $1
 group by c.category, t.parameters, t.desired_retention,
          t.learning_steps, t.relearning_steps, t.maximum_interval,
          t.enable_fuzz, t.new_per_day, t.reviews_per_day
 order by c.category
