// アプリ 進行の演出
const appProcessEffect = {};

// 開始時演出実行
appProcessEffect.execStart = function() {
    resAudio.play('bgm', true);     // BGM再生ループ付き
};

// 石配置時演出実行
appProcessEffect.execPut = async function() {
    resAudio.play('se');    // 配置SE再生
    await appEffect.updateBoard();  // エフェクト表示
};

// パス時演出実行
appProcessEffect.execPass = async function() {
    await appEffect.popupMessage('PASS');   // メッセージ
};

// 終了時演出実行
appProcessEffect.execEnd = async function() {
    // 勝敗の結果
    const {scores} = revCore.data;
    let res = 'LOSE';
    if (scores[0] >  scores[1]) res = 'WIN';
    if (scores[0] == scores[1]) res = 'DRAW';

    // 勝敗をしらせる
    resAudio.stop('bgm');   // BGM停止
    resAudio.play(res);     // 終了時サウンド再生
    await appEffect.popupMessage(res);  // メッセージ
    await gameUtil.sleep(1500);
};
