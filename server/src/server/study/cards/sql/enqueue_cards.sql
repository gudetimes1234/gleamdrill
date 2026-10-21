-- Gives each of the problems in three parallel arrays (category,
-- subcategory, title) a card, and answers with every one asked for,
-- including those already queued. The union is needed: a data-modifying
-- CTE and the query it feeds see the same snapshot, so the select half
-- cannot see what the insert wrote, and the insert returns its own rows.
with asked as (
  select *
    from unnest($2::text[], $3::text[], $4::text[])
      as t(category, subcategory, title)
), inserted as (
  insert into cards (user_id, category, subcategory, title)
  select $1, category, subcategory, title from asked
  on conflict (user_id, category, subcategory, title) do nothing
  returning id, category, subcategory, title, state, step as "step?",
       stability as "stability?", difficulty as "difficulty?",
       extract(epoch from due)::float8 as due,
       extract(epoch from last_review)::float8 as "last_review?",
       reps, lapses, suspended,
       extract(epoch from introduced_at)::float8 as "introduced_at?"
)
select * from inserted
union all
select c.id, c.category, c.subcategory, c.title, c.state, c.step,
       c.stability, c.difficulty,
       extract(epoch from c.due)::float8,
       extract(epoch from c.last_review)::float8,
       c.reps, c.lapses, c.suspended,
       extract(epoch from c.introduced_at)::float8
  from cards c
  join asked using (category, subcategory, title)
 where c.user_id = $1
