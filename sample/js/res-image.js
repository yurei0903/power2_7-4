// リソース 画像
const resImage = {holder: {}};

// 画像の読み込み
resImage.load = function(id, url) {
    return new Promise(resolve => {
        const image = new Image();
        image.onload = resolve;     // 読み込み後の処理
        image.src = url;            // URLを指定
        this.holder[id] = image;    // ホルダーに格納
    });
};

// 画像の描画
resImage.draw = function(id, cobj, x, y, w, h) {
    cobj.context.drawImage(this.holder[id], x, y, w, h);
};
