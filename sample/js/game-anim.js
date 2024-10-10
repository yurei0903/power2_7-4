// ゲーム アニメーション
const gameAnim = {holder: [], time: {old: 0, now: 0, sum: 0}};

// アニメーションの開始
gameAnim.start = function() {
    this.time.old = Date.now(); // 過去時間
    const func = () => {        // 繰り返す関数
        this.update();
        requestAnimationFrame(func);
    };
    func();
};

// アニメーションの更新（時間の更新と、ホルダーの関数を全実行）
gameAnim.update = function() {
    this.time.now = Date.now();         // 新規時間
    this.time.diff = this.time.now - this.time.old; // 差分時間
    this.time.sum += this.time.diff;    // 差分時間加算
    this.time.old = this.time.now;      // 過去時間
    this.holder.forEach(x => x.func()); // 関数を全実行
};

// アニメーションの追加
gameAnim.add = function(id, func) {
    this.holder.push({id, func});
};

// アニメーションの削除
gameAnim.remove = function(id) {
    this.holder = this.holder.filter(x => x.id !== id);
};
