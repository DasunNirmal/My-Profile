import ItemModel from "../model/ItemModel.js";
import {items} from "../db/db.js";
export {loadItemTable}
var recordIndexItems;

$('#nav-items-section').on('click',() => {

    const home = $('.current-page-button');
    const orders = $('.Orders');
    const customers = $('.Customers');
    const items = $('.Items');

    // Hide/show relevant sections
    $('#home-section').hide();
    $('#orders-section').hide();
    $('#customers-section').hide();
    $('#items-section').show();


    // Define a function for styling buttons
    function styleButton(button) {
        button.css({
            background: 'none',
            color: '#B05200',
            padding: '18px 28px',
            border: '30px',
            text: 'none',
            font: '700',
            cursor: 'pointer'
        });
    }

    /*Applying styles to buttons*/
    styleButton(home);
    styleButton(orders);
    styleButton(customers);

    /*Define a function for hover effect*/
    function applyHoverEffect(button) {
        button.hover(function () {
            $(this).css({
                background: '#B05200',
                color: '#FEE5D4'
            });
        }, function () {
            $(this).css({
                background: 'none',
                color: '#B05200',
                padding: '18px 28px',
                border: '30px',
                text: 'none',
                font: '700'
            });
        });
    }

    /*Applying hover effect to buttons*/
    applyHoverEffect(home);
    applyHoverEffect(orders);
    applyHoverEffect(customers);

    /*this hover makes sure that home btn style stays same as the up hover btn other wise the up hover will override
    the css style in the orders page btn.This is because all the css is applied to one file (SPA)*/
    $(items).hover(function (){
        $(this).css({
            background: '#B05200',
            color: '#FEE5D4'
        });
    });
});

var ValidItemID = $('#items-content-card-left>#txtItemID');
var ValidItemName = $('#items-content-card-left>#txtItemName');
var ValidPrice = $('#items-content-card-left>#txtPrice');
var ValidQty = $('#items-content-card-left>#txtQuantity');
var isValidItemName = new RegExp("\\b[A-Z][a-z]*( [A-Z][a-z]*)*\\b");
var isValidPriceAndQty = new RegExp("^[0-9]+\\.?[0-9]*$");

$(ValidItemID).on("input", function () {
    $(ValidItemID).css({
        border: "2px solid #B05200"
    });
});

$(ValidItemName).on("input", function () {
    $(ValidItemName).css({
        border: "2px solid #B05200"
    });
});

$(ValidPrice).on("input", function () {
    $(ValidPrice).css({
        border: "2px solid #B05200"
    });
});

$(ValidQty).on("input", function () {
    $(ValidQty).css({
        border: "2px solid #B05200"
    });
});

/**Add, Update, Delete, Clear All**/

function clearAll() {
    $('#txtItemID').val("");
    $('#txtItemName').val("");
    $('#txtPrice').val("");
    $('#txtQuantity').val("");
}

function emptyPlaceHolder() {
    $(ValidItemID).attr("placeholder", "");
    $(ValidItemName).attr("placeholder", "");
    $(ValidPrice).attr("placeholder", "");
    $(ValidQty).attr("placeholder", "");
}

function defaultBorderColor() {
    $(ValidItemID).css({
        border: "2px solid #B05200"
    });
    $(ValidItemName).css({
        border: "2px solid #B05200"
    });
    $(ValidPrice).css({
        border: "2px solid #B05200"
    });
    $(ValidQty).css({
        border: "2px solid #B05200"
    });
}

function validItem() {
    var itemID = $('#txtItemID').val();
    var itemName = $('#txtItemName').val();
    var itemPrice = $('#txtPrice').val();
    var itemQty = $('#txtQuantity').val();


    if (itemID === "" || !isValidItemName.test(itemName) || !isValidPriceAndQty.test(itemPrice) || !isValidPriceAndQty.test(itemQty)) {

        $(ValidItemID).css({
            border: "3px solid red"
        });
        $(ValidItemName).css({
            border: "3px solid red"
        });
        $(ValidPrice).css({
            border: "3px solid red"
        });
        $(ValidQty).css({
            border: "3px solid red"
        });

        $(ValidItemID).attr("placeholder", "ID Empty");
        $(ValidItemName).attr("placeholder", "Wrong Input Try Again");
        $(ValidPrice).attr("placeholder", "Wrong Input");
        $(ValidQty).attr("placeholder", "Wrong Input Try Again");

        $(ValidItemID).addClass('red');
        $(ValidItemName).addClass('red');
        $(ValidPrice).addClass('red');
        $(ValidQty).addClass('red');
        return true;
    } else {
        defaultBorderColor();
        emptyPlaceHolder();
    }
}

