module.exports = {
    randCurrency: () => {
        let currencies = ['USD', 'GBP', 'EUR'];
        return currencies[Math.floor(Math.random() * 3)];
    }
};