// アプリ リソース
const appResource = {};

// リソースの読み込み
appResource.load = async function() {
    resAudio.init();
    resAudio.load('bgm',  'audio/komizuwomitsumete.mp3');
    resAudio.load('se',   'audio/click.mp3');
    resAudio.load('WIN',  'audio/win.mp3');
    resAudio.load('LOSE', 'audio/lose.mp3');
    resAudio.load('DRAW', 'audio/lose.mp3');

    const r = [];
    r.push(resImage.load('token0', 'images/game/red.png'));
    r.push(resImage.load('token1', 'images/game/white.png'));
    r.push(resImage.load('square', 'images/game/square.png'));
    r.push(resImage.load('active', 'images/game/active.png'));
    r.push(resFont.load('main', 'ZenMaruGothic'));
    await Promise.all(r);
};
