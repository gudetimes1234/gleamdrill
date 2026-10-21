-- Creates one empty queue and answers with its id.
insert into queues (user_id, name, position, track)
values ($1, $2, $3, $4)
returning id
