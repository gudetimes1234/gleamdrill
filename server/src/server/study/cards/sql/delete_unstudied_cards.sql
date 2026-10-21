-- Deletes the cards, of the problems in three parallel arrays, that have
-- never been reviewed, answering with the problems it removed. reps = 0 is
-- the whole safety condition: a studied card's review log would cascade.
delete from cards c
 using unnest($2::text[], $3::text[], $4::text[])
    as t(category, subcategory, title)
 where c.user_id = $1
   and c.category = t.category
   and c.subcategory = t.subcategory
   and c.title = t.title
   and c.reps = 0
returning c.category, c.subcategory, c.title
