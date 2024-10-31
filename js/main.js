document.addEventListener('DOMContentLoaded', async () => {
    await appResource.load();   // リソースの読み込み
    revCore.init();     // 盤面の初期化
    appView.init();     // 表示の初期化
    gameAnim.add('main', () => appView.update());   // 表示更新
    gameAnim.start();   // アニメーション開始
    appProcess.start(); // ゲームの開始
});
