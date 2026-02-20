//test casper
//test david
let values = [
    {value: 0, hold: false}, 
    {value: 0, hold: false}, 
    {value: 0, hold: false}, 
    {value: 0, hold: false}, 
    {value: 0, hold: false}];

let diceHoldStatus = [0, 0, 0, 0, 0]

let frequencyArray = [0, 0, 0, 0, 0, 0, 0]

let throwCount = 0;

let results = document.querySelectorAll("input")

let diceIMG = document.querySelectorAll("img")

let THROWDATDICE = document.getElementById("Roll")

let turnLabel = document.getElementById("Turn")

// The Die
THROWDATDICE.onclick = () => throwDice()

for(let i = 0; i < 15; i++){
    results[i].onclick = resultChosen
    results[i].dataset.valgt = "nej"
}

for(let i = 0; i < results.length; i++){
    results[i].value = "0"
}

console.log(values)
console.log(frequencyArray)
console.log(results)


function getValues(){
    return values;
}

function getThrowCount() {
        return throwCount;
}

function resetThrowCount() {
        throwCount = 0;
}

function resultChosen(event){
    diceHoldStatus = [0, 0, 0, 0, 0]
    throwCount = 0;
    event.target.dataset.valgt = "ja"
    event.target.onclick = () => {}
    event.target.setAttribute("class", "chosen")
    
    turnLabel.innerText = "Turn " + throwCount
    for(let i = 0; i < 15; i++){
        if(results[i].dataset.valgt === "nej") {
            results[i].setAttribute("disabled", true)
            results[i].value = "0"
        }
    }
    sum()
    total()
    THROWDATDICE.removeAttribute("disabled", true)
}


function throwDice(){
    THROWDATDICE.setAttribute("disabled", true)

    let diceThrowValue = 0
    for (let i = 0; i < 5; i++) {
        if (!diceHoldStatus[i]) {
            diceThrowValue =  Math.floor(Math.random() * 6 + 1)
            values[i] = diceThrowValue
            diceIMG[i].src = "img/" + diceThrowValue + ".svg"
        }
    }

    frequency()
    calculateResults()

    frequencyArray = [0, 0, 0, 0, 0, 0, 0]
    throwCount++;
    turnLabel.innerText = "Turn " + throwCount

    if(throwCount == 1){
        for(let i = 0; i < 15; i++){
            if(results[i].dataset.valgt == "nej") results[i].removeAttribute("disabled", true)
        }
    } 
    if(throwCount != 3){
        THROWDATDICE.removeAttribute("disabled", true)
    }
}

function sum(){
    let summering = 0
    for (let i = 0; i < 6; i++) {
        if(results[i].dataset.valgt == "ja") summering += Number(results[i].value)
    }
    results[15].value = summering
    results[16].value = (summering >= 63) ? "50" : "0"
}

function total(){
    let summering = 0
    for (let i = 6; i <= 16; i++) {
        if(results[i].dataset.valgt == "ja"){
            summering += Number(results[i].value)
        }
    }
    results[17].value = summering
}

function calculateResults() {
    for (let i = 0; i < 6; i++) {
        if(results[i].dataset.valgt === "nej"){
            results[i].value = (this.sameValuePoints(i + 1));
        }
    }
    if(results[6].dataset.valgt === "nej") results[6].value = (this.onePairPoints());
    if(results[7].dataset.valgt === "nej") results[7].value = (this.twoPairPoints());
    if(results[8].dataset.valgt === "nej") results[8].value = (this.threeSamePoints());
    if(results[9].dataset.valgt === "nej") results[9].value = (this.fourSamePoints());
    if(results[10].dataset.valgt === "nej") results[10].value = (this.fullHousePoints());
    if(results[11].dataset.valgt === "nej") results[11].value = (this.smallStraightPoints());
    if(results[12].dataset.valgt === "nej") results[12].value = (this.largeStraightPoints());
    if(results[13].dataset.valgt === "nej") results[13].value = (this.chancePoints());
    if(results[14].dataset.valgt === "nej") results[14].value = (this.yatzyPoints());
}

function frequency() {
    for (let i = 0; i < values.length; i++) {
        frequencyArray[values[i]]++;
    }
}

function sameValuePoints(value) {
    return frequencyArray[value] * value;
}

function onePairPoints() {
    for (let i = 6; i > 0; i--) {
        if (frequencyArray[i] >= 2) {
            return i * 2;
        }
    }
    return 0;
}


function twoPairPoints() {
    for (let i = 6; i > 1; i--) {
        if (frequencyArray[i] >= 2) {
            for (let j = i - 1; j > 0; j--) {
                if (frequencyArray[j] >= 2) {
                    return i * 2 + j * 2;
                }
            }
        }
    }
    return 0;
}


function threeSamePoints() {
    for (let i = 6; i > 0; i--) {
         if (frequencyArray[i] >= 3) {
               return i * 3;
         }
    }
     return 0;
}


function fourSamePoints() {
    for (let i = 6; i > 0; i--) {
        if (frequencyArray[i] >= 4) {
            return i * 4;
        }
    }
    return 0;
}

function fullHousePoints() {
    for (let i = 6; i > 0; i--) {
        if (frequencyArray[i] == 2) {
            for (let j = 6; j > 0; j--) {
                if (frequencyArray[j] == 3) {
                    return i * 2 + j * 3;
                }
            }
        }
    }
    return 0;
}

function smallStraightPoints() {
    for (let i = 1; i < 6; i++) {
        if (frequencyArray[i] != 1) {
            return 0;
        }
    }
    return 15;
}

function largeStraightPoints() {
    for (let i = 2; i < 7; i++) {
        if (frequencyArray[i] != 1) {
                return 0;
        }
    }
    return 20;
}


function chancePoints(){
    let chance = 0;
    for(let i = 0; i < values.length; i++){
        chance += values[i];
    }
    return chance;
}


function yatzyPoints() {
    for (let i = 1; i < 7; i++) {
        if (frequencyArray[i] == 5) {
            return 50;
        }
    }
    return 0;
}