// リバーシ 盤面読み取り低レベル
const revLow = {};

// 盤面走査（要素番号、X、Y位置を関数に渡す）
revLow.scanBoard = function(func) {
    for (let y = 0; y < RevData.h; y ++) {
        for (let x = 0; x < RevData.w; x ++) {
            func(x, y);
        }
    }
};

// 基点のXYから8方向を走査
revLow.scan8Direction = function(board, x, y, func) {
    const directions = [  // 8方向
        {x: -1, y: -1}, {x: 0, y: -1}, {x:  1, y: -1}, 
        {x: -1, y:  0},                {x:  1, y:  0},
        {x: -1, y:  1}, {x: 0, y:  1}, {x:  1, y:  1},
    ];
    directions.forEach(dir => {
        const line = this.getLine(board, x, y, dir.x, dir.y);
        func(line, dir);
    });
};

// 基点のXYから4方向を走査
revLow.scan4Direction = function(board, x, y, func) {
    const directions = [  // 4方向
                        {x: 0, y: -1},
        {x: -1, y:  0},                {x:  1, y:  0},
                        {x: 0, y:  1},
    ];
    directions.forEach(dir => {
        const line = this.getLine(board, x, y, dir.x, dir.y);
        func(line, dir);
    });
};

// 1方向のマスの一覧を得る
revLow.getLine = function(board, startX, startY, dirX, dirY) {
    const res = [];
    for (let move = 1;; move ++) {
        const x = startX + move * dirX;
        const y = startY + move * dirY;
        if (! gameUtil.inRange(x, y, RevData)) break;   // 範囲外
        res.push({x, y, p: board[y][x]});
    }
    return res;
};
