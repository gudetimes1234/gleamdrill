-- One track's review count, how many were of mature cards, and how many of
-- those passed. A review reaches a track only through its card.
select
  (select count(*) from reviews r join cards c on c.id = r.card_id
    where r.user_id = $1 and c.category = $2)::int as total,
  (select count(*) from reviews r join cards c on c.id = r.card_id
    where r.user_id = $1 and c.category = $2
      and r.state_before = 2)::int as mature,
  (select count(*) from reviews r join cards c on c.id = r.card_id
    where r.user_id = $1 and c.category = $2
      and r.state_before = 2 and r.rating > 1)::int as correct
