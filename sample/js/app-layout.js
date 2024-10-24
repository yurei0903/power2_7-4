// アプリ レイアウト
const appLayout = {};

// レイアウトの初期化
appLayout.init = function() {
    this.fitSize = Math.min(window.innerWidth, window.innerHeight);
    this.unit = Math.trunc(this.fitSize * 0.127);

    const u = this.unit;
    this.rectBoard = {x: u, y: u * 1.4, w: u * 8, h: u * 8};
    this.scoreTexts = [
        {x: u * 2.8, y: u * 0.85, w: u * 2.8},
        {x: u * 6.0, y: u * 0.85, w: u * 2.8}
    ];
    this.scoreImages = [{x: u * 0.7, y: u * 0.3}, {x: u * 3.9, y: u * 0.3}];
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
