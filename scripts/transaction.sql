CREATE TABLE hlb_transaction
(
    id bigint NOT NULL DEFAULT nextval('hlb_transaction_id_seq'::regclass),
    uuid character varying(25) COLLATE pg_catalog."default",
    customer_uid character varying(25) COLLATE pg_catalog."default" NOT NULL,
    account_uid character varying(25) COLLATE pg_catalog."default" NOT NULL,
    type smallint NOT NULL,
    status integer NOT NULL DEFAULT 1,
    amount integer NOT NULL,
    currency enum_hlb_transaction_currency, -- varchar(3)
    fee integer,
    party_amount integer DEFAULT 0,
    party_currency enum_hlb_transaction_party_currency, -- varchar(3)
    fx_rate_uid character varying(25) COLLATE pg_catalog."default",
    fx_rate integer,
    party_bic character varying(14) COLLATE pg_catalog."default",
    party_iban character varying(40) COLLATE pg_catalog."default",
    party_account_number character varying(30) COLLATE pg_catalog."default",
    party_sortcode character varying(6) COLLATE pg_catalog."default",
    party_bank character varying(30) COLLATE pg_catalog."default",
    party_bank_country character varying(16) COLLATE pg_catalog."default",
    party_type smallint,
    party_name character varying(100) COLLATE pg_catalog."default",
    party_country character varying(16) COLLATE pg_catalog."default",
    party_address character varying(150) COLLATE pg_catalog."default",
    party_zipcode character varying(10) COLLATE pg_catalog."default",
    party_city character varying(30) COLLATE pg_catalog."default",
    party_contact character varying(100) COLLATE pg_catalog."default",
    party_phone character varying(25) COLLATE pg_catalog."default",
    party_email character varying(50) COLLATE pg_catalog."default",
    account_to bigint,
    account_from bigint,
    provider character varying(10) COLLATE pg_catalog."default",
    description character varying(255) COLLATE pg_catalog."default",
    signature character varying(45) COLLATE pg_catalog."default",
    created timestamp with time zone NOT NULL DEFAULT now(),
    updated timestamp with time zone NOT NULL,
    CONSTRAINT hlb_transaction_pkey1 PRIMARY KEY (id, created),
    CONSTRAINT hlb_transaction_uuid1_key UNIQUE (uuid, created)
) partition by range (created);

CREATE INDEX IF NOT EXISTS idx_transaction_created
    ON public.hlb_transaction USING btree
    (created ASC NULLS LAST);

CREATE INDEX IF NOT EXISTS tx_signature_pt
    ON public.hlb_transaction USING btree
    (signature COLLATE pg_catalog."default" ASC NULLS LAST);

CREATE INDEX idx_transaction_accstatus ON hlb_transaction(account_uid, status);