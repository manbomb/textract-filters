class Key {
    constructor(blocks, { keyId, searchKey }) {
        this.blocks = blocks;

        if (!keyId && !searchKey) {
            throw "Missing keyId and searchKey on Key search";
        }

        const keys = this.blocks
            .filter(({ BlockType }) => BlockType === 'KEY');

        let keysFoundWithIdOrSearchKey = [];

        if (keyId) {
            keysFoundWithIdOrSearchKey = keys
                .filter(({ Id }) => Id === keyId);
        } else {
            keysFoundWithIdOrSearchKey = keys
                .filter(({ SearchKey }) => SearchKey)
                .filter(({ SearchKey }) => SearchKey.trim() === searchKey);
        }

        if (keysFoundWithIdOrSearchKey.length < 1) {
            throw "Key not found";
        }

        this.key = keysFoundWithIdOrSearchKey[0];
    }

    #getValueOfKey() {
        const relationships = this.key.Relationships;
        if (!relationships) {
            throw "Key dont has a value";
        }

        const valueRelationship = relationships.filter(relationship => {
            return relationship.Type === 'VALUE'
        })[0];
        if (!valueRelationship) {
            throw "Key dont has a value";
        }

        return this.#getBlockById(valueRelationship.Ids[0]).childText.trim();
    }

    #getBlockById(blockId) {
        const blocksWithId = this.blocks
            .filter(({ Id }) => Id === blockId);

        if (blocksWithId.length < 1) {
            throw "Block with blockId not found!";
        }

        return blocksWithId[0];
    }

    getValue() {
        return this.#getValueOfKey();
    }
}

module.exports = {
    Key
}