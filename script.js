const quizData = [
    {
        question: "Qual é o resultado de '2' + 2 em JavaScript?",
        options: ["22", "4", "'22'", "NaN"],
        correct: 0
    },
    {
        question: "Qual dos seguintes métodos converte uma string para um número?",
        options: ["parseInt()", "toString()", "join()", "pop()"],
        correct: 0
    },
    {
        question: "Qual operador é usado para atribuição em JavaScript?",
        options: ["=", "==", "===", ":"],
        correct: 0
    },
    {
        question: "Como declarar uma função em JavaScript?",
        options: ["function myFunction()", "declare function myFunction()", "def myFunction()", "func myFunction()"],
        correct: 0
    },
    {
        question: "Como você seleciona um elemento com o id 'demo' em JavaScript?",
        options: ["document.getElementById('demo')", "document.querySelectorAll('#demo')", "document.querySelector('demo')", "$('#demo')"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Carregar a primeira pergunta
function loadQuestion() {
    const questionData = quizData[currentQuestion];
    document.getElementById("question").innerText = questionData.question;
    const options = document.getElementById("options");
    options.innerHTML = "";
    questionData.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<input type="radio" name="option" value="${index}" id="option${index}">
                        <label for="option${index}">${option}</label>`;
        options.appendChild(li);
    });
}

// Verificar a resposta selecionada
function checkAnswer() {
    const selectedOption = document.querySelector("input[name='option']:checked");
    if (selectedOption) {
        const selectedAnswer = parseInt(selectedOption.value);
        userAnswers.push({
            question: quizData[currentQuestion].question,
            correctAnswer: quizData[currentQuestion].options[quizData[currentQuestion].correct],
            selectedAnswer: quizData[currentQuestion].options[selectedAnswer]
        });

        if (selectedAnswer === quizData[currentQuestion].correct) {
            score++;
        }
    }
}

// Evento para o botão "Próximo"
document.getElementById("next-btn").addEventListener("click", () => {
    checkAnswer();
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showScore();
        showAnswersSummary();
        document.getElementById("restart-btn").style.display = "block"; // Mostrar botão de reiniciar
    }
});

// Mostrar a pontuação final
function showScore() {
    document.getElementById("quiz-container").style.display = "none";
    const scoreContainer = document.getElementById("score");
    scoreContainer.style.display = "block";
    scoreContainer.innerHTML = `Você acertou ${ score} de ${quizData.length} perguntas.`;
}

// Mostrar o resumo das respostas
function showAnswersSummary() {
    const summaryContainer = document.getElementById("answers-summary");
    summaryContainer.style.display = "block";
    summaryContainer.innerHTML = "<h3>Gabarito</h3>";

    userAnswers.forEach((answer, index) => {
        const isCorrect = answer.correctAnswer === answer.selectedAnswer;
        summaryContainer.innerHTML += `
            <p><strong>Questão ${index + 1}:</strong> ${answer.question}</p>
            <p>Sua resposta: ${answer.selectedAnswer} ${isCorrect ? "✅" : "❌"}</p>
            <p>Resposta correta: ${answer.correctAnswer}</p>
            <hr>`;
    });
}

// Reiniciar o quiz
document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    document.getElementById("score").style.display = "none";
    document.getElementById("answers-summary").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("restart-btn").style.display = "none"; // Esconder botão de reiniciar
    loadQuestion();
});

// Carregar a primeira pergunta ao iniciar
loadQuestion();