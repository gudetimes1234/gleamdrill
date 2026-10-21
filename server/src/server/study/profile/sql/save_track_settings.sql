-- Writes one track's scheduler settings. An upsert: a track nobody has
-- opened has no row for a bare update to touch.
insert into track_settings
  (user_id, track, parameters, desired_retention, learning_steps,
   relearning_steps, maximum_interval, enable_fuzz, new_per_day,
   reviews_per_day)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
on conflict (user_id, track) do update set
  parameters = excluded.parameters,
  desired_retention = excluded.desired_retention,
  learning_steps = excluded.learning_steps,
  relearning_steps = excluded.relearning_steps,
  maximum_interval = excluded.maximum_interval,
  enable_fuzz = excluded.enable_fuzz,
  new_per_day = excluded.new_per_day,
  reviews_per_day = excluded.reviews_per_day
