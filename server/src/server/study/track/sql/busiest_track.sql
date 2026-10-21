-- The track the user has most cards in, ties broken by name.
select category
  from cards
 where user_id = $1
 group by category
 order by count(*) desc, category
 limit 1
