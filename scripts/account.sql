CREATE TABLE account (
  id bigserial primary key,
  account_number varchar(55) DEFAULT NULL UNIQUE,
  approve_enabled bit(1) NOT NULL,
  approve_min_amount BIGINT DEFAULT NULL,
  available BIGINT NOT NULL,
  currency_code varchar(3) NOT NULL,
  label varchar(55) DEFAULT NULL,
  reserved BIGINT NOT NULL,
  wait_for_approve BIGINT NOT NULL,
  bank_account_id BIGINT DEFAULT NULL,
  customer_id BIGINT NOT NULL,
  created_at timestamp NOT NULL,
  created_by_customer BIGINT DEFAULT NULL,
  created_by_operator BIGINT DEFAULT NULL,
  theme varchar(20) DEFAULT NULL,
  credited BIGINT NOT NULL,
  search_text text,
  bank_account_number varchar(55) DEFAULT NULL,
  sort_code varchar(55) DEFAULT NULL,
  rib_code varchar(55) DEFAULT NULL,
  routing_number varchar(55) DEFAULT NULL,
  cif varchar(55) DEFAULT NULL,
  payment_reference_number varchar(55) DEFAULT NULL,
  correspondent_bank_name varchar(55) DEFAULT NULL,
  correspondent_bank_code varchar(55) DEFAULT NULL,
  status DECIMAL(11) NOT NULL,
  status_note varchar(250) DEFAULT NULL,
  required_number_of_approvals DECIMAL(11) DEFAULT NULL
);

CREATE INDEX idx_amount_1
ON account(customer_id, status, currency_code);