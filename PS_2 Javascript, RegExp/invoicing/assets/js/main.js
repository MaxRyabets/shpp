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
let filterGOODS = [];
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

function addFilterDataToTable(countTagTr){

    let tr = document.createElement("tr");
    for(const key in filterGOODS[countTagTr]){
        let td = document.createElement("td");
        td.textContent = filterGOODS[countTagTr][key];
        tr.appendChild(td);
        if (key === 'price'){
            price +=  filterGOODS[countTagTr][key] * filterGOODS[countTagTr]['amount'] ;
        }
    }
    invoice.appendChild(tr);
}

/*tbody tag data filling*/
function fillTableDataTbody() {
    if(filterGOODS.length !== 0){
        for (let countTagTr = 0; countTagTr < filterGOODS.length; countTagTr++) {
            addFilterDataToTable(countTagTr);
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
    let tmgGOODS = filterGOODS.length !== 0 ? filterGOODS : GOODS;
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

/*Filter text according to tag <option>(<select>) changes*/
filter.onchange = function () {
    removeElements();
    price = 0;
    filterGOODS = [];
    for (let countTagTr = 0; countTagTr < GOODS.length; countTagTr++) {
        //Expect that search on an immutable field category
        if (this.options[this.selectedIndex].text.toLowerCase() === GOODS[countTagTr]['category']){
            addDataToTable(countTagTr);
            filterGOODS.push(GOODS[countTagTr]);
        }
    }
    if(this.options[this.selectedIndex].text === 'Filter by category'){
        fillTableDataTbody();
    }
    fillTableDataPrice();
};

/*Looking for data by word fragments or words
* search - input id
* */
search.oninput = function () {
    price = 0;
    removeElements();
    for (let countTagTr = 0; countTagTr < GOODS.length; countTagTr++) {
        //if there is no text, we display all the data
        if (this.value !== "") {
            //looking for data coinciding with the text you're looking for
            for (const key in GOODS[countTagTr]) {
                let tempWord = "";
                //looking for a text that matches in the fields
                for (let i = 0; i < GOODS[countTagTr][key].length; i++) {
                    tempWord += GOODS[countTagTr][key][i].toLowerCase();
                    /*if there is a match for the text*/
                    if (this.value.toLowerCase() === tempWord) {
                        addDataToTable(countTagTr);
                        fillTableDataPrice();
                    }
                }
            }
        } else {
            addDataToTable(countTagTr);
        }
    }
};