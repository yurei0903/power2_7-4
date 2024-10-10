// リバーシ 情報取得
const revInfo = {};

// 終了の取得
revInfo.getIsEnd = function(board, player) {
    // 配置可能マス配列の取得
    const a0 = revMid.getAllActive(board, player);      // 自側
    const a1 = revMid.getAllActive(board, 1 - player);  // 敵側

    // 自側、敵側の配置可能マスが両方0なら終了
    if (a0.length === 0 && a1.length === 0) return true;    // 終了
    return false;
};

// スコアの取得（プレイヤー0、プレイヤー1の石数を調べる）
revInfo.getScores = function(board) {
    const array = board.flat(); // 二重配列をネストのない配列に
    const scores = [];
    scores[0] = array.filter(s => s === 0).length;  // 値が0のマス数
    scores[1] = array.filter(s => s === 1).length;  // 値が1のマス数
    return scores;
};
