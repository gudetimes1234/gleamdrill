-- Whether Postgres knows a timezone by this name.
select exists (
  select 1 from pg_timezone_names where name = $1
) as known
