document.addEventListener('DOMContentLoaded', function() {
    let revData = new RevData();
    console.log(revData.scores);

    let cobj = gameCanvas.addBgCanvas('#target', 1200, 800);

    let image = new Image();
    image.onload = function(){
        cobj.context.drawImage(image, 0, 0);
    };
    image.src = 'images/akakoma.png';
});
// リバーシ データ
class RevData {
    //静的プロパティ
    static w = 6;       //盤面横幅
    static h = 6;       //盤面高さ
    static x = 0;       //範囲判定用の最小X座標
    static y = 0;       //範囲判定用の最小X座標
    static blank = 8;   //空マス(石マスはプレイヤー番号0,1)

    //コンストラクター
    constructor(){
        this.player = 0;             //現在の手番プレイヤー
        this.isEnd = false;          //終了フラグ
        this.scores = [2, 2];        //獲得石数
        this.types = ['MAN', 'COM']; //プレイヤー種類
        this.board = [               //盤面
            [8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8],
            [8, 8, 1, 0, 8, 8],
            [8, 8, 0, 1, 8, 8],
            [8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8]
        ];
        this.putToken = {x: 0, y: 0};//ログ:石置き場所
        this.activeSquares = [];     //配置可能マス配列
        this.revTokens = []           //ログ:裏返した石の配列
        
        
    }
}

