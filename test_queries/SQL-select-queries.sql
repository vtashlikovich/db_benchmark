\timing

# SQL-A
select uuid, amount, updated from hlb_transaction 
where account_uid = 'AA350C0L1248L2Q60ZN6USD' and status = 1 and updated > '2022-03-10' order by updated desc LIMIT 50 OFFSET 1;

select uuid, amount, updated from hlb_transaction 
where account_uid = 'AA350C0L1248L2Q60ZN6USD' and status = 1 and updated > '2022-03-10' order by updated desc LIMIT 50 OFFSET 1;

# SQL-A1
select uuid, amount, updated from hlb_transaction 
where signature = '350c0ltsal2ahg1r1' and status = 1;

select uuid, amount, updated from hlb_transaction 
where signature = '350c0lxp4l2an2ap1' and status = 1;

# SQL-B
select count(*) from hlb_transaction;

# SQL-C
select count(*) from hlb_transaction where status = 1;

# SQL-D
select uuid, amount, updated from hlb_transaction 
where account_uid = 'AA350C0L1248L2Q642U4USD' and status = 1 and updated > '2022-03-16' order by updated desc LIMIT 30 OFFSET 0;

# SQL-E
select count(*), account_uid from hlb_transaction group by account_uid LIMIT 30 OFFSET 0;

# SQL-F
select count(*), account_uid from hlb_transaction where status >= 1 group by account_uid LIMIT 30 OFFSET 0;
