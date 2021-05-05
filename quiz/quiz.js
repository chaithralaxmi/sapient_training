const resultEl = document.querySelector('.result');
const bodyEl = document.querySelector('.body');
const scoreEl = document.querySelector('.score');

/* 2. display questions with options */

const renderQstns = (item)=>{
    bodyEl.innerHTML=item.map(item =>{
        return `
        <div class='item' >
            
            <div class='questions'>
            <h1>Question ${item.id}</h1>
                <p>Q. ${item.question}</p>
                <div class='options'>
                    <ul>
                    <li><input type='radio' name='${item.id}'value='option1'> ${item.option1}</li>
                    <li><input type='radio' name='${item.id}'value='option2'> ${item.option2}</li>
                    <li><input type='radio' name='${item.id}'value='option3'> ${item.option3}</li>
                    <li><input type='radio' name='${item.id}'value='option4'> ${item.option4}</li>
                    </ul>
                </div>
            </div>
        </div>`
    }).join('');
};


/* 1. fetching questions */
const fetchQuestions = async() =>{
    const response = await fetch('https://6083c8329b2bed0017040391.mockapi.io/api/questions')
    const qstns = await response.json();
    renderQstns(qstns);
};

/*  fetch correct answers */
const fetchCrctAns = async(userAnswers) =>{
    const response = await fetch('https://6083c8329b2bed0017040391.mockapi.io/api/answers')
    const answers = await response.json();
    const correctAnswers= userAnswers.filter(item=>{
       const originalAnswers= answers.find(answer=>answer.id===item.name);
       if (originalAnswers){
           return item.value===originalAnswers.answer;
       }
       return false;
    });

 bodyEl.innerHTML=`
 <div class="finalRes">
    <h3>Your Quiz Completed</h3>
    <p>Result</p>
    <p>Correct answers: ${correctAnswers.length}</p>
    <p>Wrong answers: ${answers.length-correctAnswers.length}</p>
 </div>`;
 scoreEl.innerHTML='';
 
};



/* submit buttion */
const div =document.createElement('div');
const submitBtn = document.createElement('button');
const pEl = document.createElement('p');
submitBtn.innerHTML = "SUBMIT";
div.appendChild(submitBtn)
scoreEl.appendChild(div);


let usrAns = [];
const itemEl= document.querySelectorAll('.item')

/* event listener for submit button */

submitBtn.addEventListener('click',(e)=>{
    usrAns.length=0; //empty the array before next submission
   const selectedItems= document.querySelectorAll('input:checked');
   selectedItems.forEach(item =>{
       const ans = {
           name:item.getAttribute('name'),
           value:item.value
       };
       usrAns.push(ans);
   });
  
   fetchCrctAns(usrAns);
});


fetchQuestions()