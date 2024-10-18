// アプリ リソース
const appResource = {};

// リソースの読み込み
appResource.load = async function() {
    resAudio.init();
    resAudio.load('bgm',  'audio/bgm.mp3');
    resAudio.load('se',   'audio/se.mp3');
    resAudio.load('WIN',  'audio/win.mp3');
    resAudio.load('LOSE', 'audio/lose.mp3');
    resAudio.load('DRAW', 'audio/lose.mp3');

    const r = [];
    r.push(resImage.load('token0', 'image/akakoma.png'));
    r.push(resImage.load('token1', 'image/sirokoma.png'));
    r.push(resImage.load('square', 'image/square.png'));
    r.push(resImage.load('active', 'image/active.png'));
    r.push(resFont.load('main', 'ArchivoBlack'));
    await Promise.all(r);
};
