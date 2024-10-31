// リバーシ 確認
const revMid = {};

// 裏返せるマスの配列を得る
revMid.getAllReverse = function(line, player) {
    const enemy = 1 - player;
    if (line.length < 2) return [];         // 最低2マスないとはさめない
    if (line[0].p !== enemy) return [];     // 1マス目が敵でないなら失敗

    // 1マス目が敵の場合は処理を継続する
    const res = [line[0]];  // 1マス目を格納
    for (let i = 1; i < line.length; i ++) {
        if (line[i].p === enemy) res.push(line[i]); // 敵マス→配列に追加
        if (line[i].p === RevData.blank) return []; // 空マス→失敗
        if (line[i].p === player) return res;       // 自石→配列を返す
    }
    return [];  // 末尾まで自石ではさめなかった
};

// 配置可能か判定
revMid.isActive = function(board, x, y, player) {
    let res = false;    // 配置できない
    if (board[y][x] !== RevData.blank) return res;  // 空マスでない

    revLow.scan8Direction(board, x, y, line => {
        const tokens = this.getAllReverse(line, player);
        if (tokens.length >= 1) res = true; // 配置できる
    });
    return res; // 結果を戻す
};

// 配置可能マス配列の取得
revMid.getAllActive = function(board, player) {
    const res = [];
    revLow.scanBoard((x, y) => {
        // 配置可能なら、そのマスを配列に追加
        if (this.isActive(board, x, y, player)) res.push({x, y});
    });
    return res;
};
