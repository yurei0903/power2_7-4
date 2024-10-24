// サンプルデータと同様のJSON形式の問題セットを外部ファイルから読み込む
fetch('questions.json')
    .then(response => response.json())
    .then(questionData => {
        // ボタンにイベントリスナーを設定
        document.getElementById('load-question').addEventListener('click', () => loadQuestion(questionData));
    })
    .catch(error => console.error('Error loading the question data:', error));

// 問題をロードする関数
function loadQuestion(questionData) {
    // ランダムに問題を選択（単純な方法でランダムな問題を選ぶ）
    const randomIndex = Math.floor(Math.random() * questionData.length);
    const selectedQuestion = questionData[randomIndex];

    // question-areaに問題と形式を表示
    const questionArea = document.getElementById('question-area');
    questionArea.innerHTML = '<h3>問題形式: ' + selectedQuestion.問題形式 + '</h3>' +
                             '<p>' + selectedQuestion.問題文 + '</p>';
    
    // 格納した問題形式に基づき答え表示の方法を指定する
    if (selectedQuestion.問題形式 === "択一(文章)") {
        questionArea.innerHTML += '<button onclick="checkAnswer(\'' + selectedQuestion["答え"] + '\', \'多肢選択\')">答えを確認</button>';
    } else if (selectedQuestion.問題形式 === "一問一答") {
        questionArea.innerHTML += '<button onclick="checkAnswer(\'' + selectedQuestion["答え"] + '\', \'一問一答\')">答えを確認</button>';
    }
}

// 答えを確認する関数
function checkAnswer(correctAnswer, format) {
    let userAnswer = document.getElementById('input-text').value;
    if (format === "一問一答") {
        // 一問一答では文字の最初部分を確認
        userAnswer = userAnswer.trim();
        if (userAnswer && userAnswer.charAt(0) === correctAnswer.charAt(0)) {
            alert("正解です！");
        } else {
            alert("残念、不正解です。");
        }
    } else if (format === "多肢選択") {
        // 択一の確認
        if (userAnswer === correctAnswer.charAt(0)) {
            alert("正解です！");
        } else {
            alert("残念、不正解です。");
        }
    }
    ocument.getElementById('input-text').value = '';
}