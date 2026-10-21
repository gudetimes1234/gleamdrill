-- Forgets a throttling key's attempts, after a successful sign-in.
delete from login_attempts
 where key = $1
