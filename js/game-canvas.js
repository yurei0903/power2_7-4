// ゲーム キャンバス
const gameCanvas = {};

// キャンバスの生成
gameCanvas.genCanvas = function(w, h) {
    const canvas = document.createElement('canvas');    // 生成
    canvas.width = 1920;   // 横幅設定
    canvas.height = 1080;  // 高さ設定
    const context = canvas.getContext('2d');    // 2Dコンテキスト
    return {canvas, context, w, h};
};

// 指定要素下に、指定サイズでキャンバスを作成して格納
gameCanvas.addCanvas = function(selector, w, h) {
    const cobj = this.genCanvas(w, h);
    const element = document.querySelector(selector);
    element.append(cobj.canvas);
    return cobj;
};

// 指定要素下に、指定サイズで背景用キャンバスを作成して格納
gameCanvas.addBgCanvas = function(selector, w, h) {
    const cobj = this.addCanvas(selector, w, h);
    cobj.canvas.style.background = 'url(images/game/bg.png)';
    return cobj;
};
