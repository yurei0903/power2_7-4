// リバーシ データ
class RevData {
    // 静的プロパティ
    static w = 6;   // 盤面横幅
    static h = 6;   // 盤面高さ
    static x = 0;   // 範囲判定用の最小X座標
    static y = 0;   // 範囲判定用の最小Y座標
    static blank = 8;   // 空マス（石マスはプレイヤー番号0,1）

    // コンストラクター
    constructor() {
        this.player = 0;        // 現在の手番プレイヤー
        this.isEnd = false;     // 終了フラグ
        this.scores = [2, 2];   // 獲得石数
        this.types = ['MAN', 'COM'];    // プレイヤー種類
        this.board = [          // 盤面
            [8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8],
            [8, 8, 1, 0, 8, 8],
            [8, 8, 0, 1, 8, 8],
            [8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8],
        ];
        this.putToken = {x: 0, y: 0};   // ログ：石置き位置
        this.activeSquares = [];        // 配置可能マス配列
        this.revTokens = [];    // ログ：裏返した石の配列
    }
}
