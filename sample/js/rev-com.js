// リバーシ COM
const revCom = {};

// COMの指し手を取得
revCom.get = function() {
    const {board, player} = revCore.data;
    const max = revCom.think(board, player, 0);
    return max.square;
};

// 思考（COMの内部処理）
revCom.think = function(board, player, nest) {
    let max = {value: -9999, square: null};     // 評価値、石を置く場所
    const activeSquares = revMid.getAllActive(board, player);

    activeSquares.forEach(square => {
        const {x, y} = square;
        let value = this.evalFromTable(x, y);   // 評価表の評価値
        if (nest === 0) {
            value += this.evalAround(x, y, board, player);  // 外周判定
        }
        value += this.evalNext(x, y, board, player, nest);  // 次手確認
        if (value > max.value || max.square === null) max = {value, square};
    });
    return max;
};

// 盤面評価表の利用
revCom.evalFromTable = function(x, y) {
    const valueTable = [    // COMの盤面評価表
        [64,  1,  8,  8,  1,  64],
        [ 1,  1, 10, 10, 1, 1],
        [ 8, 10, 1, 1, 10, 8],
        [ 8, 10, 1,  1,  10, 8],
        [ 1, 1, 10, 10,  1, 1],
        [ 64, 1, 8, 8, 1, 64],
    ];
    const value = valueTable[y][x];
    return value;
};

// 次手確認（石を配置した場合の"次の"プレイヤーの点数を引く）
revCom.evalNext = function(x, y, board, player, nest) {
    if (nest <= 1) {
        // nestが0、1のとき
        const board2 = gameUtil.deepClone(board);   // 深い複製
        revUpdate.reverse(board2, x, y, player);    // 裏返し処理

        const enemy = 1 - player;   // 相手方手番
        const max = this.think(board2, enemy, nest + 1);    // 再度思考
        return - max.value; // 次の手番の最大評価値を引く
    }
    return 0;
};

// 外周判定（外周かつ敵に対して潜り込める場所を探す）
revCom.evalAround = function(x, y, board, player) {
    // 外周か確認（内側なら終了、評価値の補正はなし）
    const rect = {x: 1, y: 1, w: RevData.w - 2, h: RevData.h - 2};
    if (gameUtil.inRange(x, y, rect)) return 0;

    // 敵に囲まれているか確認（囲まれていないなら終了、評価値の補正はなし）
    const enemy = 1 - player;
    let countEnemy = 0; // 敵数
    revLow.scan4Direction(board, x, y, (line, dir) => {
        if (line.length === 0) return;  // その方向にマスがないので飛ばす
        if (line[0].p === enemy) countEnemy ++; // 敵が周囲にある
    });
    if (countEnemy < 3) return 0;

    // 外周で敵に囲まれているので評価値の補正あり
    return 32;
};
