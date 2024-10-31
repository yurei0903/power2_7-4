// アプリ エフェクト
const appEffect = {};

// エフェクト用Promiseの作成
appEffect.effectPromise = function(id, max, funcDraw) {
    return new Promise(resolve => {
        const start = gameAnim.time.sum;
        gameAnim.add(id, () => {        // アニメ追加
            const diff = gameAnim.time.sum - start;
            if (diff < max) {
                funcDraw(diff / max);   // アニメ処理
            } else {
                gameAnim.remove(id);    // アニメ削除
                resolve();              // Promise解決
            }
        });
    });
};

// メッセージ表示
appEffect.popupMessage = async function(text) {
    await this.effectPromise('message', 750, rate => {
        const {cobj} = appView;
        const x = cobj.w * 0.5;
        const y = cobj.h * Math.max(1.5 - rate * 3, 0.5);
        resFont.draw('main', cobj, text, x,  y, 2);
    });
};

// 盤面更新の演出
appEffect.updateBoard = async function() {
    await this.effectPromise('board', 750, rate => {
        const {unit} = appLayout;
        const {context} = appView.cobj;
        context.lineWidth = unit * 0.15;
        context.strokeStyle = '#9fffff';
    });
};
