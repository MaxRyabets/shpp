/*for sum number*/
const MINUTES_IN_HOUR = 3600;
const SECONDS_IN_MINUTES = 60;

/*for time*/
const NUMBER_COLONS = 2;

/*for size chessboard (col and row) */
const MAX_COL = 18;
const MAX_ROW = 18;

const MARGIN_ELEMENT_CHESSBOARD = 10;
const SIZE_ELEMENT_CHESSBOARD = 50;

/*count the sum of numbers between user entered*/
function sum() {
    if (document.getElementById("first_number").value !== '' ||
        document.getElementById("second_number").value !== '') {

        let fnum = +document.getElementById("first_number").value;
        let snum = +document.getElementById("second_number").value;

        if (!isNaN(fnum) && !isNaN(snum) && typeof fnum === "number" && typeof snum === "number") {

            if (fnum < snum) {
                let result = 0;
                //summarize only numbers that end in 2,3, and 7
                for (let i = fnum; i < snum; i++) {
                    if (i % 2 === 0 || i % 3 === 0 || i % 7 === 0) {
                        result += i;
                    }
                }
                document.getElementById("result_sum").innerHTML = result;
            } else {
                document.getElementById("result_sum").innerHTML = "First number > second number!";
            }
        } else {
            document.getElementById("result_sum").innerHTML = "Not a number";
        }
    }else{
        document.getElementById("result_sum").innerHTML = "First or second number is empty!";
    }
}

function isTimeFormat(timeToSeconds){
    let count = 0;
    for (let i = 0; i < timeToSeconds.length; i++) {
        if(timeToSeconds[i] === ':'){
            count++;
        }
    }
    return count === NUMBER_COLONS;
}

function parseTime(timeToSeconds) {
    let arrTime = timeToSeconds.split(':');
    for (let i = 0; i < arrTime.length; i++) {
        if (typeof +arrTime[i] !== "number" && isNaN(+arrTime[i])){
            break;
        }
        arrTime[i] = parseInt(arrTime[i]);
    }
    return arrTime;
}

