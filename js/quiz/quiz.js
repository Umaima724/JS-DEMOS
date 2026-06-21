function loadQuestions() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(questionBank);
        }, 1000);
    });
}

let currentQuestion = 0;
let score = 0;

const quizDiv = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");

async function startQuiz() {
    console.log("startQuiz called");
    currentQuestion = 0;  // Reset state
    score = 0;
    nextBtn.style.display = "inline-block";
    
    const questions = await loadQuestions();
    console.log(questions);
    displayQuestion(questions);
}

function displayQuestion(questions) {
    const q = questions[currentQuestion];

    quizDiv.innerHTML = `
        <h3>${q.question}</h3>
        ${q.options.map(option => `
            <label>
                <input type="radio" name="answer" value="${option}">
                ${option}
            </label>
            <br>
        `).join("")}
    `;
}

// Move listener OUTSIDE startQuiz so it only attaches once
nextBtn.addEventListener("click", async () => {
    const questions = await loadQuestions(); // Or store questions in a variable
    const selected = document.querySelector('input[name="answer"]:checked');

    if (!selected) {
        alert("Please select an answer.");
        return;
    }

    if (selected.value === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion(questions);
    } else {
        quizDiv.innerHTML = `<h2>Your Score: ${score}/${questions.length}</h2>`;
        nextBtn.style.display = "none";
    }
});

startQuiz();