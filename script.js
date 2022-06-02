const score = document.getElementById("right-answers");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
const scoreSection = document.getElementById("score-section");
const previousButton = document.getElementById("previous-btn");
const answerButtonsElement = document.getElementById("answer-buttons");
const questionContainerElement = document.getElementById("question-container");

var bar = document.getElementById("progressBarFull");
let shuffledQuestions, currentQuestionsIndex;
let rightAnswers;
let QuestionCounter;

startButton.addEventListener('click', startGame);

nextButton.addEventListener("click", () => {
    currentQuestionsIndex++;
    QuestionCounter++;
    FillBar();
    setNextQuestion();
});

previousButton.addEventListener('click', () => {
    currentQuestionsIndex--;
    QuestionCounter--;
    FillBar();
    setNextQuestion();
})


function startGame(){
    console.log('Started');
    barHolder = document.getElementById("progressBar")
    barHolder.classList.remove("hide");
    QuestionCounter = 0;
    rightAnswers = 0;
    FillBar();
    scoreSection.classList.add("hide");
    startButton.classList.add('hide');
    bar.classList.remove("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5); 
    currentQuestionsIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion()
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionsIndex]);
}

function showQuestion(question)
{
    questionElement.innerText = question.question

    question.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add("btn");

        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}

function resetState()
{
    clearStatusClass(document.body);
    nextButton.classList.add("hide");

    if (currentQuestionsIndex <= 0)
    {
        previousButton.classList.add("hide");
    }

    while (answerButtonsElement.firstChild)
    {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e)
{
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    var isClicked = false;

    console.log(isClicked);

    if(correct)
    {  
        rightAnswers++;
        console.log('Answer was counted')
        console.log(isClicked);
    }

    setStatusClass(document.body, correct, isClicked)

    Array.from(answerButtonsElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct, button.dataset.isClicked)
    })

    if(shuffledQuestions.length > currentQuestionsIndex + 1)
    {
        nextButton.classList.remove("hide");

        if (currentQuestionsIndex > 0)
        {
            previousButton.classList.remove("hide");
        }
    }
    else
    {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        showScore();
        QuestionCounter++;
        FillBar();
    }
    
}

function showScore(){
    scoreSection.classList.remove("hide");
    score.innerHTML = rightAnswers.toString();
}

function clearStatusClass(element){
    element.classList.remove("correct");
    element.classList.remove("wrong");
    element.classList.remove("false");
    element.classList.remove("true");
}

function setStatusClass(element, correct, isClicked)
{
    clearStatusClass(element);

    if(correct)
    {
        element.classList.add("correct");
    }
    else
    {
        element.classList.add("wrong");
    }

    if(isClicked == true)
    {
        element.classList.add("true");
        console.log('was clicked')
    }
    else
    {
        element.classList.add("false");
    }
}

function FillBar()
{
    bar.style.width = `${(QuestionCounter / questions.length) * 100}%`;
    bar.innerText = bar.style.width.toString();
}

const questions =[
    {
        question: "Welche Eigenschaft passt zu der Variable Const?",
        answer: [
           {text: "Kann nicht erneut zugewiesen werden", correct: true, isClicked: false},
           {text: "Kann erneut zugewiesen werden", correct: false, isClicked: false},
           {text: "Konstanten MÜSSEN NICHT sofort zugewiesen werden wenn sie deklariert werden", correct: false, isClicked: false},
           {text: "Ein Beispiel wie man konstanten declariert: Const x; x = 3", correct: false, isClicked: false},
        ]
    },

    {
        question: "Können Funktionen in JS Argumente übernehmen?",
        answer: [
           {text: "Ja", correct: true, isClicked: false},
           {text: "Nein", correct: false, isClicked: false},
        ]
    },

    {
        question: "Wie wird in JS aufgerundet?",
        answer: [
           {text: "Math.round(x)", correct: false, isClicked: false},
           {text: "Math.ceil(x)", correct: true, isClicked: false},
           {text: "Math.floor(x)", correct: false, isClicked: false},
           {text: "Math.roundUp(x)", correct: false, isClicked: false},
        ]
    },

    {
        question: "Auf welcher Ebene befindet sich JS?",
        answer: [
           {text: "High-Level", correct: true, isClicked: false},
           {text: "Low-level", correct: false, isClicked: false},
        ]
    },

    {
        question: "Was gibt dieser Befehl aus? : <p id=\"demo\"></p> ",
        answer: [
           {text: "Demo", correct: false, isClicked: false},
           {text: "Die Klasse Demo", correct: false, isClicked: false},
           {text: "Das was für Demo bereitgestellt wurde", correct: true, isClicked: false},
           {text: "id = \"demo\"", correct: false, isClicked: false},
        ]
    },

    {
        question: "Welches Framework benutzt JavaScript?",
        answer: [
           {text: "ASP.Net", correct: false, isClicked: false},
           {text: "Node", correct: true, isClicked: false},
           {text: "Laravel", correct: false, isClicked: false},
           {text: "Play", correct: false, isClicked: false},
        ]
    },

    {
        question: "Was ist der Unterschied zwischen var, let und const",
        answer: [
           {text: "Die Namen, sonst alles gleich!", correct: false, isClicked: false},
           {text: "var und let sind \"globale Variablen\"", correct: false, isClicked: false},
           {text: "let und const können deklariert werden ohne initialisiert zu werden", correct: false, isClicked: false},
           {text: "Var ist eine \"globale Valiable\", let und const nicht", correct: true, isClicked: false},
        ]
    },

    {
        question: "Was wird hier instanziert? : const questionElement = document.getElementById(\"question\")",
        answer: [
           {text: "Hier wird eine Konstante deklariert, die den Wert einer Klasse übernimmt", correct: false, isClicked: false},
           {text: "Hier wird eine Konstante deklariert, die auf die Vorgefertigten Fragen zugreift", correct: false, isClicked: false},
           {text: "Hier wird eine Konstante deklariert, die auf eine Id zugreift, die im JavaScript modifiziert wird", correct: true, isClicked: false},
           {text: "Hier wird eine Konstante deklariert, die Fragen in einem Container speichert", correct: false, isClicked: false},
        ]
    },

    {
        question: "welche ASSIGNMENT OPERATOREN existieren in JS?",
        answer: [
           {text: "==", correct: false, isClicked: false},
           {text: "<<<=", correct: false, isClicked: false},
           {text: "^=", correct: true, isClicked: false},
           {text: "!=", correct: false, isClicked: false},
        ]
    },

    {
        question: "Welche LOGISCHEN VERGLEICHS OPERATOREN gibt es im JS?",
        answer: [
           {text: "==", correct: true, isClicked: false},
           {text: "=", correct: false, isClicked: false},
           {text: "<<=", correct: false, isClicked: false},
           {text: "*=", correct: false, isClicked: false},
        ]
    }
]


