function time() {
    if(document.getElementById("seconds").value !== '') {
        const seconds = +document.getElementById("seconds").value;

        if (!isNaN(seconds) && typeof seconds === "number") {
            let h = Math.round(seconds / MINUTES_IN_HOUR),
                m = Math.round(seconds % MINUTES_IN_HOUR / SECONDS_IN_MINUTES),
                s = Math.round(seconds % SECONDS_IN_MINUTES);
            //number of 10 - add 0 if format number equals 0..9
            document.getElementById("result_time").innerHTML =
                `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
        } else {
            document.getElementById("result_time").innerHTML = "Not a number";
        }
    }else if(document.getElementById("timeToSeconds").value !== ''){
        const timeToSeconds = document.getElementById("timeToSeconds").value;

        if(isTimeFormat(timeToSeconds)){
            const arrTime = parseTime(timeToSeconds);
            if(arrTime.length === 3) {
                //arrTime[0] is hours, arrTime[1] is minutes, arrTime[2] is seconds
                document.getElementById("result_time").innerHTML =
                    arrTime[0] * MINUTES_IN_HOUR + arrTime[1] * SECONDS_IN_MINUTES + arrTime[2];
            }
            else {
                document.getElementById("result_time").innerHTML = "format time is Not a Number!"
            }
        }else {
            document.getElementById("result_time").innerHTML = "Please enter a format time hh:mm:ss!";
        }
    }
}


function parseFirstDataTime(arrDataTime){
    let arrDate = arrDataTime[0].split('-');
    let arrTime = arrDataTime[1].split(':');
    return arrDate.concat(arrTime);
}

function calcDateTime(){

    if( document.getElementById("firstDate").value !== '' ||
        document.getElementById("secondDate").value !== ''){

        const firstDate = document.getElementById("firstDate").value;
        const secondDate = document.getElementById("secondDate").value;
        const rexExpDate = /[0-9]+[-]+[0-9]+[-]+[0-9T0-9]+[:[0-9]+/g;
        if(firstDate.match(rexExpDate) && secondDate.match(rexExpDate)) {
            let tempFirstDateTime = parseFirstDataTime(firstDate.split('T'));
            let tempSecondDateTime = parseFirstDataTime(secondDate.split('T'));
            const result = [];

            for (let i = 0; i < tempFirstDateTime.length; i++) {
                result.push(Math.abs(tempSecondDateTime[i] - tempFirstDateTime[i]));
            }

            document.getElementById("result_date-time").innerHTML =
                `${result[0]} year(s),  
            ${result[1]} month(s),
            ${result[2]} day(s),
            ${result[3]} hour(s),
            ${result[4]} minute(s),
            ${result[5]} second(s).`;
        } else {
            document.getElementById("result_date-time").innerHTML = "format time is Not Date";
        }
    }else {
        document.getElementById("result_date-time").innerHTML = "Please enter a format data!";
    }
}

function drawChessboard() {
    if(document.getElementById("col").value !== '' ||
        document.getElementById("row").value !== '') {
        let col = document.getElementById("col").value;
        let row = document.getElementById("row").value;
        const regExpNumber = /[0-9]+/g;
        if(col.match(regExpNumber) && row.match(regExpNumber)){
            col = +col;
            row = +row;
            if(col < MAX_COL && row < MAX_ROW) {
                /*countColumn * margin (10) + widthSpan (50) * countColumn, row too */
                const width = col * MARGIN_ELEMENT_CHESSBOARD + SIZE_ELEMENT_CHESSBOARD * col,
                    height = row * MARGIN_ELEMENT_CHESSBOARD + SIZE_ELEMENT_CHESSBOARD * row;
                let chessBoard = document.createElement("div");

                chessBoard.setAttribute("id", "chessBoard");
                chessBoard.style.cssText = `width: ${width}px;`;
                document.getElementById("row-chessboard").style.cssText = `width: ${width + 50}px;`;
                document.getElementById("result_chessboard").appendChild(chessBoard);

                for (let i = 0; i < row; i++) {
                    for (let j = 0; j < col; j++) {
                        let span;
                        if (i % 2 === j % 2) {
                            span = document.createElement("span");
                            span.style.cssText = 'display:inline-block; background:rgb(209, 255, 156); margin: 5px;';
                        } else if (j % 2 !== 0) {
                            span = document.createElement("span");
                            span.style.cssText = 'display:inline-block; background:#00BCD4; margin: 5px;';
                        } else {
                            span = document.createElement("span");
                            span.style.cssText = 'display:inline-block; background:#00BCD4; margin: 5px;';
                        }
                        document.getElementById("result_chessboard").appendChild(span);
                    }
                }
            } else{
                document.getElementById("result_chessboard").innerHTML = "Please enter checkerboard size < 18";
            }
        } else {
            document.getElementById("result_chessboard").innerHTML = "Please enter a number";
        }
    } else {
        document.getElementById("result_chessboard").innerHTML = "Please enter chessboard size!";
    }
}

/*break the data in which there is a comma*/
function findComma(regExpData) {
    const tempRegExpData = [];
    for (let i = 0; i < regExpData.length; i++) {
        tempRegExpData.push(regExpData[i].split(','));
    }
    return tempRegExpData;
}

/*convert an array of objects into an array and sort the data*/
function convertToArrayData(tempRegExpData) {
    let result = [];
    for (let i = 0; i < tempRegExpData.length; i++) {
        for (let j = 0; j < tempRegExpData[i].length; j++) {
            if (tempRegExpData[i][j] !== "") {
                result.push(tempRegExpData[i][j]);
            }
        }
    }
    result.sort();
    return result;
}

/*creating data tags <a>*/
function parseResultData(result){
    for (let i = 0; i < result.length; i++) {
        const parseIpLinks = result[i].replace(/(http|https):\/\//g, "");
        let a = document.createElement("a");
        a.style.cssText = 'display:block; background:white; margin: 5px; padding: 5px;';
        a.setAttribute("href", result[i]);
        a.textContent = parseIpLinks;
        document.getElementById("result_ipLinks").appendChild(a);
    }
}

/*Display tags <a>*/
function findIpLinks() {
    if(document.getElementById("ipLinks").value !== '') {
        const data = document.getElementById("ipLinks").value;
        const regExpData = data.match(/(http|https):\/\/(\.)?(([\w+.~@#$%^&*-\/])*[\w?])/g);
        let result = convertToArrayData(findComma(regExpData));
        parseResultData(result);
    } else {
        document.getElementById("ipLinks").innerHTML = "Please enter a links and a ip(s)";
    }
}

function findData(){
    if(document.getElementById("data-text").value !== '' ||
        document.getElementById("regExpText").value !== '') {
        const dataText = document.getElementById("data-text").value;
        const regExpText = document.getElementById("regExpText").value;
        let regExpData = new RegExp(regExpText, "g");
        document.getElementById("result_find-data").innerHTML = dataText.replace(regExpData,
            '<mark>$&</mark>');
    } else {
        document.getElementById("result_find-data").innerHTML = "Please enter data";
    }
}



