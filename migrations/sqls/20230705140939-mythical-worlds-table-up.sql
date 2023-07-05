/* Replace with your SQL commands */-- Table: public.User

-- DROP TABLE IF EXISTS public."User";

CREATE TABLE IF NOT EXISTS public."User"
(
    id SERIAL,
    firstname character varying(256) COLLATE pg_catalog."default" NOT NULL,
    lastname character varying(256) COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    account character varying(256) COLLATE pg_catalog."default",
    CONSTRAINT "User_pkey" PRIMARY KEY (id),
    CONSTRAINT account_unique UNIQUE (account)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."User"
    OWNER to postgres;

GRANT ALL ON TABLE public."User" TO PUBLIC;

GRANT ALL ON TABLE public."User" TO postgres;


-- Table: public.Product

-- DROP TABLE IF EXISTS public."Product";

CREATE TABLE IF NOT EXISTS public."Product"
(
    id SERIAL,
    name character varying(256) COLLATE pg_catalog."default" NOT NULL,
    price numeric(10,2) NOT NULL,
    category character varying(256) COLLATE pg_catalog."default",
    CONSTRAINT product_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Product"
    OWNER to postgres;

GRANT ALL ON TABLE public."Product" TO PUBLIC;

GRANT ALL ON TABLE public."Product" TO postgres;

-- Table: public.Orders

-- DROP TABLE IF EXISTS public."Orders";

CREATE TABLE IF NOT EXISTS public."Orders"
(
    id SERIAL,
    user_id integer NOT NULL,
    status_of_order character varying(1) COLLATE pg_catalog."default",
    CONSTRAINT "Orders_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Orders"
    OWNER to postgres;
	
-- Table: public.Order_Product

-- DROP TABLE IF EXISTS public."Order_Product";

CREATE TABLE IF NOT EXISTS public."Order_Product"
(
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer,
    CONSTRAINT "Order_Product_pkey" PRIMARY KEY (order_id, product_id),
    CONSTRAINT fk_order_id FOREIGN KEY (order_id)
        REFERENCES public."Orders" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_product_id FOREIGN KEY (product_id)
        REFERENCES public."Product" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Order_Product"
    OWNER to postgres;