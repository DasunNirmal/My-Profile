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

var ValidItemID = $('#orders-content-card-left>#txtItemId-orders');
var ValidItemName = $('#orders-content-card-left>#txtItemName-orders');
var ValidUnitPrice = $('#orders-content-card-left>#txtUnitPrice-orders');
var ValidQtyONHand = $('#orders-content-card-left>#txtQtyOnHand-orders');
var ValidQty = $('#orders-content-card-left>#txtOrderQuantity');
var ValidOrderID = $('#orders-content-card-right>#txtOrderId');
var ValidCustomerID = $('#orders-content-card-right>#txtCustomerId-orders');
var ValidCustomerName = $('#orders-content-card-right>#txtCustomerName-orders');
var ValidPhoneNumber = $('#orders-content-card-right > #txtPhoneNumber-orders');
var ValidOrderDate = $('#orders-content-card-right > #txtOrderDate');
var isValidName = new RegExp("\\b[A-Z][a-z]*( [A-Z][a-z]*)*\\b");
var isValidPriceAndQty = new RegExp("^[0-9]+\\.?[0-9]*$");
var isValidPhoneNumber = new RegExp("^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$");

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
$(ValidUnitPrice).on("input", function () {
    $(ValidUnitPrice).css({
        border: "2px solid #B05200"
    });
});
$(ValidQtyONHand).on("input", function () {
    $(ValidQtyONHand).css({
        border: "2px solid #B05200"
    });
});
$(ValidQty).on("input", function () {
    $(ValidQty).css({
        border: "2px solid #B05200"
    });
});
$(ValidOrderID).on("input", function () {
    $(ValidOrderID).css({
        border: "2px solid #B05200"
    });
});
$(ValidCustomerID).on("input", function () {
    $(ValidCustomerID).css({
        border: "2px solid #B05200"
    });
});
$(ValidCustomerName).on("input", function () {
    $(ValidCustomerName).css({
        border: "2px solid #B05200"
    });
});
$(ValidPhoneNumber).on("input", function () {
    $(ValidPhoneNumber).css({
        border: "2px solid #B05200"
    });
});
$(ValidOrderDate).on("input", function () {
    $(ValidOrderDate).css({
        border: "2px solid #B05200"
    });
});


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

function emptyPlaceHolder() {
    $(ValidItemID).attr("placeholder", "");
    $(ValidItemName).attr("placeholder", "");
    $(ValidUnitPrice).attr("placeholder", "");
    $(ValidQtyONHand).attr("placeholder", "");
    $(ValidQty).attr("placeholder", "");
    $(ValidOrderID).attr("placeholder", "");
    $(ValidCustomerID).attr("placeholder", "");
    $(ValidCustomerName).attr("placeholder", "");
    $(ValidPhoneNumber).attr("placeholder", "");
    $(ValidOrderDate).attr("placeholder", "");
}

function defaultBorderColor() {
    $(ValidItemID).css({
        border: "2px solid #B05200"
    });
    $(ValidItemName).css({
        border: "2px solid #B05200"
    });
    $(ValidUnitPrice).css({
        border: "2px solid #B05200"
    });
    $(ValidQtyONHand).css({
        border: "2px solid #B05200"
    });
    $(ValidQty).css({
        border: "2px solid #B05200"
    });
    $(ValidOrderID).css({
        border: "2px solid #B05200"
    });
    $(ValidCustomerID).css({
        border: "2px solid #B05200"
    });
    $(ValidCustomerName).css({
        border: "2px solid #B05200"
    });
    $(ValidPhoneNumber).css({
        border: "2px solid #B05200"
    });
    $(ValidOrderDate).css({
        border: "2px solid #B05200"
    });
}

