-- Parks or resumes one card, answering with it; no row when there is no
-- such card.
update cards
   set suspended = $5
 where user_id = $1 and category = $2 and subcategory = $3 and title = $4
returning id, category, subcategory, title, state, step as "step?",
       stability as "stability?", difficulty as "difficulty?",
       extract(epoch from due)::float8 as due,
       extract(epoch from last_review)::float8 as "last_review?",
       reps, lapses, suspended,
       extract(epoch from introduced_at)::float8 as "introduced_at?"
