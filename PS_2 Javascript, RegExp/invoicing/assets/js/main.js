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
fillTableData();

function addDataToTable(countTagTr){
    let tr = document.createElement("tr");
    for(const key in GOODS[countTagTr]){
        let td = document.createElement("td");
        td.textContent = GOODS[countTagTr][key];
        tr.appendChild(td);
        if (key === 'price'){
            price +=  GOODS[countTagTr][key];
        }
    }
    invoice.appendChild(tr);
}


/*tbody tag data filling*/
function fillTableDataTbody() {
    for (let countTagTr = 0; countTagTr < GOODS.length; countTagTr++) {
        addDataToTable(countTagTr);
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
    return GOODS.sort(function(a,b) {
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
        sortCategory(changeArrow(checkSortCategory) === true);
        removeElements();
        fillTableDataTbody();
    });
    checkSortName.addEventListener('click', function(event) {
        sortName(changeArrow(checkSortName) === true);
        removeElements();
        fillTableDataTbody();
    });

}

window.onload = function () {
    sortData();
};

const filter = document.getElementById("filter");

filter.onchange = function () {
    removeElements();
    price = 0;
    for (let countTagTr = 0; countTagTr < GOODS.length; countTagTr++) {
        if (filter.options[filter.selectedIndex].text.toLowerCase() === GOODS[countTagTr]['category']){
            addDataToTable(countTagTr);
        }
    }
    if(filter.options[filter.selectedIndex].text === 'Filter by category'){
        fillTableDataTbody();
    }
    fillTableDataPrice();
};