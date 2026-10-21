-- How many of one track's cards are in each FSRS state.
select state, count(*)::int as count
  from cards
 where user_id = $1 and category = $2
 group by state
 order by state
