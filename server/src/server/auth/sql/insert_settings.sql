-- Seeds a new account's settings row: the account-wide knobs only.
insert into settings (user_id, timezone, day_start_hour)
values ($1, $2, $3)
