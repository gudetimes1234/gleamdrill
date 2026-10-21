-- An empty body deletes the row: there is no such thing as a blank note.
delete from notes
 where user_id = $1 and category = $2 and subcategory = $3 and title = $4
