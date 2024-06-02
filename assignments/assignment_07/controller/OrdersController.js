import OrderModel from '../model/OrderModel.js';
import {orders} from "../db/db.js";
import {customers} from "../db/db.js";
import {items} from "../db/db.js";
import {loadOrderTableHome} from "./IndexController.js";
import {loadItemTable} from "./ItemsController.js";

var recordIndexOrders;
var priceTagInterval;

$('#nav-orders-section').on('click', () => {

    const home = $('.current-page-button');
    const orders = $('.Orders');
    const customers = $('.Customers');
    const items = $('.Items');

    /*Hide/show relevant sections*/
    $('#home-section').hide();
    $('#items-section').hide();
    $('#customers-section').hide();
    $('#orders-section').show();


    /*Define a function for styling buttons*/
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
    styleButton(customers);
    styleButton(items);

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
    applyHoverEffect(customers);
    applyHoverEffect(items);

    /*this hover makes sure that home btn style stays same as the up hover btn other wise the up hover will override
    the css style in the orders page btn.This is because all the css is applied to one file (SPA)*/
    $(orders).hover(function (){
        $(this).css({
            background: '#B05200',
            color: '#FEE5D4'
        });
    });
});

/*Search Customers*/

function ClearAll() {
    $('#txtItemId-orders').val("");
    $('#txtItemName-orders').val("");
    $('#txtUnitPrice-orders').val("");
    $('#txtQtyOnHand-orders').val("");
    $('#txtOrderQuantity').val("");
    $('#txtSearch-01').val("");

    $('#txtOrderId').val("");
    $('#txtCustomerId-orders').val("");
    $('#txtCustomerName-orders').val("");
    $('#txtPhoneNumber-orders').val("");
    $('#txtOrderDate').val("");
    $('#txtSearch-02').val("");
}

function ClearOne() {
    $('#txtItemId-orders').val("");
    $('#txtItemName-orders').val("");
    $('#txtUnitPrice-orders').val("");
    $('#txtQtyOnHand-orders').val("");
    $('#txtOrderQuantity').val("");
    $('#txtSearch-01').val("");
}

function ClearTwo() {
    $('#txtOrderId').val("");
    $('#txtCustomerId-orders').val("");
    $('#txtCustomerName-orders').val("");
    $('#txtPhoneNumber-orders').val("");
    $('#txtOrderDate').val("");
    $('#txtSearch-02').val("");
}

function searchCustomers(query) {
    const searchTerm = query.toLowerCase(); /*Convert the search query to lowercase for case-insensitive search*/

    for (let i = 0; i < customers.length; i++) {
        if (searchTerm === customers[i].id.toLowerCase() || searchTerm === customers[i].phoneNumber.toLowerCase()) {
            $('#txtCustomerId-orders').val(customers[i].id);
            $('#txtCustomerName-orders').val(customers[i].name);
            $('#txtPhoneNumber-orders').val(customers[i].phoneNumber);
            $('#txtSearch-02').val("");
            break;
        }
    }
}


$('#search-customers-orders').on('click', function() {
    const searchQuery = $('#txtSearch-02').val();
    searchCustomers(searchQuery);
});

/*Search Items*/
function searchItems(query) {
    const searchTerm = query.toLowerCase(); /*Convert the search query to lowercase for case-insensitive search*/

    for (let i = 0; i < items.length; i++) {
        if (searchTerm === items[i].id.toLowerCase() || searchTerm === items[i].name.toLowerCase()) {
            $('#txtItemId-orders').val(items[i].id);
            $('#txtItemName-orders').val(items[i].name);
            $('#txtUnitPrice-orders').val(items[i].price);
            $('#txtQtyOnHand-orders').val(items[i].qty);
        }
    }
}

$('#search-items-orders').on('click', function() {
    const searchQuery = $('#txtSearch-01').val();
    searchItems(searchQuery);
});


/**Add, Update, Delete, Clear All**/

function loadOrderTable() {
    $("#orders-table-tb").empty();

    orders.map((item, index) => {
        var orderRecord = `<tr>
            <td class="o-id">${item.orderID}</td>
            <td class="o-itemID">${item.itemID}</td>
            <td class="o-itemName">${item.ItemName}</td>
            <td class="o-unit-price">${item.unitPrice}</td>
            <td class="o-qty-on-hand">${item.qtyOnHand}</td>
            <td class="o-qty">${item.orderQty}</td>
            <td class="o-order-date">${item.orderDate}</td>
            <td class="o-customerID">${item.customerID}</td>
            <td class="o-totalPrice">${item.totalPrice}</td>
        </tr>`
        $('#orders-table-tb').append(orderRecord);
    });
}

function totalTagUpdate() {
    priceTagInterval = setInterval(function(){
        $("#price-tag").text("Rs : "+"0"+"/=");
    }, 7000);
}

