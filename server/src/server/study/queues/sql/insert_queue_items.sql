-- Fills a queue with problems, in the order given: three parallel arrays of
-- category, subcategory and title.
insert into queue_items (queue_id, category, subcategory, title, position)
select $1, category, subcategory, title, ordinality
  from unnest($2::text[], $3::text[], $4::text[])
       with ordinality as t(category, subcategory, title, ordinality)
on conflict do nothing
