CREATE TABLE  public."User"
(
    id SERIAL,
    firstname character varying(256) COLLATE pg_catalog."default" NOT NULL,
    lastname character varying(256) COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    account character varying(256) COLLATE pg_catalog."default",
    CONSTRAINT "User_pkey" PRIMARY KEY (id),
    CONSTRAINT account_unique UNIQUE (account)
);

CREATE TABLE  public."Product"
(
    id SERIAL,
    name character varying(256) COLLATE pg_catalog."default" NOT NULL,
    price numeric(10,2) NOT NULL,
    category character varying(256) COLLATE pg_catalog."default",
    CONSTRAINT product_pkey PRIMARY KEY (id)
);

CREATE TABLE  public."Orders"
(
    id SERIAL,
    user_id integer NOT NULL,
    status_of_order character varying(1) COLLATE pg_catalog."default",
    CONSTRAINT "Orders_pkey" PRIMARY KEY (id)
);


CREATE TABLE  public."Order_Product"
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
);