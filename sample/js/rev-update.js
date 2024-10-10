// リバーシ 盤面更新
const revUpdate = {};

// 裏返し処理
revUpdate.reverse = function(board, x, y, player) {
    board[y][x] = player;   // 配置マスを変更

    const tokens = [];   // 裏返した石配列（戻り値用）
    revLow.scan8Direction(board, x, y, line => {
        const array = revMid.getAllReverse(line, player);
        tokens.push(...array);   // 裏返せるマスの配列を追加
    });
    tokens.forEach(s => board[s.y][s.x] = player);   // 裏返す
    return tokens;       // 裏返した石配列を戻す
};
