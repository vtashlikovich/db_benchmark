const { QueryTypes } = require('@sequelize/core');
const DB = require('./db.js')
let faker = require('@withshepherd/faker');
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');
const utils = require('./util');

let insertRecord = async () => {
    let customerId = Math.floor(1 + Math.random() * 100000);
    await DB.sequelizeInstance.query(
        'insert into account (account_number, approve_enabled, approve_min_amount, ' +
        'available, currency_code, label, reserved, wait_for_approve, bank_account_id, ' +
        'customer_id, created_at, created_by_customer, created_by_operator, theme, ' +
        'credited, search_text, ' + 
        'bank_account_number, sort_code, rib_code, routing_number, cif, payment_reference_number, ' +
        'correspondent_bank_name, correspondent_bank_code, status, status_note, required_number_of_approvals) ' +
        ' values ($accountNumber, B\'1\', 10, $available, $currency, $accountName, 1, ' +
        ' 10, 1, $customerId, $created, $customerId, null, \'light\', ' +
        ' 105, $searchText, $accountNum, \'ukcode\', NULL, NULL, NULL, $referenceNum, ' +
        ' \'LLOYD\', \'LOYDGB2L\', $status, $statusNote, 1)',
        {
          bind: {
              accountNumber: uuidv4(),
              available: Math.floor(faker.fake('{{finance.amount}}') * 100),
              currency: utils.randCurrency(),
              accountName: faker.fake('{{finance.accountName}}'),
              customerId: customerId,
              created: new Date().toISOString(),
              customerId: customerId,
              searchText: faker.fake('{{lorem.sentence}}'),
              accountNum: faker.fake('{{finance.account}}'),
              referenceNum: '' + Math.floor(1 + Math.random() * 1000000),
              status: Math.floor(1 + Math.random() * 50),
              statusNote: faker.fake('{{lorem.sentence}}'),
            },
          type: QueryTypes.INSERT
        }
      );
}

let insertAccounts = async (countK) => {
    let count = countK * 1000;

    console.log('Insert ' + countK + 'k accounts...');
    console.time(countK + 'k');

    let accounts10k = 0;
    for (let accountNum = 0; accountNum < count; accountNum++) {
        if (accounts10k == 0) console.time('10k');

        await insertRecord();

        accounts10k++;
        if (accounts10k == 10000) {
            console.timeEnd('10k');
            accounts10k = 0;
        }
    }

    console.log('');
    console.log('...done');
    console.timeEnd(countK + 'k');

    process.exit(0);
}

module.exports = {
    insertAccounts: insertAccounts
}