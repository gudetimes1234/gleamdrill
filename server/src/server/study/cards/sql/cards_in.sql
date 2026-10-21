-- One track's cards, columns as all_cards.
select id, category, subcategory, title, state, step as "step?",
       stability as "stability?", difficulty as "difficulty?",
       extract(epoch from due)::float8 as due,
       extract(epoch from last_review)::float8 as "last_review?",
       reps, lapses, suspended,
       extract(epoch from introduced_at)::float8 as "introduced_at?"
  from cards
 where user_id = $1 and category = $2
