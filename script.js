// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// ✅ Your code starts here
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Restore saved answers from localStorage
let userAnswers = JSON.parse(localStorage.getItem("answers")) || [];

// Render quiz questions
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionDiv = document.createElement("div");

    const qText = document.createElement("p");
    qText.textContent = question.question;
    questionDiv.appendChild(qText);

    // Render choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const label = document.createElement("label");
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;

      // Restore saved answers
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // Save answer when user clicks
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        localStorage.setItem("answers", JSON.stringify(userAnswers));
      });

      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionDiv);
  }
}

// Calculate and show score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
}

submitBtn.addEventListener("click", calculateScore);

// Initial render
renderQuestions();

// Restore score if exists
if (localStorage.getItem("score")) {
  scoreElement.textContent = `Your score is ${localStorage.getItem("score")} out of ${questions.length}.`;
}