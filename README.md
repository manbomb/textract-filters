# textract-filters

A simple filter to AWS Textract results.
<br/><br/>

## Installation

```sh
npm install textract-filters
```
<br/>

## Usage
Example of usage with comments.

```js
const {
    Table,
    Box,
    Type,
    Key
} = require('textract-filters');

const mock = require('./mock.json');
const blocks = mock.Blocks; // Get blocks of result

const titleBox = new Box(
    0.0447581522166729,
    0.2651977241039276,
    0.07229408621788025,
    0.4745683968067169
); // Define box borders

const titleBoxBlocks = titleBox.filter(blocks); // Get blocks inside box

const typeFilter = new Type('LINE'); // Create filter to lines

const titleLine = typeFilter.filter(titleBoxBlocks); // Filter lines of box

console.log("Title Line", titleLine[0]); 

const table = new Table(blocks, {
    tableId: 'ae7fe756-f865-4252-85e3-e2a94350cad0'
}); // Get tables by tableId

const tableRows = table.rows(); // Get rows of table
console.log(tableRows);

const fullName = new Key(blocks, {
    searchKey: 'Full Name:'
}); // Create full name key

console.log("Full name: ", fullName.getValue()); // Get value of key
```
<br/>

## License

MIT