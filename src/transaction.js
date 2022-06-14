const { QueryTypes } = require('@sequelize/core');
const DB = require('./db.js')
let faker = require('@withshepherd/faker');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const utils = require('./util');
let uniqid = require('uniqid');

let customers = [
    'CUFDFDFDF',
    'CUSTOMER2',
    'CUSTOMER3',
    'CUSTOMER4',
    'CUSTOMER5'
];

let accounts = [
    'AA350C0LQO3L2AG0DK2USD',
    'AA350C0LQO3L2AG0728USD',
    'AA350C0LQO3L2AFZIWPUSD',
    'ACFFEEREG',
    'AA350C0LQO3L2AFZYWNUSD'
];

let currencies = ['USD', 'EUR', 'GBP'];

let insertRecord = async (accountMax) => {
    let accountId = Math.floor(1 + Math.random() * accountMax * 1000);

    await DB.sequelizeInstance.query(
        'insert into hlb_transaction (uuid, customer_uid, account_uid, type, status, ' +
        ' amount, currency, fee, party_amount, party_currency, party_bic, party_iban, party_account_number, ' +
        ' party_sortcode, party_bank, party_bank_country, party_type, party_name, party_country, ' +
        ' party_address, party_zipcode, party_city, party_contact, party_phone, party_email, ' +
        ' account_to, account_from, provider, description, signature, created, updated) values ($uuid, ' + 
        ' $customer_uid, $account_uid, $type, $status, ' +
        ' $amount, $currency, $fee, $party_amount, $party_currency, $party_bic, $party_iban, $party_account_number, ' +
        ' $party_sortcode, $party_bank, $party_bank_country, $party_type, $party_name, $party_country, ' +
        ' $party_address, $party_zipcode, $party_city, $party_contact, $party_phone, $party_email, ' +
        ' $account_to, $account_from, $provider, $description, $signature, current_timestamp, current_timestamp)',
        {
          bind: {
              uuid: uniqid('TR').toUpperCase(),
              customer_uid: customers[Math.floor(Math.random() * 5)],
              account_uid: accounts[Math.floor(Math.random() * 5)],
              type: 1,
              status: 1,
              amount: Math.floor(faker.fake('{{finance.amount}}') * 100),
              currency: currencies[Math.floor(Math.random() * 3)],
              fee: 100,
              party_amount: 0,
              party_currency: null,
              party_bic: faker.fake('{{finance.bic}}'),
              party_iban: faker.fake('{{finance.iban}}'),
              party_account_number: faker.fake('{{finance.account}}'),
              party_sortcode: null,
              party_bank: 'FastClood',
              party_bank_country: faker.fake('{{address.countryCode}}'),
              party_type: 1,
              party_name: faker.fake('{{name.findName}}'),
              party_country: faker.fake('{{address.countryCode}}'),
              party_address: 'Olympus Mons',
              party_zipcode: faker.fake('{{address.zipCode}}'),
              party_city: faker.fake('{{address.city}}'),
              party_contact: faker.fake('{{name.findName}}'),
              party_phone: faker.fake('{{phone.phoneNumber}}'),
              party_email: faker.fake('{{internet.email}}'),
              account_to: null,
              account_from: null,
              provider: 'GALAXY',
              description: faker.fake('{{finance.transactionDescription}}'),
              signature: uniqid()
            },
          type: QueryTypes.INSERT
        }
      );
}

let insertTransactions = async (countK, accountMax) => {
    let count = countK * 1000;

    console.log('Insert ' + countK + 'k transactions...');
    console.time(countK + 'k');

    let tx10k = 0;
    for (let txNum = 0; txNum < count; txNum++) {
        if (tx10k == 0) console.time('10k');

        await insertRecord(accountMax);

        tx10k++;
        if (tx10k == 10000) {
            console.timeEnd('10k');
            tx10k = 0;
        }
    }

    console.log('');
    console.log('...done');
    console.timeEnd(countK + 'k');

    process.exit(0);
}

module.exports = {
    insertTransactions: insertTransactions
}