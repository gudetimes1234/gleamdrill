-- An account and its password hash, by normalised email.
select id, email, password_hash
  from users
 where email = $1
