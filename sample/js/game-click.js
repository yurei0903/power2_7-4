// ゲーム クリック
const gameClick = {holder: {}};

// クリックの追加
gameClick.add = function(element, id, funcClick) {
    const func = e => {
        let eX = e.clientX;
        let eY = e.clientY;
        if (e.changedTouches) {
            eX = e.changedTouches[0].clientX;
            eY = e.changedTouches[0].clientY;
        }
        const rect = element.getBoundingClientRect();
        funcClick(eX - rect.left, eY - rect.top);
    };
    element.addEventListener('click', func);
    this.holder[id] = {element, func};
};

// クリックの削除
gameClick.remove = function(id) {
    const object = this.holder[id];
    if (! object) return;
    object.element.removeEventListener('click', object.func);
    delete this.holder[id];
};
