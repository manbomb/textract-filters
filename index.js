const {
    Table
} = require('./src/table');

const {
    Key
} = require('./src/key');

const mock = require('./mock.json');
const blocks = mock.Blocks;

const tableCustos = new Table(blocks, {
    tableId: 'cb7e88c8-30fa-4716-aeec-b507945c914e'
});

console.log(tableCustos.rows());

const keyVencimento = new Key(blocks, {
    searchKey: "Vencimento"
});

console.log(keyVencimento.getValue());