function totalItems() {
    var total = items.length;
    $('#count-items').text(total);
}

$('#btnClearAll-items').on('click',() => {
    clearAll();
});

function loadItemTable() {
    $("#items-table-tb").empty();

    items.map((item,index) => {
        var itemRecord = `<tr>
                        <td class="i-id">${item.id}</td>
                        <td class="i-name">${item.name}</td>
                        <td class="i-price">${item.price}</td>
                        <td class="i-qty">${item.qty}</td>
                    </tr>`
        $('#items-table-tb').append(itemRecord);
    });
}

$('#items-table-tb').on('click','tr',function () {
    recordIndexItems = $(this).index();

    var id = $(this).find(".i-id").text();
    var name = $(this).find(".i-name").text();
    var price = $(this).find(".i-price").text();
    var qty = $(this).find(".i-qty").text();

    $('#txtItemID').val(id);
    $('#txtItemName').val(name);
    $('#txtPrice').val(price);
    $('#txtQuantity').val(qty);
});

$('#addItems').on('click',() => {
    var itemID = $('#txtItemID').val();
    var itemName = $('#txtItemName').val();
    var itemPrice = $('#txtPrice').val();
    var itemQty = $('#txtQuantity').val();

    if (itemID === "" || !isValidItemName.test(itemName) || !isValidPriceAndQty.test(itemPrice) || !isValidPriceAndQty.test(itemQty)) {
        validItem();
        return false;
    }

    let itemModel = new ItemModel(itemID,itemName,itemPrice,itemQty);
    items.push(itemModel);
    emptyPlaceHolder();
    defaultBorderColor();
    loadItemTable();
    clearAll();
    totalItems();
});

$('#btnDelete-items').on('click',() => {

    var itemID = $('#txtItemID').val();
    var itemName = $('#txtItemName').val();
    var itemPrice = $('#txtPrice').val();
    var itemQty = $('#txtQuantity').val();

    if (itemID === "" || !isValidItemName.test(itemName) || !isValidPriceAndQty.test(itemPrice) || !isValidPriceAndQty.test(itemQty)) {
        validItem();
        return;
    }

    items.splice(recordIndexItems,1);
    emptyPlaceHolder();
    defaultBorderColor();
    loadItemTable();
    clearAll();
    totalItems();
});

$('#btnUpdate-items').on('click',() => {
    var itemID = $('#txtItemID').val();
    var itemName = $('#txtItemName').val();
    var itemPrice = $('#txtPrice').val();
    var itemQty = $('#txtQuantity').val();

    if (itemID === "" || !isValidItemName.test(itemName) || !isValidPriceAndQty.test(itemPrice) || !isValidPriceAndQty.test(itemQty)) {
        validItem();
        return;
    }

    var iOb = items[recordIndexItems];
    iOb.id = itemID;
    iOb.name = itemName;
    iOb.price = itemPrice;
    iOb.qty = itemQty;

    emptyPlaceHolder();
    defaultBorderColor();
    loadItemTable();
    clearAll();
    totalItems();
});

function searchItems(query) {
    const searchTerm = query.toLowerCase();

    for (let i = 0; i < items.length; i++) {
        if (searchTerm === items[i].id.toLowerCase() || searchTerm === items[i].name.toLowerCase()) {
            $('#txtItemID').val(items[i].id);
            $('#txtItemName').val(items[i].name);
            $('#txtPrice').val(items[i].price);
            $('#txtQuantity').val(items[i].qty);
        }
    }
}

$('#searchItems').on('click', function() {
    const searchQuery = $('#txtSearch-items').val();
    searchItems(searchQuery);
});
