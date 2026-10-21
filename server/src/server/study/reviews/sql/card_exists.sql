-- Whether the problem already has a card: a review that creates one says
-- so in its snapshot, so that undoing it takes the card back out.
select exists (
  select 1 from cards
   where user_id = $1 and category = $2 and subcategory = $3 and title = $4
) as found
