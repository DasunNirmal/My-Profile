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


/**Add, Update, Delete, Clear All**/

function clearAll() {
    $('#txtItemID').val("");
    $('#txtItemName').val("");
    $('#txtPrice').val("");
    $('#txtQuantity').val("");
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

    let itemModel = new ItemModel(itemID,itemName,itemPrice,itemQty);

    items.push(itemModel);
    loadItemTable();
    clearAll();
    totalItems();
});

$('#btnDelete-items').on('click',() => {
    items.splice(recordIndexItems,1);
    loadItemTable();
    clearAll();
    totalItems();
});

$('#btnUpdate-items').on('click',() => {
    var itemID = $('#txtItemID').val();
    var itemName = $('#txtItemName').val();
    var itemPrice = $('#txtPrice').val();
    var itemQty = $('#txtQuantity').val();

    var iOb = items[recordIndexItems];
    iOb.id = itemID;
    iOb.name = itemName;
    iOb.price = itemPrice;
    iOb.qty = itemQty;

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
