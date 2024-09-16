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

// Carrega perguntas na página
function loadQuestions() {
    const questionContainer = document.getElementById('question-container');
    questions.forEach((q, index) => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${q.question}</h3>`;
        q.answers.forEach((answer, i) => {
            div.innerHTML += `<label>
                <input type="radio" name="question${index}" value="${i}"> ${answer}
            </label><br>`;
        });
        questionContainer.appendChild(div);
    });
}

// Avalia as respostas fornecidas pelo usuário
function submitAnswers() {
    questions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        const labels = document.querySelectorAll(`input[name="question${index}"]`);

        labels.forEach((label, i) => {
            const parentLabel = label.parentElement;
            if (i === q.correctAnswer) {
                parentLabel.classList.add('correta');
            }
            if (selectedAnswer && parseInt(selectedAnswer.value) !== q.correctAnswer && parseInt(selectedAnswer.value) === i) {
                parentLabel.classList.add('incorreta');
            }
        });
    });
    document.getElementById('result').innerHTML = `You scored ${score} out of ${questions.length}`;
}

function reset(){
    location.reload();
}

window.onload = loadQuestions;