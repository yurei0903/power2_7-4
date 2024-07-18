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
  // ゲームプレイ画面を表示する
  settingScene.style.display = 'block';
});

// タイトルに戻るボタンがクリックされたときの処理
back_titleSceneButton.addEventListener('click', () => {
  // タイトル画面を非表示にする
  settingScene.style.display = 'none';
  // ゲームプレイ画面を表示する
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
});