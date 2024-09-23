const questions = [
    {
        question: "Natural de Formiga, Minas Gerais, Fábio de Melo tem milhões de seguidores nas redes sociais. Ele é cantor, compositor, escritor e:",
        answers: ["Piloto de Avião", "Advogado", "Padre", "Veterinário"],
        correctAnswer: 2
    },
    {
        question: "Qual era o nome do meio de Walt Disney?",
        answers: ["James", "Elias", "Winston", "Benjamin"],
        correctAnswer: 1
    },
    {
        question: "A atriz Isis Valverde nasceu em Aiuruoca, cidade que fica em:",
        answers: [
            "Santa Catarina",
            "Minas Gerais",
            "São Paulo",
            "Tocantins"
        ],
        correctAnswer: 1
    },
    {
        question: "Qual é o nome de registro da cantora Anitta?",
        answers: [
            "Manuela",
            "Marisa",
            "Larissa",
            "Clarissa"
        ],
        correctAnswer: 2
    },
    {
        question: "Qual é o nome da filha da atriz Tatá Werneck com o ator Rafael Vitti, nascida em outubro de 2019?",
        answers: [
            "Ana Cladia",
            "Clara Maria",
            "Ana Carolina",
            "Maria Eduarda"
        ],
        correctAnswer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

function loadQuestion() {
    clearInterval(timerInterval);
    timeLeft = 15;

    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    const q = questions[currentQuestionIndex];
    const div = document.createElement('div');
    div.setAttribute('id', `question${currentQuestionIndex}`);
    div.innerHTML = `<h3>${q.question}</h3>`;

    q.answers.forEach((answer, i) => {
        div.innerHTML += `<label>
            <input type="radio" name="question${currentQuestionIndex}" value="${i}"> ${answer}
        </label><br>`;
    });

    questionContainer.appendChild(div);

    const timerDiv = document.getElementById('timer');
    timerDiv.innerHTML = `Tempo restante: ${timeLeft} segundos`;

    timerInterval = setInterval(function() {
        timeLeft--;
        timerDiv.innerHTML = `Tempo restante: ${timeLeft} segundos`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkAnswer();
        }
    }, 1000);
}

function checkAnswer() {
    clearInterval(timerInterval);

    const q = questions[currentQuestionIndex];
    const selectedAnswer = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    const questionDiv = document.getElementById(`question${currentQuestionIndex}`);

    questionDiv.classList.remove('right', 'wrong');

    if (selectedAnswer) {
        const selectedValue = parseInt(selectedAnswer.value);
        if (selectedValue === q.correctAnswer) {
            score++;
            questionDiv.classList.add('right');
        } else {
            questionDiv.classList.add('wrong');
            displayCorrectAnswer(q.correctAnswer);
        }
    } else {
        questionDiv.classList.add('wrong');
        displayCorrectAnswer(q.correctAnswer);
    }

    setTimeout(function() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            displayFinalResult();
        }
    }, 2000);
}

function displayCorrectAnswer(correctAnswerIndex) {
    const correctAnswerText = questions[currentQuestionIndex].answers[correctAnswerIndex];
    const correctAnswerDiv = document.createElement('div');
    correctAnswerDiv.style.color = '#155724';
    correctAnswerDiv.style.fontWeight = 'bold';
    correctAnswerDiv.innerHTML = `Resposta correta: ${correctAnswerText}`;
    document.getElementById(`question${currentQuestionIndex}`).appendChild(correctAnswerDiv);
}

function displayFinalResult() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `Você acertou ${score} de ${questions.length} perguntas.`;

    const timerDiv = document.getElementById('timer');
    timerDiv.innerHTML = '';
}

function reset() {
    location.reload();
}

window.onload = loadQuestion;
