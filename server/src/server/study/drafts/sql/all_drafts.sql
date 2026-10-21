-- Every draft the user has, in every track: the export reads this.
select category, subcategory, title, body
  from drafts
 where user_id = $1
