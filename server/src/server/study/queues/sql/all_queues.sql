-- Every queue in every track with its problems in order, for the export. A
-- left join, so an empty queue still comes back, with null problem columns.
select q.name, q.track,
       i.category as "category?", i.subcategory as "subcategory?",
       i.title as "title?"
  from queues q
  left join queue_items i on i.queue_id = q.id
 where q.user_id = $1
 order by q.position, q.name, i.position
