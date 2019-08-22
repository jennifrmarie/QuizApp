'use strict';
const STORE = {
    questions: [
        {
            text: "At the beginning of the series, how many children do Ned and Catelyn Stark have?",
            answers: ['three', 'four', 'five', 'six'],
            correct: 'five'
        },
        {
            text: "Who is the first character in the series to be called 'King in the North'?",
            answers: ['Rob Stark', 'Ned Stark', 'Jon Snow', 'Bran Stark'],
            correct: 'Rob Stark'
        },
        {
            text: "What is Jon Snow's real name?",
            answers: ['Jon Stark', 'Aegon Targaryen', 'Rhaegar Targaryen', 'Edwin Stark'],
            correct: 'Aegon Targaryen'
        },
        {
            text: "Which of these characters has Brienne of Tarth NOT defended?",
            answers: ['Sansa Stark', 'Arya Stark', 'Tyrion Lannister', 'Renly Baratheon'],
            correct: 'Tyrion Lannister'
        },
        {
            text: "What language do Red Priests and Prestesses use?",
            answers: ['Old Tongue', 'High Valyrian', 'Asshali', 'Ghisari'],
            correct: 'High Valyrian'
        },
        {
            text: "What is one of the few known substances to kill white walkers",
            answers: ['dragonfire', 'castle-forged steel', 'firesword', 'valyrian steel'],
            correct: 'valyrian steel'
        },
        {
            text: 'What does the phrase "Valor Morghullis" mean?',
            answers: ['"all men must die"', '"all men must serve"', '"all men must live"', '"all men must change faces"'],
            correct: 'all men must die'
        },
        {
            text: 'Which Stark family direwolf was killed in retalilation for an attack on King Joffrey?',
            answers: ['Ghost', 'Lady', 'Nymeria', 'Winter'],
            correct: 'Lady'
        },
        {
            text: "What was Arya's punishment for stealing from the Many-Faced God?",
            answers: ['death', 'memory loss', 'decapitation', 'blindness'],
            correct: 'blindness'
        },
        {
            text: "Who won the Game of Thrones?",
            answers: ['Jon Snow', 'Sansa Stark', 'Bran Stark', 'Tyrion Lannister'],
            correct: 'Bran Stark'
        }
    ],
    currentQuestionIndex: 0,
}

let score = 0;
let total = STORE.questions.length;
console.log(total);


function displayPageLand() {
    $('.question-answer').html(`
    <section class="welcome-page"> 
    <div class="begin">
    <h2>"When you play the game of thrones, you win or you die...</h2>
    <button class="start-quiz">start quiz</button>
    </div>
    </section>
`)


}
function startQuizListen() {
    console.log('listen start quiz')
    $('.start-quiz').on('click', (e) => {
        $('.answer-question').removeClass('.welcome-page');

        e.preventDefault()
        displayQuizPage();


    })

}

function displayQuizPage() {
    const currentQuestionIndex =
        STORE.currentQuestionIndex;
    const currentQuestion =
        STORE.questions[currentQuestionIndex];
    let newQuizPage =
        `<header class="quesNum">Question: ${STORE.currentQuestionIndex + 1} out of 10</header>
    <div class="quiz-page">
        <h2>${currentQuestion.text}</h2>
        <ul class="answer-list">
        <form class="question-form">
            <fieldset>
                <label class="answerOption">
                <li>
                    <input type="radio" value="${currentQuestion.answers[0]}" name="radio" class="answer" required>
                    <span>${currentQuestion.answers[0]}</span>
                </label>
                </li>
                <label class="answerOption">
                <li>
                    <input type="radio" value="${currentQuestion.answers[1]}" name="radio" class="answer" required>
                    <span>${currentQuestion.answers[1]}</span>
                </label>
                </li>
                <li>
                    <label class="answerOption">
                        <input type="radio" value="${currentQuestion.answers[2]}" name="radio" class="answer" required>
                        <span>${currentQuestion.answers[2]}</span>
                </label>
                </li>
                    <label class="answerOption">
                <li>
                    <input type="radio" value="${currentQuestion.answers[3]}" name="radio" class="answer" required>
                    <span>${currentQuestion.answers[3]}</span>
                </label>
                </li>
        <button type="submit" class="submitButton">Submit</button>
        </div> <br>
        </ul>
            </fieldset>
        </form>
<footer role="content info" class="score"> Score: ${score} out of 10</footer> `;

    $('.question-answer').html(newQuizPage);
    // $('.page-load').on('click', '.start-quiz', displayQuizPage)
    // rightWrong();
}

function rightWrong() {
    let correctAnswer = (STORE.questions[STORE.currentQuestionIndex].correct);
    console.log(correctAnswer);
    $('.question-answer').on('submit', '.question-form', function (event) {
        event.preventDefault();
        let selectItem = $('input:checked')
        let answer = selectItem.val()
        console.log(answer)
        $('.quiz-page, .score, .quesNum').remove();
        if (answer === correctAnswer) {
            score++;
        }
        if (STORE.currentQuestionIndex + 1 === total) {
            $('.question-answer').html(`<span class="result">"That's what I do: I drink and I know things."
            <br><em>-Tyrian Lannister</em><br><br>You got ${score} out of 10!</span>
            <button type="button" class="restartquiz">Wanna try again?</button>`)
            startOver();
        } else if (answer === correctAnswer) {
            correctFeedbackScreen();
        } else {
            wrongFeedbackScreen();
        }
    })
}
function startOver() {
    $('.question-answer').on('click', '.restartquiz', function (event) {
        location.reload();
    });
}

function correctFeedbackScreen() {
    $('.question-answer').html(`<h1>Hoder! That's correct!</h1>
    <button type="button" class="next"> Next Question</button>`)
    STORE.currentQuestionIndex++
}
function wrongFeedbackScreen() {
    let userCorrectAnswer = STORE.questions[STORE.currentQuestionIndex].correct;
    console.log(userCorrectAnswer);
    $('.question-answer').html(`<h1>SHAME! SHAME! SHAME! <br> The correct answer is: "${userCorrectAnswer}"</h1>
    <button type="button" class="next"> Next Question</button>`)
    STORE.currentQuestionIndex++
}
function nextQuestion() {
    $('.question-answer').on('click', '.next', function (e) {
        e.preventDefault()
        console.log(STORE.currentQuestionIndex);
        displayQuizPage();
    })
}

function invokeAll() {
    // invoke all functions
    displayPageLand();
    // dispplay welcome page
    startQuizListen();
    // listening for user to click 'start quiz' button
    rightWrong();
    // listening for user to  submit the answer form
    nextQuestion();
    // listening for user to click next question button


}
// events
$(invokeAll);