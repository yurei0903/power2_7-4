// アプリ クリック
const appClick = {};
var skip=true;
// ボタン追加
appClick.addButton = function(text, func) {
    const {w, h, canvas} = appView.cobj;
    gameAnim.add('button', () => {
        resFont.draw('main', appView.cobj, text, w / 2, h / 2, 1.9);
    });
    gameClick.add(canvas, 'button', () => {
        gameAnim.remove('button');  // アニメ除去
        gameClick.remove('button'); // クリック除去
        func();
    });
};

// 盤面クリック処理追加
appClick.addBoard =  async function () {
    this.isLock = false;    // ロック解除
    if (gameClick.holder['board']) return;  // 既にあれば追加しない
        gameClick.add(appView.cobj.canvas, 'board', async (eX, eY) => {
         if (this.isLock) return;    // ロック時は飛ばす
        const pos = appLayout.pixelToBoard(eX, eY);  // マス位置を計算
        if (pos === null) return;   // 盤面外は飛ばす
        // 石置き可能なら、石を置く
        if (skip){
            skip=false;
        const {board, player} = revCore.data;
        if (revMid.isActive(board, pos.x, pos.y, player)) {
            if(await quizdasu()){
            this.isLock = false;     // ロック
            appProcess.put(pos.x, pos.y); // 石の配置
            skip=true;
            const quizElement = document.getElementById('quiz');
            quizElement.style.display = 'none'; // 要素を表示
        }
        else{
            revCore.next(); // 次へ
            skip=true;
            const quizElement = document.getElementById('quiz');
            quizElement.style.display = 'none'; // 要素を表示
        }
    }
    }
    });

};
