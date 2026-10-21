-- As restore_introduced_card, for a card the undone review had introduced.
update cards
   set introduced_at = null, suspended = $2
 where id = $1
