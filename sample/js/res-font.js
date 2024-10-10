// リソース フォント
const resFont = {holder: {}};

// フォント読み込み
resFont.load = async function(id, fontName) {
    this.holder[id] = fontName;     // ホルダーに格納

    const dummy = document.createElement('div');    // 要素を作る
    dummy.style.fontFamily = fontName;  // フォントを設定
    dummy.style.opacity = 0;            // 透明にする
    dummy.textContent = 'dummy';        // ダミーの文字列を入れる
    document.body.append(dummy);        // body要素の配下に追加

    await document.fonts.ready;     // フォントの読み込みを待つ
    dummy.remove();     // ダミーの要素を削除
};

// 文字列描画
resFont.draw = function(id, cobj, text, x, y, rate, maxW) {
    const {context, w} = cobj;
    const fontSize = w * 0.09 * rate;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#000000';
    context.strokeStyle = '#ffffff';
    context.lineWidth = fontSize * 0.1;
    context.font = `${fontSize}px '${this.holder[id]}'`;
    context.strokeText(text, x, y, maxW);
    context.fillText  (text, x, y, maxW);
};
