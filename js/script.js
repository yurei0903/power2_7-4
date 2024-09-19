// DOMの読み込みが完了したら実行される関数
document.addEventListener('DOMContentLoaded', () => {
  // スタートボタンの要素を取得
  const startButton = document.getElementById('startButton');
  // 設定ボタンの要素を取得
  const settingButton = document.getElementById('settingButton');
  // タイトルに戻るボタンの要素を取得
  const back_titleSceneButton = document.getElementById('back_titleSceneButton');
  // タイトル画面の要素を取得
  const titleScene = document.getElementById('titleScene');
  // 設定画面の要素を取得
  const settingScene = document.getElementById('settingScene');
  // ゲームプレイ画面の要素を取得
  const gameScene = document.getElementById('gameScene');
  const questionButton = document.getElementById('questionButton');
  
  const stoneStateList = [];
  var stonecolor=1;
  var banmen;
  function loadCSV(filePath, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(xhr.responseText);
      }
    };
    xhr.send();
  }

  // CSVファイルを読み込み、問題を表示する関数
  function displayQuestion(csvText) {
    // CSVファイルの各行を配列に分割
    const rows = csvText.split('\n').map(row => row.split(','));

    // 問題形式を指定（ここで指定した形式の問題を表示する）
    const questionFormat = "択一(文章)";
    const questionContainer = document.getElementById('questionContainer');

    // 各行をループして指定された問題形式の問題を探す
    rows.forEach(row => {
      // 問題形式が一致する場合
      if (row[0] === questionFormat) {
        // 問題文を取得（ダブルクォーテーションを削除）
        const questionText = row[1].replace(/"/g, '');
        // 答えを取得（今回は表示しない）
        const answerText = row[2];

        // 問題文を表示
        questionContainer.innerHTML = `<p>${questionText}</p>`;
      }
    });
  }

  // スタートボタンがクリックされたときの処理
  startButton.addEventListener('click', () => {
    // タイトル画面を非表示にする
    titleScene.style.display = 'none';
    // ゲームプレイ画面を表示する
    gameScene.style.display = 'block';
  });

  // 設定ボタンがクリックされたときの処理
  settingButton.addEventListener('click', () => {
    // タイトル画面を非表示にする
    titleScene.style.display = 'none';
    // 設定画面を表示する
    settingScene.style.display = 'block';
  });

  // タイトルに戻るボタンがクリックされたときの処理
  back_titleSceneButton.addEventListener('click', () => {
    // 設定画面を非表示にする
    settingScene.style.display = 'none';
    // タイトル画面を表示する
    titleScene.style.display = 'block';
  });

  const stage = document.getElementById("stage");
  const squareTemplate = document.getElementById("square-template");
  const put_stone= (place,colorn) =>{
    let color=['tomei','white','black']
    let elements = document.getElementsByClassName('stone');
        let targetElement = elements[place]; 
        targetElement.style.backgroundColor = color[colorn];
        stoneStateList[place]=colorn
  }
  const shokibanmen = () =>{
    put_stone(15,1);
    put_stone(14,2);
    put_stone(21,2);
    put_stone(20,1);
  };
  const beside=(where,flag,ind,muki)=>{//石が置けるかどうか判断する関数
    let mawari=ind-muki*flag;
    if(mawari>=0&&mawari<=35){
      console.log(mawari);
      console.log(ind);
    if(stoneStateList[mawari] !==0 &&stonecolor!==stoneStateList[mawari]){ 
      console.log("ok")
      for(i=0;where[0]-i*flag*muki>0;i++){
        console.log(where[0])
        console.log(i*flag*muki)
          if(stoneStateList[ind-i*flag*muki]==stonecolor){
          for(let n=0;n<i;n++){
            put_stone(ind-n*flag*muki,stonecolor);
          }
          }
      }
    }
  }
}
  const stone_judgement=(ind)=>{
    //console.log(stonecolor);
    let stonestart=stoneStateList[ind];
    console.log(stoneStateList[ind]);
    const stone_where=[ind%6,5-ind%6];
    let tate=6
    let yoko=1
    for(let i=1;i>-2;i=i-2){
      beside(stone_where,i,ind,tate);
      beside(stone_where,i,ind,yoko);
    }
    //console.log(stoneStateList[ind]);
    //console.log(stonestart);
    if(stonestart!==stoneStateList[ind]){
      if(stonecolor==1){
        stonecolor=2;
        console.log("black");
      }
      else{
        stonecolor=1;
        console.log("white");
      }
      //console.log(stonecolor);
    }
    };
  const onClickSquare = (index) => {//石がクリックされたときに動く関数
    if(stoneStateList[index]!==0){
      alert("ここにはおけません");
    }
    stone_judgement(index)
  }
  const createSquares = () => {//最初に白い石と黒い石を置く関数
    for(let i=0; i<36; i++){
      const square = squareTemplate.cloneNode(true); //テンプレートから要素をクローン
      square.removeAttribute("id"); //テンプレート用のid属性を削除

      stage.appendChild(square); //マス目のHTML要素を盤に追加
      const stone = square.querySelector('.stone');
      let defaultState;
    //iの値によってデフォルトの石の状態を分岐する
    if (i == 15 || i == 20) {
      defaultState = 1;
    } else if (i == 14 || i == 21) {
      defaultState = 2;
    } else {
      defaultState = 0;
    }

    stone.setAttribute("data-state", defaultState);
    //ここから追加
    stone.setAttribute("data-index", i); //インデックス番号をHTML要素に保持させる
    stoneStateList.push(defaultState); //初期値を配列に格納
      square.addEventListener('click', () => {
        onClickSquare(i);
      })
    }
    shokibanmen();
    const parent = document.getElementById('parent');
  };


  // マス目を作成
  createSquares();

  // 設定ボタンがクリックされたときの処理
  questionButton.addEventListener('click', () => {
    // CSVファイルを読み込んで問題を表示
    loadCSV('csv/quiz_20240718.csv', displayQuestion);
  });
});