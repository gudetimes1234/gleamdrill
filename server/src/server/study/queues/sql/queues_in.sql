-- One track's queues with their problems in order, as all_queues.
select q.name, q.track,
       i.category as "category?", i.subcategory as "subcategory?",
       i.title as "title?"
  from queues q
  left join queue_items i on i.queue_id = q.id
 where q.user_id = $1 and q.track = $2
 order by q.position, q.name, i.position