function validOrder() {
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

    if (itemID === "" || orderID === "" || customerID === "" || orderDate === "" || !isValidName.test(itemName)
        || !isValidPriceAndQty.test(unitPrice) || !isValidPriceAndQty.test(qtyOnHand)
        || !isValidPriceAndQty.test(orderQty) || !isValidName.test(customerName) || !isValidPhoneNumber.test(phoneNumber)) {

        $(ValidItemID).css({
            border: "3px solid red"
        });
        $(ValidItemName).css({
            border: "3px solid red"
        });
        $(ValidUnitPrice).css({
            border: "3px solid red"
        });
        $(ValidQtyONHand).css({
            border: "3px solid red"
        });
        $(ValidQty).css({
            border: "3px solid red"
        });
        $(ValidOrderID).css({
            border: "3px solid red"
        });
        $(ValidCustomerID).css({
            border: "3px solid red"
        });
        $(ValidCustomerName).css({
            border: "3px solid red"
        });
        $(ValidPhoneNumber).css({
            border: "3px solid red"
        });
        $(ValidOrderDate).css({
            border: "3px solid red"
        });

        $(ValidItemID).attr("placeholder", "ID Empty");
        $(ValidItemName).attr("placeholder", "Wrong Input Try Again");
        $(ValidUnitPrice).attr("placeholder", "Wrong Input");
        $(ValidQtyONHand).attr("placeholder", "Wrong Input");
        $(ValidQty).attr("placeholder", "Wrong Input");
        $(ValidOrderID).attr("placeholder", "Wrong Input");
        $(ValidCustomerID).attr("placeholder", "Wrong Input");
        $(ValidCustomerName).attr("placeholder", "Wrong Input Try Again");
        $(ValidPhoneNumber).attr("placeholder", "Wrong Input");
        $(ValidOrderDate).attr("placeholder", "Wrong Input");

        $(ValidItemID).addClass('red');
        $(ValidItemName).addClass('red');
        $(ValidUnitPrice).addClass('red');
        $(ValidQtyONHand).addClass('red');
        $(ValidQty).addClass('red');
        $(ValidOrderID).addClass('red');
        $(ValidCustomerID).addClass('red');
        $(ValidCustomerName).addClass('red');
        $(ValidPhoneNumber).addClass('red');
        $(ValidOrderDate).addClass('red');
    }
}

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

    if (itemID === "" || orderID === "" || customerID === "" || orderDate === "" || !isValidName.test(itemName)
        || !isValidPriceAndQty.test(unitPrice) || !isValidPriceAndQty.test(qtyOnHand)
        || !isValidPriceAndQty.test(orderQty) || !isValidName.test(customerName) || !isValidPhoneNumber.test(phoneNumber)) {
        validOrder();
        return false;
    }
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

    emptyPlaceHolder();
    defaultBorderColor();
    totalTagUpdate();
    loadOrderTable();
    loadItemTable();
    loadOrderTableHome();
    updatePriceTag(); /*call this method to update price-tag if that same customer place another order*/
    ClearAll();
});

$('#btnDelete').on('click', function () {
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


    if (itemID === "" || orderID === "" || customerID === "" || orderDate === "" || !isValidName.test(itemName)
        || !isValidPriceAndQty.test(unitPrice) || !isValidPriceAndQty.test(qtyOnHand)
        || !isValidPriceAndQty.test(orderQty) || !isValidName.test(customerName) || !isValidPhoneNumber.test(phoneNumber)) {
        validOrder();
        return false;
    }
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

    if (itemID === "" || orderID === "" || customerID === "" || orderDate === "" || !isValidName.test(itemName)
        || !isValidPriceAndQty.test(unitPrice) || !isValidPriceAndQty.test(qtyOnHand)
        || !isValidPriceAndQty.test(orderQty) || !isValidName.test(customerName) || !isValidPhoneNumber.test(phoneNumber)) {
        validOrder();
        return false;
    }
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

function searchOrders(query) {
    const searchTerm = query.toLowerCase();

    for (let i = 0; i < orders.length; i++) {
        if (searchTerm === orders[i].orderID.toLowerCase()) {
            $('#txtItemId-orders').val(orders[i].itemID);
            $('#txtItemName-orders').val(orders[i].ItemName);
            $('#txtUnitPrice-orders').val(orders[i].unitPrice);
            $('#txtQtyOnHand-orders').val(orders[i].qtyOnHand);
            $('#txtOrderQuantity').val(orders[i].orderQty);
            $('#txtOrderId').val(orders[i].orderID);
            $('#txtCustomerId-orders').val(orders[i].customerID);
            $('#txtCustomerName-orders').val(orders[i].customerName);
            $('#txtPhoneNumber-orders').val(orders[i].phoneNumber);
            $('#txtOrderDate').val(orders[i].orderDate);
            $('#price-tag').text("Rs : "+orders[i].totalPrice+"/=");
            break;
        }
    }
    clearInterval(priceTagInterval);
}

$('#searchOrders').on('click', function() {
    const searchQuery = $('#txtSearch-03').val();
    searchOrders(searchQuery);
});

$('#btnClearAll').on('click',function () {
   ClearAll();
    $('#price-tag').text("Rs : "+"0"+"/=");
});

$('#btnClear-1').on('click',function () {
   ClearOne();
});

$('#btnClear-2').on('click',function () {
    ClearTwo();
});