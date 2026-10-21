-- Creates a problem's card on its first review, or stamps introduced_at on
-- a queued one that has never been reviewed, answering with the card.
insert into cards (user_id, category, subcategory, title, introduced_at)
values ($1, $2, $3, $4, now())
on conflict (user_id, category, subcategory, title)
  do update set introduced_at = coalesce(cards.introduced_at, now())
returning id, category, subcategory, title, state, step as "step?",
       stability as "stability?", difficulty as "difficulty?",
       extract(epoch from due)::float8 as due,
       extract(epoch from last_review)::float8 as "last_review?",
       reps, lapses, suspended,
       extract(epoch from introduced_at)::float8 as "introduced_at?"
