// リソース 音声
const resAudio = {context: null, holder: {}};

// 初期化（環境依存対策として初回クリック時のダミー音声操作を登録）
resAudio.init = function() {
    document.addEventListener('click', () => {
        this.context = new AudioContext();
        this.context.resume();
    }, {once: true, capture: true});
};

// Audioの読み込み（登録だけして初回クリック時に読み込む）
resAudio.load = function(id, url) {
    document.addEventListener('click', async () => {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = await this.context.decodeAudioData(arrayBuffer);
        this.holder[id] = {buffer, source: null};
    }, {once: true});
};

// 再生
resAudio.play = async function(id, isLoop) {
    while (! this.holder[id]) {
        await gameUtil.sleep(50);
    }
    this.stop(id);  // 再生中なら停止する
    const data = this.holder[id];
    data.source = this.context.createBufferSource();
    data.source.buffer = data.buffer;
    data.source.connect(this.context.destination);
    data.source.loop = isLoop === true;
    data.source.start();
};

// 停止
resAudio.stop = function(id) {
    const data = this.holder[id];
    if (! data || ! data.source) return;
    data.source.stop();
};
