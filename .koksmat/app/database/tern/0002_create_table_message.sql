/* 
File have been automatically created. To prevent the file from getting overwritten
set the Front Matter property ´keep´ to ´true´ syntax for the code snippet
---
keep: false
---
*/   




CREATE TABLE public.message
(
    id SERIAL PRIMARY KEY,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
    ,tenant character varying COLLATE pg_catalog."default"  NOT NULL
    ,name character varying COLLATE pg_catalog."default"  NOT NULL
    ,description character varying COLLATE pg_catalog."default" 
    ,unique_message_id character varying COLLATE pg_catalog."default"  NOT NULL
    ,subject character varying COLLATE pg_catalog."default"  NOT NULL
    ,body character varying COLLATE pg_catalog."default"  NOT NULL
    ,sender character varying COLLATE pg_catalog."default"  NOT NULL
    ,receiver character varying COLLATE pg_catalog."default"  NOT NULL
    ,read boolean   NOT NULL


);




---- create above / drop below ----

DROP TABLE public.message;

