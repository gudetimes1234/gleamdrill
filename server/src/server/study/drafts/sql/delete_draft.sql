-- Drops a draft, if there is one: a graded problem starts from the stub.
delete from drafts
 where user_id = $1 and category = $2 and subcategory = $3 and title = $4
