const questions=[
    {
        question:"which is largest animal in the world?",
        answer:[
            {text:"shark",correct:false},
            {text:"Blue Whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false},
        ]
    },
    {
        question:"which is Smallest Country in the world?",
        answer:[
            {text:"Vatican City",correct:true},
            {text:"Bhutan",correct:false},
            {text:"Nepal",correct:false},
            {text:"Sri Lanka",correct:false},
        ]
    },
    {
        question:"which is largest Desert in the world?",
        answer:[
            {text:"Kalahari",correct:false},
            {text:"Gobi",correct:false},
            {text:"Sahara",correct:false},
            {text:"Antarctica",correct:true},
        ]
    },
    {
        question:"which is Smallest Continent in the world?",
        answer:[
            {text:"Asia",correct:false},
            {text:"Australia",correct:true},
            {text:"Arctic",correct:false},
            {text:"Africa",correct:false},
        ]
    }
];

const questionelement=document.getElementById("question");
const answerbutton=document.getElementById("answer-button");
const nextbutton=document.getElementById("next-btn");

let currentquestionindex=0;
let score=0;
let answered = false;

function startquiz(){   
    currentquestionindex=0;
    score=0;
    answered = false;
    nextbutton.innerHTML="Next";
    showquestion();
}

function showquestion() {
    resetstate();
    let currentquestion=questions[currentquestionindex];
    let questionNo=currentquestionindex+1;
    questionelement.innerHTML=questionNo+"."+currentquestion.question;

    currentquestion.answer.forEach(answer => {
        const button =document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectanswer);
    });
}

function resetstate() {
    nextbutton.style.display="none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectanswer(e) {
    if (answered) return; // Prevent selecting multiple answers
    answered = true;

    const selectedbtn=e.target;
    const iscorrect=selectedbtn.dataset.correct==="true";
    if(iscorrect){
        selectedbtn.classList.add("correct");
        score++;
    } else {
        selectedbtn.classList.add("incorrect");
    }

    Array.from(answerbutton.children).forEach(button=>{
        if(button !== selectedbtn) {
            button.disabled=true;
        }
    });
    nextbutton.style.display="block";
}

function showscore() {
    resetstate();
    questionelement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML="play Again";
    nextbutton.style.display="block";
}

function handlenextbutton() {
    currentquestionindex++;
    if(currentquestionindex<questions.length){
        answered = false; // Reset answered flag for the next question
        showquestion();
    } else {
        showscore();
    }
}

nextbutton.addEventListener("click",()=>{
    if(currentquestionindex<questions.length){
        handlenextbutton();
    } else {
        startquiz();
    }
});

startquiz(); // Automatically start the quiz when the page loads
