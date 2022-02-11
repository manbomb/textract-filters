class Table {
    constructor(blocks, { tableId }) {
        this.blocks = blocks;

        if (!tableId) {
            throw "Missing tableId param";
        }

        const tablesWithId = this.blocks
            .filter(({ BlockType }) => BlockType === 'TABLE')
            .filter(({ Id }) => Id === tableId);
        
        if (tablesWithId.length < 1) {
            throw "Table with tableId not found!";
        }

        this.table = tablesWithId[0];
    }

    #childs(block) {
        const relationships = block.Relationships;
        if (!relationships) return [];

        const childRelationship = relationships.filter(relationship => {
            return relationship.Type === 'CHILD'
        })[0];
        if (!childRelationship) return [];

        return childRelationship.Ids.map(blockId => this.#getBlockById(blockId));
    }

    #getBlockById(blockId) {
        const blocksWithId = this.blocks
            .filter(({ Id }) => Id === blockId);
        
        if (blocksWithId.length < 1) {
            throw "Block with blockId not found!";
        }

        return blocksWithId[0];
    }

    #getCellByRowColumn(rowIndex, columnIndex) {
        const childs = this.#childs(this.table);
        const cells = childs.filter(({ BlockType }) => BlockType === 'CELL');
        const cellsInRowColumn = cells
            .filter(({ RowIndex }) => RowIndex === rowIndex)
            .filter(({ ColumnIndex }) => ColumnIndex === columnIndex);
        
        if (cellsInRowColumn.length < 1) {
            throw "Cell in row and column selected not found";
        }

        return cellsInRowColumn[0];
    }

    #getValueOfCell(cell) {
        if (cell.childText) {
            return cell.childText.trim();
        } else {
            const childsOfCell = this.#childs(cell);

            if (childsOfCell.length < 1) return "";

            const childsTexts = childsOfCell.map(({ Text }) => String(Text));
            const text = childsTexts.join(" ");
            return text;
        }
    }

    rows() {
        const childs = this.#childs(this.table);
        const cells = childs.filter(({ BlockType }) => BlockType === 'CELL');

        const firstLine = cells.filter(({ RowIndex }) => RowIndex === 1);
        const firstLineLabels = firstLine.map((lineCell, index) => {
            if (lineCell.childText) {
                return lineCell.childText.trim();
            } else {
                return String(index);
            }
        });

        const numberOfColumns = firstLine.length;
        const numberOfLines = cells.length / firstLine.length;

        const lineEntriesArray = new Array(numberOfColumns)
            .fill()
            .map((_, i) => [firstLineLabels[i]]);

        const linesArray = new Array(numberOfLines - 1).fill(lineEntriesArray);

        for (let indexLine = 2; indexLine <= numberOfLines; indexLine++) {
            for (let indexColumn = 1; indexColumn <= numberOfColumns; indexColumn++) {
                const cell = this.#getCellByRowColumn(indexLine, indexColumn);
                const cellValue = this.#getValueOfCell(cell);
                linesArray[indexLine-2][indexColumn-1][1] = cellValue;
            }
        }

        const linesObject = linesArray.map(entries => Object.fromEntries(entries));

        return linesObject;
    }
}

module.exports = {
    Table
}