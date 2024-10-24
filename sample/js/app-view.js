// アプリ 表示
const appView = {};

// 初期化
appView.init = function() {
    appLayout.init();    // レイアウトを初期化

    // キャンバス系オブジェクトを作成
    const size = appLayout.fitSize;
    this.cobjBg = gameCanvas.addBgCanvas('#reversi', size, size);
    this.cobj   = gameCanvas.addCanvas('#reversi', size, size);

    this.drawBoard();   // 盤面描画
};

// 盤面描画
appView.drawBoard = function() {
    const {unit} = appLayout;
    revLow.scanBoard((posX, posY) => {
        const {x, y} = appLayout.boardToPixel(posX, posY);
        resImage.draw('square', this.cobjBg, x, y, unit, unit);
    });
};

// 石描画
appView.drawToken = function() {
    const {unit} = appLayout;
    revLow.scanBoard((posX, posY) => {
        const square = revCore.data.board[posY][posX];
        if (square === RevData.blank) return;
        const {x, y} = appLayout.boardToPixel(posX, posY);
        resImage.draw(`token${square}`, this.cobj, x, y, unit, unit);
    });
};

// 配置可能マスの描画
appView.drawCanPut = function() {
    const {unit} = appLayout;
    revCore.data.activeSquares.forEach(square => {
        const {x, y} = appLayout.boardToPixel(square.x, square.y);
        resImage.draw('active', this.cobj, x, y, unit, unit);
    });
};

// スコア描画（石画像の描画）
appView.drawScoreImage = function() {
    const {unit, scoreImages} = appLayout;
    scoreImages.forEach((pos, i) => {
        resImage.draw(`token${i}`, this.cobj, pos.x, pos.y, unit, unit);
    })
};

// スコア描画（文字列の描画）
appView.drawScoreText = function() {
    appLayout.scoreTexts.forEach((obj, i) => {
        // 文字の描画
        const name = ['1P ', '2P '][i];
        const score = revCore.data.scores[i];
        const scoreText = `${score}`.padStart(2, '0');
        const text = `${name}${scoreText}`;
        resFont.draw('main', this.cobj, text, obj.x, obj.y, 1, obj.w);
    });
};

// 表示更新
appView.update = function() {
    // 画面のクリア
    const {w, h, context} = this.cobj;
    context.clearRect(0, 0, w, h);    // クリア

    // 画面の描画
    this.drawToken();   // 全石描画
    this.drawCanPut();  // 配置可能マスの描画
    this.drawScoreImage();  // スコア描画（石画像の描画）
    this.drawScoreText();   // スコア描画（文字列の描画）
};
