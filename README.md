# Database benchmark

The purpose of this project to have a tool that helps to measure a PostgreSQL database records insertion rate per second.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. They deal with connection to the target PostgreSQL Database.

`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`

`DB_NAME` - database name.

`DB_DIALECT` - always 'postgres'.

## Installation

That's easy.

```bash
npm install
```

## Usage/Examples

```bash
// insert 100k of accounts
node index a 100

// insert 100k of transactions
node index t 100

// insert 10k of transactions
node index t 10

// insert 1M of transactions
node index t 1000
```

While it works you can see in the terminal:

- time spent for insertion of each new 10k records;
- time spent for the whole operation in general, once finished.

## Author

- [Vadzim Tashlikovich](http://tashlikovich.info)
