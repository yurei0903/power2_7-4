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

  const createSquares = () => {
    for (let i = 0; i < 36; i++) {
      const square = squareTemplate.cloneNode(true); //テンプレートから要素をクローン
      square.removeAttribute("id"); //テンプレート用のid属性を削除
      stage.appendChild(square); //マス目のHTML要素を盤に追加
    }
  };

  // マス目を作成
  createSquares();

  // 設定ボタンがクリックされたときの処理
  questionButton.addEventListener('click', () => {
    // CSVファイルを読み込んで問題を表示
    loadCSV('csv/quiz_20240718.csv', displayQuestion);
  });
});