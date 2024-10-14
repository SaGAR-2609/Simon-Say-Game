let gameSeq = [];
let userSeq = [];
let highscore = [];
let btns = ["red", "yellow", "green", "blue"]
let level = 0;
let started = false;
let high = -1;

let h5 = document.querySelector("h5");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game is started.");
        started = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function levelUp(){
    userSeq = [];
    level++;
    high++;

    h5.innerHTML = `Level ${level} <br> Highscore:${highest(highscore, high)}`;

    let randInd = Math.floor(Math.random()*4);
    let randCol = btns[randInd];
    let randBtn = document.querySelector(`.${randCol}`);
    
    gameSeq.push(randCol);

    btnFlash(randBtn);
    
};

function btnPress(){
    btnFlash(this);
    let userCol = this.getAttribute("id");
    console.log(userCol);
    userSeq.push(userCol);
    check(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".main")
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
};

function check(a){

    if(userSeq[a] == gameSeq[a]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 500);
        }
    }
    else {
        highscore.push(level);
        h5.innerHTML = `Game Over!!! Your score was ${level}. Press any key to restart<br>Your Highscore is ${highest(highscore, high)}`;
        started = false;
        gameSeq = [];
        level = 0;
        userSeq = [];
        
        high = -1;
    }
}

function highest(arr, high){
    
    for(let i=0; i<arr.length; i++){
        if(arr[i]>high){
            high = arr[i];
        }
    }
    return high;
}