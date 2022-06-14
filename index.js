require('dotenv').config();
const account = require('./src/account');
const transaction = require('./src/transaction');
const simTransaction = require('./src/sim-transaction');

console.log('');

// node index a 100
// node index t 100 200
// node index s 100 200

if (process.argv && process.argv.length && process.argv.length > 3) {
    let operation = process.argv[2];
    let countK = parseInt(process.argv[3]);
    let accountMax = process.argv.length > 4?parseInt(process.argv[4]):0;

    console.log(`operation: ${operation}`);
    console.log(`count: ${countK}k`);
    if (accountMax > 0)
        console.log(`accountMax: ${accountMax}k`);

    if (operation == 'a')
        account.insertAccounts(countK);
    else if (operation == 't')
        transaction.insertTransactions(countK, accountMax);
    else if (operation == 's')
        simTransaction.insertTransactions(countK, accountMax);
}
else
    console.error('ERR: arguments are not recognized\nExample: node OPERATION COUNT [Account ID max]' +
    '\nOPERATION = a/t');
