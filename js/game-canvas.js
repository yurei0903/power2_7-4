class gameCanvas{
    //キャンバスの生成
    static genCanvas(w,h){
        const canvas = document.createElement('canvas');
        canvas.width = w; //横幅設定
        canvas.height = h; //高さ設定
        const context = canvas.getContext('2d');
        return {canvas,context,w,h};
    }
}
//指定要素下に、指定サイズでキャンバスを作成して格納
gameCanvas.addCanvas = function(selector,w,h){
    const cobj = thid.ganCanvas(w,h);
    vonst element = document.querySelector(selector);
    element.append(cobj.canvas);
    return cobj;
};
