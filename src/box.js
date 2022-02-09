class Box {
    constructor(top, left, height, width) {
        this.top = top;
        this.left = left;
        this.height = height;
        this.width = width;
    }

    filter(blocks) {
        const filtredBlocks = blocks.filter(({ Geometry }) => {
            const boundingBox = Geometry.BoundingBox;

            const topi = boundingBox.Top;
            const lefti = boundingBox.Left;
            const heighti = boundingBox.Height;
            const widthi = boundingBox.Width;

            if (topi < this.top || topi > this.top + this.height) return false;
            if (topi + heighti < this.top || topi + heighti > this.top + this.height) return false;

            if (lefti < this.left || lefti > this.left + this.width) return false;
            if (lefti + widthi < this.left || lefti + widthi > this.left + this.width) return false;

            return true;

        });

        return filtredBlocks;
    }
}

module.exports = {
    Box
}