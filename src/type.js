class Type {
    constructor(type) {
        this.type = type;
    }

    filter(blocks) {
        const filtredBlocks = blocks.filter(({ BlockType }) => {
            return BlockType === this.type;
        });

        return filtredBlocks;
    }
}

module.exports = {
    Type
}