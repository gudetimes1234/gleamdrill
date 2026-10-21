-- One track's notes.
select category, subcategory, title, body
  from notes
 where user_id = $1 and category = $2
