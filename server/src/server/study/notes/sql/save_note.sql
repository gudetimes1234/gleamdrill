-- Writes one note, replacing whatever the problem had.
insert into notes (user_id, category, subcategory, title, body)
values ($1, $2, $3, $4, $5)
on conflict (user_id, category, subcategory, title)
  do update set body = excluded.body, updated_at = now()
