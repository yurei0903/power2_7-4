const revCom ={};
//COMの指し手を取得
revCom.get=function(){
    const {board,player}=revCore.data;
    const max = revCom.think(board,player,0);
    return max.square;
};

//思考
revCom.think=function(board,player,nest){
    let max = {value:-9999,square:null};//評価後，石を置く場所
    const activeSqurares=revMid.getAllActive(board,player);

    activeSqurares.forEach(square=>{
        const{x,y}=square;
        let value =this.evalFromTable(x,y);
        if(value>max.value) max={value,square};
        if(value>max.value)max={value,square};//最大時の更新
    });
    return max;
}


//盤面評価表の利用
revCom.evalFromTable=function(x,y){
    const value Table=[
        [64, 1, 8, 4, 4, 8, 1,64],
        [ 1, 1,10,12,12,10, 1, 1],
        [ 8,10,14,16,16,14,10, 8],
        [ 4,12,16, 1, 1,16,12, 4],
        [ 4,12,16, 1, 1,16,12, 4],
        [ 8,10,14,16,16,14,10, 8],
        [ 1, 1,10,12,12,10, 1, 1],
        [64, 1, 8, 4, 4, 8, 1,64]
    ];
    const value = valueTable[y][x];
    return value;
    
}