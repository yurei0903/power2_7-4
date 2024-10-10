// リバーシ 中核処理
const revCore = {};

// 初期化
revCore.init = function() {
    this.data = new RevData();  // リバーシ データ
    testRev.set(this.data);     // デバッグ用データ設定
    this.update();  // 更新
};

// 各種値の更新
revCore.update = function() {
    // 配置可能マス配列、終了、スコアの取得
    const {board, player} = this.data;
    this.data.activeSquares = revMid.getAllActive(board, player);
    this.data.isEnd = revInfo.getIsEnd(board, player);
    this.data.scores = revInfo.getScores(board);
};

// 石を置く（裏返し処理と、置き位置の記録）
revCore.putToken = function(x, y) {
    this.data.putToken = {x, y};
    const {board, player} = this.data;
    this.data.revTokens = revUpdate.reverse(board, x, y, player);
};

// 次へ（パス時にも使う）
revCore.next = function() {
    this.data.player = 1 - this.data.player;
    this.update();  // 更新
};
