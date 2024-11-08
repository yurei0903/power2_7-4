// DOMの読み込みが完了したら実行される関数
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton');
  const settingButton = document.getElementById('settingButton');
  const back_titleSceneButton = document.getElementById('back_titleSceneButton');
  const titleScene = document.getElementById('titleScene');
  const settingScene = document.getElementById('settingScene');
  const gameScene = document.getElementById('gameScene');
  const questionButton = document.getElementById('questionButton');
    // 設定ボタンがクリックされたときの処理!!!!!!!!
    settingButton.addEventListener('click', () => {
      // タイトル画面を非表示にする
      titleScene.style.display = 'none';
      // 設定画面を表示する
      settingScene.style.display = 'block';

      document.getElementById('btn_audio').currentTime = 0; //連続クリックに対応
      document.getElementById('btn_audio').play(); //クリックしたら音を再生
    });
  
    // タイトルに戻るボタンがクリックされたときの処理!!!!!!
    back_titleSceneButton.addEventListener('click', () => {
      // 設定画面を非表示にする
      settingScene.style.display = 'none';
      // タイトル画面を表示する
      titleScene.style.display = 'block';

      document.getElementById('btn_audio').currentTime = 0; //連続クリックに対応
      document.getElementById('btn_audio').play(); //クリックしたら音を再生
    });

  banmen[3][4]=0;
  banmen[4][3]=0;
  banmen[3][3]=1;
  banmen[4][4]=1;
  //確認用後で消す
  console.log(banmen[3][4]);
  console.log(banmen[4][3]);
  console.log(banmen[4][4]);
  console.log(banmen[3][3]);
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

  const stage = document.getElementById("stage");
  const squareTemplate = document.getElementById("square-template");
  
//getReversibleStones関数のすぐ上に書きましょう

  const shokibanmen = () =>{
    put_stone(15,'white');
    put_stone(14,'black');
    put_stone(21,'black');
    put_stone(20,'white');
  };
  const stone_judgement=(ind)=>{
    for(let i=6;i<5;i--){
      if(ind%i==0){
        alert("ここにはおけません");
      }
    }
  }
  const onClickSquare = (index) => {
    if(stoneStateList[index]!==0){
      alert("ここにはおけません");
    }
    stone_judgement(stoneStateList[index])
  }

  const createSquares = () => {//最初に白い石と黒い石を置く関数
    for(var n=0; n<36; n++){
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

    shokibanmen();
    const parent = document.getElementById('parent');
  };

  
  // マス目を作成
  createSquares()
stone.setAttribute("data-state", defaultState);

  };


window.onload = () => {
    createSquares();
    passButton.addEventListener("click", () => {
      currentColor = 3 - currentColor;
      if (currentColor === 1) {
        currentTurnText.textContent = "黒";
      } else {
        currentTurnText.textContent = "白"
      }
    })
  }
  // 設定ボタンがクリックされたときの処理
  questionButton.addEventListener('click', () => {
    // CSVファイルを読み込んで問題を表示
    loadCSV('csv/quiz_20240718.csv', displayQuestion);
  });
});

//音量バーの調整の処理

const bgmSwitch = document.querySelector(".bgmSwitch");
const bgmSwitch_toggle = document.querySelector(".bgmSwitch_toggle");

bgmSwitch.addEventListener("click", () => {
  bgmSwitch.classList.toggle("active");
  bgmSwitch_toggle.classList.toggle("active");
});

const volumebar = document.getElementById('volumebar'); 
const volumevalue = document.getElementById('volume-value'); 

const setvolume = (val) => {
  volumevalue.innerText = val;
}
const rangeOnChange = (e) =>{
  setvolume(e.target.value);
}
window.onload = () => {
  volumebar.addEventListener('input', rangeOnChange); 
}
