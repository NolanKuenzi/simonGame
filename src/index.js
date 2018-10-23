const cover = document.querySelector("#cover");
const colors = document.querySelectorAll(".colors");
let compArr = [];
let usrArr = [];
let soundsArr;

function load() {
    const border = document.getElementById("buttons1");
    border.style.borderColor = "black;";
    const startNotification = document.getElementById("loadDiv");
    startNotification.style.display = "block";
    setTimeout(() => startNotification.style.display = "none", 2000); 
    cover.style.display = "none";
    count.value = 1;
    count.style.backgroundColor = "black";
    stOn.style.backgroundColor= "black";
    startBtn.disabled = false;
    strict.disabled = false;
}

function start() {
    count.value = 1;
    usrArr = [];
    compArr = [];
    stOn.style.backgroundColor = "black";
    compTurn();
}

function on_Off()  {
    const btns1 = document.getElementById("buttons1");
    if (cover.style.display === "none") {
        cover.style.display = "block";
        disable();
        btns1.style.backgroundColor = "#8c8c8c";
        stOn.style.backgroundColor= "black";
        count.value = 1;
        soundsArr = [];

    } else {
        btns1.style.backgroundColor = "white";
        cover.style.display = "none";
        load();
    }
}

function strictOn() {
    if (stOn.style.backgroundColor === "black") {
        stOn.style.backgroundColor = "red";
       
    } else {
        stOn.style.backgroundColor = "black";    
    }
}

function staging() {
    startBtn.disabled = false;
    strict.disabled = false;
    for (let j = 0; j < colors.length; j++) {
        colors[j].addEventListener("click", game, false);
    }    
}

function playerArr() {
    usrArr = [];
}

function disable() {
    for (let j = 0; j < colors.length; j++) {
        colors[j].removeEventListener("click", game, false);
    } 
    startBtn.disabled = true;
    strict.disabled = true;
}

function gameCheck() {
    disable();
    if (usrArr[usrArr.length-1] !== compArr[usrArr.length-1]) {
        falseAns();
    
    } else if (usrArr.length === compArr.length) {
        count.value++;
        compTurn(); 
    
    } else {
        staging();
    }

}

function game(clickE) {  
    if (clickE.target.id === "green") {
        const greenAudio = new Audio("./simonSounds/simonSound1.mp3");
        usrArr.push(clickE.target.id);
        green.style.backgroundColor = "#00FF00";
        setTimeout(() => green.style.backgroundColor = "green", 1000);
        greenAudio.play();
        gameCheck();

    } else if (clickE.target.id === "red") {
        const redAudio = new Audio("./simonSounds/simonSound2.mp3");
        usrArr.push(clickE.target.id);
        red.style.backgroundColor = "#ff0000";
        setTimeout(() => red.style.backgroundColor = "#b20000", 1000);
        redAudio.play();
        gameCheck();

    } else if (clickE.target.id === "yellow") {
        const yellowAudio = new Audio("./simonSounds/simonSound3.mp3");
        usrArr.push(clickE.target.id);
        yellow.style.backgroundColor = "#ffe766";
        setTimeout(() => yellow.style.backgroundColor = "#e5c100", 1000);
        yellowAudio.play();
        gameCheck();

    } else if (clickE.target.id === "blue") {
        const blueAudio = new Audio("./simonSounds/simonSound4.mp3");
        usrArr.push(clickE.target.id);
        blue.style.backgroundColor = "#6666ff";
        setTimeout(() => blue.style.backgroundColor = "blue", 1000);
        blueAudio.play();
        gameCheck();
    }
}

function falseAns() {
    const buzz = new Audio("./simonSounds/simonAlarm.mp3");
    let safariError = document.getElementById("safariErrors");
    
    buzz.onerror = function() {
        if (stOn.style.backgroundColor === "red") {
            safariError.style.display = "block";
            safariError.innerHTML = "Wrong Answer. The game will now restart.";
            setTimeout(() => safariError.style.display = "none", 1000);
        } else {
            safariError.style.display = "block";
            safariError.innerHTML = "Wrong Answer. Please try again!";
            setTimeout(() => safariError.style.display = "none", 1000);
        }
    };

    if (stOn.style.backgroundColor === "red") {
        buzz.play();
        setTimeout(() => start(), 2000);
    } else {
        buzz.play();
        soundsArr = compArr.slice(0);
        setTimeout(() => playSounds(), 1000);
    } 
}

function compTurn() {
    disable();
    if (count.value > 19) { 
        return setTimeout(() => victory(), 2000);
    } 
    const rndColors = ["green", "red", "yellow", "blue"];
    const randColor = Math.floor(Math.random() * 4);
    compArr.push(rndColors[randColor]);
    soundsArr = compArr.slice(0);
    playSounds();
}

function playSounds() {
    if (soundsArr.length === 0) {
        playerArr();
        return setTimeout(() => staging(), 1500);
    }
    
    if (soundsArr[0] === "green") {
        const greenAudio = new Audio("./simonSounds/simonSound1.mp3");
        setTimeout(function() {
            if (cover.style.display !== "none") {
                return;
            }
            green.style.backgroundColor = "#00FF00";
            setTimeout(() => green.style.backgroundColor = "green", 1000);
            greenAudio.play();
            soundsArr.splice(0, 1);
            playSounds();        
        }, 2000);

    } else if (soundsArr[0] === "red") {
        const redAudio = new Audio("./simonSounds/simonSound2.mp3");
        setTimeout(function() {
            if (cover.style.display !== "none") {
                return;
            }
            red.style.backgroundColor = "#ff0000";
            setTimeout(() => red.style.backgroundColor = "#b20000", 1000);
            redAudio.play();
            soundsArr.splice(0, 1);
            playSounds();    
        }, 2000);
    
    } else if (soundsArr[0] === "yellow") {
        const yellowAudio = new Audio("./simonSounds/simonSound3.mp3");
        setTimeout(function() {
            if (cover.style.display !== "none") {
                return;
            }
            yellow.style.backgroundColor = "#ffe766";
            setTimeout(() => yellow.style.backgroundColor = "#e5c100", 1000);
            yellowAudio.play();
            soundsArr.splice(0, 1);
            playSounds();    
        }, 2000);
    
    } else if (soundsArr[0] === "blue") {
        const blueAudio = new Audio("./simonSounds/simonSound4.mp3");
        setTimeout(function() {
            if (cover.style.display !== "none") {
                return;
            }
            blue.style.backgroundColor = "#6666ff";
            setTimeout(() => blue.style.backgroundColor = "blue", 1000);
            blueAudio.play();
            soundsArr.splice(0, 1);
            playSounds();    
        }, 2000);

    } 
}

function victory() {
    alert("Congratulations! You Win! The game will now restart!");
    start();
}






