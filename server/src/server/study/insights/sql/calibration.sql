-- For each grade pressed in one track, how many reviews had one after them
-- and how many of those next reviews were clean passes.
select rating, count(*)::int as total,
       count(*) filter (where next_pass)::int as passed
  from (
    select r.rating,
           lead(r.rating > 1 and not r.revealed and not r.auto_failed
                and not r.recall)
             over (partition by r.card_id order by r.reviewed_at)
             as next_pass
      from reviews r
      join cards c on c.id = r.card_id
     where r.user_id = $1 and c.category = $2
  ) sequenced
 where next_pass is not null
 group by rating
 order by rating
