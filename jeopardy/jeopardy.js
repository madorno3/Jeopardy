let container = document.getElementById("container");
let bottomTable = document.getElementById("otherTable");

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.classList.add("loader-hidden");
    loader.style.transitionDuration = "3s";

});

async function getCategoryIds() {
    let res = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/categories?count=100`);
    categories = res.data;
    let mappedCategories = categories.map(category => ({title: category.title, id:category.id}));
    return _.sampleSize(mappedCategories, 6);
    
}
getCategoryIds();

async function fetchAndCreateTopRow() {
    let categoryNameList = await getCategoryIds();
    let topTable = document.getElementById("myTable");
    const thead = document.createElement('thead');
    topTable.appendChild(thead);
    categoryNameList.forEach(category => {
        const th = document.createElement('th');
        th.textContent = category.title;
        th.classList.add("top_row_style");
        thead.appendChild(th);
    });
    let row1 = document.createElement("tr");
    let row2 = document.createElement("tr");
    let row3 = document.createElement("tr");
    let row4 = document.createElement("tr");
    let row5 = document.createElement("tr");

    bottomTable.appendChild(row1);
    bottomTable.appendChild(row2);
    bottomTable.appendChild(row3);
    bottomTable.appendChild(row4);
    bottomTable.appendChild(row5);
        
        for (let i = 0; i < categoryNameList.length; i++){
            let cat_nums = categoryNameList[i].id; 
            
            let res = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/category?id=${cat_nums}`);
            let questions = res.data;
            let answers = questions.clues;

            let q0 = questions.clues[0].question;
            let q1 = questions.clues[1].question;
            let q2 = questions.clues[2].question;
            let q3 = questions.clues[3].question;
            let q4 = questions.clues[4].question;
            let a0 = answers[0].answer;
            let a1 = answers[1].answer;
            let a2 = answers[2].answer;
            let a3 = answers[3].answer;
            let a4 = answers[4].answer;
            const cell1 = document.createElement("td");
            cell1.classList.add("body_style");
            cell1.innerText = "?";
            let clickCount1 = 0;
            let clickCount2 = 0;
            let clickCount3 = 0;
            let clickCount4 = 0;
            let clickCount5 = 0;

            cell1.addEventListener("click", function (){
                clickCount1++;
                cell1.innerText = q0;
                
                if(clickCount1 !== 1){
                    cell1.innerText = a0;
                    cell1.style.backgroundColor ='rgb(174, 0, 255)';
                } else {
                    cell1.innerText = q0;
                }
            });

            row1.appendChild(cell1);
            const cell2 = document.createElement("td");
            cell2.classList.add("body_style");
            cell2.innerText = "?";
            cell2.addEventListener("click", function(){
                
                clickCount2++;
                cell2.innerText = q1;
                
                if(clickCount2 !== 1){
                    cell2.innerText = a1;
                    cell2.style.backgroundColor ='rgb(174, 0, 255)';
                } else {
                    cell2.innerText = q1;
                }
            })
            row2.appendChild(cell2);
            const cell3 = document.createElement("td");
            cell3.classList.add("body_style");
            cell3.innerText = "?";
            cell3.addEventListener("click", function(){
                clickCount3++;
                cell3.innerText = q2;
                
                if(clickCount3 !== 1){
                    cell3.innerText = a2;
                    cell3.style.backgroundColor ='rgb(174, 0, 255)';
                } else {
                    cell3.innerText = q2;
                }
            })
            row3.appendChild(cell3);
            const cell4 = document.createElement("td");
            cell4.classList.add("body_style");
            cell4.innerText = "?";
            cell4.addEventListener("click", function(){
                clickCount4++;
                cell4.innerText = q3;
                
                if(clickCount4 !== 1){
                    cell4.innerText = a3;
                    cell4.style.backgroundColor ='rgb(174, 0, 255)';
                } else {
                    cell4.innerText = q3;
                }
            })
            row4.appendChild(cell4);
            const cell5 = document.createElement("td");
            cell5.classList.add("body_style");
            cell5.innerText = "?";
            cell5.addEventListener("click", function(){
                clickCount5++;
                cell5.innerText = q4;
                
                if(clickCount5 !== 1){
                    cell5.innerText = a4;
                    cell5.style.backgroundColor ='rgb(174, 0, 255)';
                } else {
                    cell5.innerText = q4;
                }
            })
            row5.appendChild(cell5);

        }
}   
fetchAndCreateTopRow(); 

function button(){
    let resetBtn = document.createElement("button");
    container.appendChild(resetBtn)
    resetBtn.classList.add("reset-btn");
    resetBtn.innerText = "Restart Game!";
    resetBtn.addEventListener("click", function(){
    console.log("swish swish bish!");

        let all_tds = document.querySelectorAll('td');
        all_tds.forEach(td => td.remove());
        let all_trs = document.querySelectorAll('tr');
        all_trs.forEach(tr => tr.remove());
        let all_ths =document.querySelectorAll('th');
        all_ths.forEach(th => th.remove());

        getCategoryIds();
        fetchAndCreateTopRow();
    });

};

setTimeout(button,2000);


