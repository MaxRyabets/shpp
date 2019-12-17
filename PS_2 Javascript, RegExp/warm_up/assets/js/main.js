/*for sum number*/
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTES = 60;

/*for date time*/
const MONTHS_IN_YEARS = 12;
const HOURS_IN_DAY = 24;
const DAYS_IN_MONTH = 30;
const MINUTES_IN_HOUR = 60;

/*for size chessboard (col and row) */
const WIDTH_ROWS = 600;

const MARGIN_ELEMENT_CHESSBOARD = 10;

/*count the sum of numbers between user entered*/
document.getElementById("sum").addEventListener('click', () => {
    if (!document.getElementById("first_number").value ||
        !document.getElementById("second_number").value) {
        document.getElementById("result_sum").innerHTML = "First or second number is empty!";
        return;
    }
    let firstNum = +document.getElementById("first_number").value;
    let secondNum = +document.getElementById("second_number").value;
    if (Number.isNaN(firstNum) && Number.isNaN(secondNum)) {
        document.getElementById("result_sum").innerHTML = "Not a number";
        return;
    }
    //in case the first number is greater than the second
    if (firstNum > secondNum) {
        firstNum = [secondNum, secondNum = firstNum][0];
    }
    let result = 0;
    //adding up only numbers that end in 2,3, and 7
    for (let i = firstNum; i <= secondNum; i++) {
        if (i.toString().match(/([2]|[3]|[7])+$/g)) result += i;
    }
    document.getElementById("result_sum").innerHTML = result;

});

