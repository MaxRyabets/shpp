const GOODS = [
    {
        category: 'furniture',
        name: 'Chair',
        amount: 1,
        price: 20
    },
    {
        category: 'supplies',
        name: 'Gel Pen',
        amount: 20,
        price: 2
    },
    {
        category: 'other',
        name: 'Trash Bin',
        amount: 1,
        price: 5
    },
    {
        category: 'furniture',
        name: 'Sofa',
        amount: 1,
        price: 50
    },
    {
        category: 'supplies',
        name: 'Notebook',
        amount: 3,
        price: 3
    },
    {
        category: 'other',
        name: 'Calendar 2019',
        amount: 1,
        price: 3
    }
];

const invoice = document.getElementById("invoice");
const totalPrice = document.getElementById("total-price");
let price = 0;
let tmpData = GOODS;
fillTableData();

function addDataToTable(countTagTr){
    let tr = document.createElement("tr");
    for(const key in GOODS[countTagTr]){
        let td = document.createElement("td");
        td.textContent = GOODS[countTagTr][key];
        tr.appendChild(td);
        if (key === 'price'){
            price +=  GOODS[countTagTr][key] * GOODS[countTagTr]['amount'] ;
        }
    }
    invoice.appendChild(tr);
}

function addTmpDataToTable(countTagTr){
    let tr = document.createElement("tr");
    for(const key in tmpData[countTagTr]){
        let td = document.createElement("td");
        td.textContent = tmpData[countTagTr][key];
        tr.appendChild(td);
        if (key === 'price'){
            price +=  tmpData[countTagTr][key] * tmpData[countTagTr]['amount'] ;
        }
    }
    invoice.appendChild(tr);
}

/*tbody tag data filling*/
function fillTableDataTbody() {
    if(tmpData.length !== 0){
        for (let countTagTr = 0; countTagTr < tmpData.length; countTagTr++) {
            addTmpDataToTable(countTagTr);
        }
    }else {
        for (let countTagTr = 0; countTagTr < GOODS.length; countTagTr++) {
            addDataToTable(countTagTr);
        }
    }
}

/*th tag data filling (price)*/
function fillTableDataPrice() {
    totalPrice.textContent = `${price}$`;
}

/*tbody, th tags data filling*/
function fillTableData() {
    fillTableDataTbody();
    fillTableDataPrice();
}

/*clear inside tags in tbody*/
function removeElements(){
    while (invoice.firstChild) {
        invoice.removeChild(invoice.firstChild);
    }
}

function changeArrow(checkSort) {
    if (checkSort.textContent === '▼') {
        checkSort.innerHTML = '▲';
        return true;
    } else {
        checkSort.innerHTML = '▼';
    }
    return false;
}

function sortCategory(checkSort){
    return GOODS.sort(function(a,b) {
        let firstCategory = a.category;
        let secondCategory = b.category;

        if(checkSort)
        {
            return firstCategory > secondCategory ? -1 : firstCategory < secondCategory ? 1 : 0;
        }
        return firstCategory < secondCategory ? -1 : firstCategory > secondCategory ? 1 : 0;
    });
}

function sortName(checkSort){
    let tmgGOODS = tmpData.length !== 0 ? tmpData : GOODS;
    return tmgGOODS.sort(function(a,b) {
        let firstName = a.name;
        let secondName = b.name;
        if(checkSort)
        {
            return firstName > secondName ? -1 : firstName < secondName ? 1 : 0;
        }
        return firstName < secondName ? -1 : firstName > secondName ? 1 : 0;
    });
}

function sortData(){
    let checkSortCategory = document.getElementById('sort_category');
    let checkSortName = document.getElementById('sort_name');
    checkSortCategory.addEventListener('click', function(event) {
        sortCategory(changeArrow(this) === true);
        removeElements();
        fillTableDataTbody();
    });
    checkSortName.addEventListener('click', function(event) {
        sortName(changeArrow(this) === true);
        removeElements();
        fillTableDataTbody();
    });

}

window.onload = function () {
    sortData();
};

function tmpFilter(value){
    tmpData = tmpData.filter(word => word.category === value);
    for (let i = 0; i < tmpData.length; i++) {
        addTmpDataToTable(i);
    }
}

/*Filter text according to tag <option>(<select>) changes*/
filter.onchange = function () {
    clearData();
    if (this.options[this.selectedIndex].text === 'Filter by category'){
        tmpData = [];
        fillTableDataTbody();
        search.value = "";
        tmpData = GOODS;
    }
    else if(tmpData.length !== 0){
        tmpFilter(this.value);
    }else{
        tmpData = GOODS;
        tmpFilter(this.value);
    }
    fillTableDataPrice();
};

function searchData(data, value){
    let dataOfSearch = [];
    for (let countTagTr = 0; countTagTr < data.length; countTagTr++) {
        //looking for data coinciding with the text you're looking for
        let tempWord = "";
        //looking for a text that matches in the fields
        for (let i = 0; i < data[countTagTr]['name'].length; i++) {
            tempWord += data[countTagTr]['name'][i].toLowerCase();
            /*if there is a match for the text*/
            if (value.toLowerCase() === tempWord) {
                dataOfSearch.push(data[countTagTr]);
            }
        }
    }

    if (dataOfSearch.length !== 0){
        tmpData = dataOfSearch;
        fillTableDataTbody();
        fillTableDataPrice();
    }

}

/*Looking for data by word fragments or words
* search - input id
* */

search.oninput = function () {
    clearData();
    if(tmpData.length !== 0 && this.value){
        searchData(tmpData, this.value);
    }
    else if (this.value !== "" && tmpData.length === 0) {
        searchData(GOODS, this.value);
    }else{
        tmpData = [];
        fillTableDataTbody();
    }
    fillTableDataPrice();
};

function clearData() {
    price = 0;
    removeElements();
}