$('#orders-table-tb').on('click','tr',function () {
    recordIndexOrders = $(this).index();

    var oId = $(this).find(".o-id").text();
    var iId = $(this).find(".o-itemID").text();
    var itemName = $(this).find(".o-itemName").text();
    var unitPrice = $(this).find(".o-unit-price").text();
    var qtyOnHand = $(this).find(".o-qty-on-hand").text();
    var orderQty = $(this).find(".o-qty").text();
    var orderDate = $(this).find(".o-order-date").text();
    var cId = $(this).find(".o-customerID").text();
    var total = $(this).find(".o-totalPrice").text();

    $('#txtItemId-orders').val(iId);
    $('#txtItemName-orders').val(itemName);
    $('#txtUnitPrice-orders').val(unitPrice);
    $('#txtOrderQuantity').val(orderQty);

    $('#txtOrderId').val(oId);
    $('#txtCustomerId-orders').val(cId);
    $('#price-tag').text("Rs : "+total+"/=");

    var customer = customers.find(c => c.id === cId);
    var item = items.find(i => i.id === iId);

    if (customer) {
        $('#txtCustomerName-orders').val(customer.name);
        $('#txtPhoneNumber-orders').val(customer.phoneNumber);
    } else {
        $('#txtCustomerName-orders').val("");
        $('#txtPhoneNumber-orders').val("");
    }

    if (item) {
        $('#txtQtyOnHand-orders').val(item.qty);
    } else {
        $('#txtQtyOnHand-orders').val("");
    }

    $('#txtOrderDate').val(orderDate);

    clearInterval(priceTagInterval);
});

function updatePriceTag() {
    let totalPrice = 0;
    orders.forEach(order => {
        totalPrice += order.totalPrice;
    });
    $('#price-tag').text("Rs : "+totalPrice+"/=");
}

$('#place-order').on('click', function () {
    var itemID = $('#txtItemId-orders').val();
    var itemName = $('#txtItemName-orders').val();
    var unitPrice = $('#txtUnitPrice-orders').val();
    var qtyOnHand = $('#txtQtyOnHand-orders').val();
    var orderQty = $('#txtOrderQuantity').val();

    var orderID = $('#txtOrderId').val();
    var customerID = $('#txtCustomerId-orders').val();
    var customerName = $('#txtCustomerName-orders').val();
    var phoneNumber = $('#txtPhoneNumber-orders').val();
    var orderDate = $('#txtOrderDate').val();

    var totalPrice = unitPrice * orderQty;

    /*Check if the item already exists*/
    var existingItemIndex = items.findIndex(item => item.id === itemID);

    /*the findIndex method will return the first index of the array that have the item id, if there no elements was found
    then it will returns -1. if there is an element it will return 1 then this existingItemIndex !== -1 will be true*/
    if (existingItemIndex !== -1) {
        /*If the item exists, update its quantity*/
        items[existingItemIndex].qty -= orderQty;
    }


    /*Check if the item and customer already exists in orders*/
    var existingOrderIndex = orders.findIndex(order => order.customerID === customerID && order.itemID === itemID);

    if (existingOrderIndex !== -1) {
        /*If the order already exists for the same customer and item, update it*/
        orders[existingOrderIndex].orderQty += parseInt(orderQty);
        orders[existingOrderIndex].totalPrice += totalPrice;
    } else {
        /*If the order doesn't exist, create a new one*/
        let orderModel = new OrderModel(itemID, itemName, unitPrice, qtyOnHand, orderQty, orderID, customerID, customerName, phoneNumber, orderDate, totalPrice);
        orders.push(orderModel);
    }

    /*Update the price tag and tables*/
    $('#price-tag').text("Rs : "+totalPrice+"/=");

    totalTagUpdate();
    loadOrderTable();
    loadItemTable();
    loadOrderTableHome();
    updatePriceTag(); /*call this method to update price-tag if that same customer place another order*/
    ClearAll();
});


$('#btnDelete').on('click', function () {
    orders.splice(recordIndexOrders,1);
    loadOrderTable();
    updatePriceTag();
    ClearAll();
});

$('#btnUpdate').on('click',function () {
    var itemID = $('#txtItemId-orders').val();
    var itemName = $('#txtItemName-orders').val();
    var unitPrice = $('#txtUnitPrice-orders').val();
    var qtyOnHand = $('#txtQtyOnHand-orders').val();
    var orderQty = $('#txtOrderQuantity').val();

    var orderID = $('#txtOrderId').val();
    var customerID = $('#txtCustomerId-orders').val();
    var customerName = $('#txtCustomerName-orders').val();
    var phoneNumber = $('#txtPhoneNumber-orders').val();
    var orderDate = $('#txtOrderDate').val();

    var totalPrice = unitPrice * orderQty;

    var oOb = orders[recordIndexOrders];
    var oldOrderQty = parseInt(oOb.orderQty);

    oOb.itemID = itemID;
    oOb.ItemName = itemName;
    oOb.unitPrice = unitPrice;
    oOb.qtyOnHand = qtyOnHand;
    oOb.orderQty = orderQty;
    oOb.orderID = orderID;
    oOb.customerID = customerID;
    oOb.customerName = customerName;
    oOb.phoneNumber = phoneNumber;
    oOb.orderDate = orderDate;
    oOb.totalPrice = totalPrice;

    var existingItemIndex = items.findIndex(item => item.id === itemID);

    if (existingItemIndex !== -1) {
        var existingQty = parseInt(items[existingItemIndex].qty);
        var qtyDifference = orderQty - oldOrderQty;

        items[existingItemIndex].qty = existingQty - qtyDifference;
    }

    totalTagUpdate();
    loadOrderTable();
    loadItemTable();
    updatePriceTag();
    ClearAll();
});

$('#btnClearAll').on('click',function () {
    ClearAll();
});

$('#btnClear-1').on('click',function () {
    ClearOne();
});

$('#btnClear-2').on('click',function () {
    ClearTwo();
});