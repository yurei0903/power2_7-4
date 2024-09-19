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
  
//getReversibleStones関数のすぐ上に書きましょう

const currentTurnText = document.getElementById("current-turn");
const passButton = document.getElementById("pass");
//onClickSquare関数のすぐ上に記述しましょう
let currentColor = 1;
const getReversibleStones = (idx) => {
  //クリックしたマスから見て、各方向にマスがいくつあるかをあらかじめ計算する
  //squareNumsの定義はやや複雑なので、理解せずコピーアンドペーストでも構いません
  const squareNums = [
    5 - (idx % 6),
    Math.min(5 - (idx % 6), (30 + (idx % 6) - idx) / 6),
    (30 + (idx % 6) - idx) / 6,
    Math.min(idx % 6, (30 + (idx % 6) - idx) / 6),
    idx % 6,
    Math.min(idx % 6, (idx - (idx % 6)) / 6),
    (idx - (idx % 6)) / 6,
    Math.min(5 - (idx % 6), (idx - (idx % 6)) / 6),
  ];
  
  const parameters = [1, 7, 6, 5, -1, -7, -6, -5];

  //ここから下のロジックはやや入念に読み込みましょう
  //ひっくり返せることが確定した石の情報を入れる配列
  let results = [];

  //8方向への走査のためのfor文
  for (let i = 0; i < 8; i++) {
    //ひっくり返せる可能性のある石の情報を入れる配列
    const box = [];
    //現在調べている方向にいくつマスがあるか
    const squareNum = squareNums[i];
    const param = parameters[i];
    //ひとつ隣の石の状態
    const nextStoneState = stoneStateList[idx + param];

    //フロー図の[2][3]：隣に石があるか 及び 隣の石が相手の色か -> どちらでもない場合は次のループへ
    if (nextStoneState === 0 || nextStoneState === currentColor) continue;
    //隣の石の番号を仮ボックスに格納
    box.push(idx + param);

    //フロー図[4][5]のループを実装
    for (let j = 0; j < squareNum - 1; j++) {
      const targetIdx = idx + param * 2 + param * j;
      const targetColor = stoneStateList[targetIdx];
      //フロー図の[4]：さらに隣に石があるか -> なければ次のループへ
      if (targetColor === 0) continue;
      //フロー図の[5]：さらに隣にある石が相手の色か
      if (targetColor === currentColor) {
        //自分の色なら仮ボックスの石がひっくり返せることが確定
        results = results.concat(box);
        break;
      } else {
        //相手の色なら仮ボックスにその石の番号を格納
        box.push(targetIdx);
      }
    }
  }
  //ひっくり返せると確定した石の番号を戻り値にする
  return results;
};
  //関数の中身を以下のように編集しましょう
const onClickSquare = (index) => {
  //ひっくり返せる石の数を取得
  const reversibleStones = getReversibleStones(index);

  //他の石があるか、置いたときにひっくり返せる石がない場合は置けないメッセージを出す
  if (stoneStateList[index] !== 0 || !reversibleStones.length) {
    alert("ここには置けないよ！");
    return;
  }

  //自分の石を置く 
  stoneStateList[index] = currentColor;
  document
    .querySelector(`[data-index='${index}']`)
    .setAttribute("data-state", currentColor);

  //相手の石をひっくり返す = stoneStateListおよびHTML要素の状態を現在のターンの色に変更する
  reversibleStones.forEach((key) => {
    stoneStateList[key] = currentColor;
    document.querySelector(`[data-index='${key}']`).setAttribute("data-state", currentColor);
  });

  //もし盤面がいっぱいだったら、集計してゲームを終了する
  if (stoneStateList.every((state) => state !== 0)) {
    const blackStonesNum = stoneStateList.filter(state => state === 1).length;
    const whiteStonesNum = 36 - whiteStonesNum;

    let winnerText = "";
    if (blackStonesNum > whiteStonesNum) {
      winnerText = "黒の勝ちです！";
    } else if (blackStonesNum < whiteStonesNum) {
      winnerText = "白の勝ちです！";
    } else {
      winnerText = "引き分けです";
    }

    alert(`ゲーム終了です。白${whiteStonesNum}、黒${blackStonesNum}で、${winnerText}`)
  }

  //ゲーム続行なら相手のターンにする
  currentColor = 3 - currentColor;

  if (currentColor === 1) {
    currentTurnText.textContent = "黒";
  } else {
    currentTurnText.textContent = "白";
  }
}
  const createSquares = () => {//最初に白い石と黒い石を置く関数
    for(let i=0; i<36; i++){
      const square = squareTemplate.cloneNode(true);
    square.removeAttribute("id");
    stage.appendChild(square);

    const stone = square.querySelector('.stone');
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