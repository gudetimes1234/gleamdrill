-- One track's drafts.
select category, subcategory, title, body
  from drafts
 where user_id = $1 and category = $2
