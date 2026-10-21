-- Every track's scheduler settings, for the export.
select track, parameters, desired_retention, learning_steps,
       relearning_steps, maximum_interval, enable_fuzz, new_per_day,
       reviews_per_day
  from track_settings
 where user_id = $1
 order by track
