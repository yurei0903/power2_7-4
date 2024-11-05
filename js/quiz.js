var hantei=true;
var lock=true;
async function quizdasu() {
    try {
        if(lock){
        const response = await fetch('JSON/questions.json');
        const questionData = await response.json();
        // loadQuestionがPromiseを返すようにします
        return await loadQuestion(questionData);
        }
    } catch (error) {
        console.error('Error loading the question data:', error);
        return false;
    }
}

// 問題をロードする関数
function loadQuestion(questionData) {
    return new Promise((resolve) => {
        const randomIndex = Math.floor(Math.random() * questionData.length);
        const selectedQuestion = questionData[randomIndex];
        console.log(selectedQuestion.答え)
        const questionArea = document.getElementById('question-area');
        questionArea.innerHTML = '<h3>問題形式:' + selectedQuestion.問題形式 + '</h3>' +
                                '<p>' + selectedQuestion.問題文 + '</p>';
        const quizElement = document.getElementById('quiz');
        quizElement.style.display = 'block'; // 要素を表示

        if (selectedQuestion.問題形式 === "択一(文章)" || 
            selectedQuestion.問題形式 === "一問一答" || 
            selectedQuestion.問題形式 === "二択") {
            questionArea.innerHTML += '<button id="answer">答えを確認</button>';
        }

        setTimeout(() => {
            const answerButton = document.getElementById('answer');
            if (answerButton) {
                lock=false;
                answerButton.addEventListener('click', function () {
                    const result = checkAnswer(selectedQuestion["答え"], selectedQuestion.問題形式);
                    resolve(result);  // 結果をPromiseとして返す
                });
            } else {
                console.error('Button with id="answer" not found.');
                resolve(false);  // エラーの場合は何らかのデフォルト値を返す
            }
        }, 0);
    });
}


// 答えを確認する関数
function checkAnswer(correctAnswer, format) {
    let userAnswer = document.getElementById('kaitou').value;
    if (format === "一問一答") {
        // 一問一答では文字の最初部分を確認
        userAnswer = userAnswer.trim();
        if (userAnswer && userAnswer === correctAnswer) {
            alert("正解です！");
            hantei=true;
        } else {
            alert("残念、不正解です。");
            hantei=false;
        }
    } else if (format === "二択" || format === "択一(文章)" ) {
        console.log("二択");
        userAnswer = userAnswer.trim();
        // 択一の確認
        if (userAnswer.charAt(0) === correctAnswer.charAt(0)) {
            alert("正解です！")
            hantei=true;
            
        } else {
            alert("残念、不正解です。");
            hantei=false;
        }
    }
    document.getElementById('kaitou').value = '';
    const parent = document.getElementById('question-area');
    while(parent.firstChild){
    parent.removeChild(parent.firstChild);
    }
    console.log("START");
    lock=true;
    return(hantei)
}