/* Replace with your SQL commands */
CREATE TABLE "Product"
(
    id integer NOT NULL DEFAULT nextval('"Product_id_seq"'::regclass),
    name character varying(256) COLLATE pg_catalog."default" NOT NULL,
    price numeric(10,2) NOT NULL,
    category character varying(256) COLLATE pg_catalog."default",
    CONSTRAINT product_pkey PRIMARY KEY (id)
)
