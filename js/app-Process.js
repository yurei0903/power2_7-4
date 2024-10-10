//実行3:COM手番
appProcess.tryCom=async function(){
    const {types,player}=revCore.data;
    if(types[player]!=='COM')return false;
    const pos =revCom.get();
    await this.put(pos.x,pos.y);
    return true;
};