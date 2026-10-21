-- Deletes the newest review in one track and answers with its card and
-- the snapshot taken before it. A review from before snapshots has none.
delete from reviews
 where id = (
   select r.id
     from reviews r
     join cards c on c.id = r.card_id
    where r.user_id = $1 and c.category = $2
    order by r.reviewed_at desc, r.id desc
    limit 1
 )
returning card_id, card_before::text as "card_before?"
