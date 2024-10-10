// アプリ レイアウト
const appLayout = {};

// レイアウトの初期化
appLayout.init = function() {
    this.fitSize = Math.min(window.innerWidth, window.innerHeight);
    this.unit = Math.trunc(this.fitSize * 0.1);

    const u = this.unit;
    this.rectBoard = {x: u, y: u * 1.5, w: u * 8, h: u * 8};
    this.scoreTexts = [
        {x: u * 3.4, y: u * 0.75, w: u * 2.8},
        {x: u * 7.4, y: u * 0.75, w: u * 2.8}
    ];
    this.scoreImages = [{x: u, y: u * 0.25}, {x: u * 5, y: u * 0.25}];
};

// マスXYを画面XYに変換
appLayout.boardToPixel = function(posX, posY) {
    const {unit, rectBoard} = this;
    const x = rectBoard.x + unit * posX;
    const y = rectBoard.y + unit * posY;
    return {x, y};
};

// 画面XYをマスXYに変換
appLayout.pixelToBoard = function(pixelX, pixelY) {
    const {unit, rectBoard} = this;
    if (! gameUtil.inRange(pixelX, pixelY, rectBoard)) return null;
    const x = Math.trunc((pixelX - rectBoard.x) / unit);
    const y = Math.trunc((pixelY - rectBoard.y) / unit);
    return {x, y};
};
