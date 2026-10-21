-- Every note the user has, in every track: the export reads this.
select category, subcategory, title, body
  from notes
 where user_id = $1
