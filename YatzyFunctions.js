//test casper
let values = [
    {value: 0, hold: false}, 
    {value: 0, hold: false}, 
    {value: 0, hold: false}, 
    {value: 0, hold: false}, 
    {value: 0, hold: false}];

let diceHoldStatus = [0, 0, 0, 0, 0]

let frequencyArray = [0, 0, 0, 0, 0, 0, 0]

let results = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

let resultHoldStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

let throwCount = 0;



throwDice()

console.log(values)
console.log(frequencyArray)
console.log(results)
console.log(totalPoint())


function getValues(){
    return values;
}

function getThrowCount() {
        return throwCount;
}

function resetThrowCount() {
        throwCount = 0;
}

function totalPoint(){
    let sum = 0
    for (const indeks in results) {
        if(resultHoldStatus[indeks]) sum += results[indeks]
    }
    return sum
}

function resultChosen(resultToHoldIndex){
    diceHoldStatus = [0, 0, 0, 0, 0]
    frequencyArray = [0, 0, 0, 0, 0, 0]
    throwCount = 0;
    holdResult(resultToHoldIndex)
    totalPoint()
}

function throwDice(){
    for (let i = 0; i < 5; i++) {
        if (!diceHoldStatus[i]) {
            values[i] = Math.floor(Math.random() * 6 + 1);
        }
    }
    frequency()
    calculateResults()
    throwCount++;
}

function holdResult(resultToHoldIndex){
    resultHoldStatus[resultToHoldIndex] = 1
}

function calculateResults() {
    for (let i = 0; i < 6; i++) {
        if(!resultHoldStatus[i]){
            results[i] = (this.sameValuePoints(i + 1));
        }
    }
    if(!resultHoldStatus[6]) results[6] = (this.onePairPoints());
    if(!resultHoldStatus[7]) results[7] = (this.twoPairPoints());
    if(!resultHoldStatus[8]) results[8] = (this.threeSamePoints());
    if(!resultHoldStatus[9]) results[9] = (this.fourSamePoints());
    if(!resultHoldStatus[10]) results[10] = (this.fullHousePoints());
    if(!resultHoldStatus[11]) results[11] = (this.smallStraightPoints());
    if(!resultHoldStatus[12]) results[12] = (this.largeStraightPoints());
    if(!resultHoldStatus[13]) results[13] = (this.chancePoints());
    if(!resultHoldStatus[14]) results[14] = (this.yatzyPoints());
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