function isTimeFormat(timeToSeconds){
    return timeToSeconds.match(/[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}/g);
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

document.getElementById("time").addEventListener('click', () => {
    if(document.getElementById("seconds").value !== "") {
        const seconds = +document.getElementById("seconds").value;
        if (Number.isNaN(seconds)) {
            document.getElementById("result_time").innerHTML = "Not a number";
            return;
        }

        let h = Math.ceil(seconds / SECONDS_IN_HOUR),
            m = Math.ceil(seconds % SECONDS_IN_HOUR / SECONDS_IN_MINUTES),
            s = Math.ceil(seconds % SECONDS_IN_MINUTES);
        //number of 10 - add 0 if format number equals 0..9
        document.getElementById("result_time").innerHTML =
            `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;

    }
    if(document.getElementById("timeToSeconds").value !== ""){
        const timeToSeconds = document.getElementById("timeToSeconds").value;
        if(!isTimeFormat(timeToSeconds)){
            document.getElementById("result_time_seconds").innerHTML = "format time is Not a Number!";
            return;
        }
        const arrTime = parseTime(timeToSeconds);
        if(arrTime.length !== 3) {
            document.getElementById("result_time_seconds").innerHTML = "Please enter a format time hh:mm:ss!";
            return;
        }
        //arrTime[0] is hours, arrTime[1] is minutes, arrTime[2] is seconds
        document.getElementById("result_time_seconds").innerHTML =
            arrTime[0] * MINUTES_IN_HOUR + arrTime[1] * SECONDS_IN_MINUTES + arrTime[2];
    }else{
        document.getElementById("result_time").innerHTML = "Please enter a seconds or a time";
    }
});
document.getElementById("calcDate").addEventListener('click', () =>{
    if( !document.getElementById("firstDate").value ||
        !document.getElementById("secondDate").value ){
        document.getElementById("result_date-time").innerHTML = "Please enter a format data!";
        return;
    }

    const firstDate = document.getElementById("firstDate").value;
    const secondDate = document.getElementById("secondDate").value;
    const rexExpDate = /[0-9]+[-]+[0-9]+[-]+[0-9T0-9]+[:[0-9]+/g;

    if(!firstDate.match(rexExpDate) && !secondDate.match(rexExpDate)) {
        document.getElementById("result_date-time").innerHTML = "format time is Not Date";
        return;
    }
    let startDate = new Date(firstDate);
    let endDate = new Date(secondDate);
    if (startDate > endDate){
        [startDate, endDate] = [endDate, startDate];
    }
    let days = endDate.getDate() - startDate.getDate();
    let minutes = endDate.getMinutes() - startDate.getMinutes();
    let hours = endDate.getHours() - startDate.getHours();
    let month = endDate.getMonth() - startDate.getMonth();
    let years = endDate.getFullYear() - startDate.getFullYear();
    let seconds = endDate.getSeconds() - startDate.getSeconds();
    console.log(Math.abs(month));
    let diff = {
        years: month < 0 ? years - 1 : years,
        months: days < 0 ? Math.abs(MONTHS_IN_YEARS - month) - 1 : Math.abs(month),
        days:  days === 0 ? days : month === 0  && years === 0 ? days : DAYS_IN_MONTH - Math.abs(days),
        hours: minutes < 0 ?  month === 0  && years === 0 && days === 0 ?
            hours : HOURS_IN_DAY - Math.abs(hours) - 1 : hours,
        minutes: days === 0 && month === 0 && hours === 0 ? minutes : MINUTES_IN_HOUR - Math.abs(minutes),
        seconds: seconds
    };
    document.getElementById("result_date-time").innerHTML =
        `${diff.years} year(s),  
        ${diff.months} month(s),
        ${diff.days} day(s),
        ${diff.hours} hour(s),
        ${diff.minutes} minute(s),
        ${diff.seconds} second(s).`;

});

document.getElementById("drawChessboard").addEventListener('click', () =>{
    if(!document.getElementById("col").value  ||
        !document.getElementById("row").value) {
        document.getElementById("result_chessboard").innerHTML = "Please enter chessboard size!";
        return;
    }
    let col = document.getElementById("col").value;
    let row = document.getElementById("row").value;
    const regExpNumber = /[0-9]+/g;
    if(!col.match(regExpNumber) && !row.match(regExpNumber)){
        document.getElementById("result_chessboard").innerHTML = "Please enter a number";
        return;
    }
    col = +col;
    row = +row;
    /*countColumn * margin (10) + widthSpan (50) * countColumn, row too */
    const width = col * MARGIN_ELEMENT_CHESSBOARD + Math.floor(WIDTH_ROWS / col) * col;
    let chessBoard = document.createElement("div");
    chessBoard.setAttribute("id", "chessBoard");
    chessBoard.style.cssText = `width: ${width}px;`;
    document.getElementById("result_chessboard").style.cssText = `width: ${width}px;`;
    width > WIDTH_ROWS ?
        document.getElementById("row-chessboard").style.cssText =
            `width: ${WIDTH_ROWS + width / 2}px;` : `width: ${WIDTH_ROWS}px;`;
    document.getElementById("result_chessboard").appendChild(chessBoard);
    let sizeRow = Math.floor(WIDTH_ROWS / col);
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            let span;
            span = document.createElement("span");
            if (i % 2 === j % 2) {
                span.style.cssText =
                    `width: ${sizeRow}px; height: ${sizeRow}px; display:inline-block; background:rgb(209, 255, 156);`;
            } else if (j % 2 !== 0) {
                span.style.cssText =
                    `width: ${sizeRow}px; height: ${sizeRow}px; display:inline-block; background:#00BCD4;`;
            } else {
                span.style.cssText =
                    `width: ${sizeRow}px; height: ${sizeRow}px; display:inline-block; background:#00BCD4;`;
            }
            document.getElementById("result_chessboard").appendChild(span);
        }
    }

});
document.getElementById("col").oninput = function () {
    document.getElementById("result_chessboard").innerHTML = "";
};
document.getElementById("row").oninput = function () {
    document.getElementById("result_chessboard").innerHTML = "";
};

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
document.getElementById("findIpLinks").addEventListener('click', () =>{
    if(document.getElementById("ipLinks").value !== "") {
        document.getElementById("result_ipLinks").textContent = "";
        const data = document.getElementById("ipLinks").value;
        const regExpData = data.match(/(http|https):\/\/(\[)?(\.)?(([\w+.~@#:$%^?&*-\/\]])+[^\w\d\r?\n\s])/g);
        let result = convertToArrayData(findComma(regExpData));
        parseResultData(result);
    } else {
        document.getElementById("ipLinks").innerHTML = "Please enter a links and a ip(s)";
    }
});

document.getElementById("findData").addEventListener('click', () =>{
    if(document.getElementById("data-text").value !== "" ||
        document.getElementById("regExpText").value !== "") {
        const dataText = document.getElementById("data-text").value;
        const regExpText = document.getElementById("regExpText").value;
        let regExpData = new RegExp(regExpText, "g");
        document.getElementById("result_find-data").innerHTML = dataText.replace(regExpData,
            '<mark>$&</mark>');
    } else {
        document.getElementById("result_find-data").innerHTML = "Please enter data";
    }
});




