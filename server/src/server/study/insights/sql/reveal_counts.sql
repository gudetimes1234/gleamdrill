-- How many times each problem in one track had its solution revealed.
select c.category, c.subcategory, c.title, count(*)::int as reveals
  from reviews r
  join cards c on c.id = r.card_id
 where r.user_id = $1 and c.category = $2 and r.revealed
 group by 1, 2, 3
