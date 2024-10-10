// ゲーム ユーティリティ
const gameUtil = {};

// 一時停止
gameUtil.sleep = function(time) {
    return new Promise(r => setTimeout(r, time));
};

// 範囲内か判定
gameUtil.inRange = function(x, y, rect) {
    if (x < rect.x) return false;           // xが小さすぎる 範囲外
    if (rect.x + rect.w <= x) return false; // xが大きすぎる 範囲外
    if (y < rect.y) return false;           // yが小さすぎる 範囲外
    if (rect.y + rect.h <= y) return false; // yが大きすぎる 範囲外
    return true;
}

// 深い複製
// 古いWebブラウザーの互換性対策で、JSON文字列化＋JSONパースで複製する
// 将来的にはstructuredClone関数でおこなう
gameUtil.deepClone = function(object) {
    return JSON.parse(JSON.stringify(object)); // 複製
}
