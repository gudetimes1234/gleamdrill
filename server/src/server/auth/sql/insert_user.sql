-- Creates an account. The unique index on email is what says "already
-- registered" (users_email_key).
insert into users (email, password_hash)
values ($1, $2)
returning id, email
