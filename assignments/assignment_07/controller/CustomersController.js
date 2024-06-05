import CustomerModel from "../model/CustomerModel.js";
import {customers} from "../db/db.js";
var recordIndexCustomers;

$('#nav-customers-section').on('click',() => {

    const home = $('.current-page-button');
    const orders = $('.Orders');
    const customers = $('.Customers');
    const items = $('.Items');

    // Hide/show relevant sections
    $('#home-section').hide();
    $('#orders-section').hide();
    $('#items-section').hide();
    $('#customers-section').show();


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
    applyHoverEffect(orders);
    applyHoverEffect(items);

    /*this hover makes sure that home btn style stays same as the up hover btn other wise the up hover will override
    the css style in the orders page btn.This is because all the css is applied to one file (SPA)*/
    $(customers).hover(function (){
        $(this).css({
            background: '#B05200',
            color: '#FEE5D4'
        });
    });
});

var ValidCustomerID = $('#customers-content-card-left>#txtCustomerID');
var ValidCustomerName = $('#customers-content-card-left>#txtName');
var ValidCustomerAddress = $('#customers-content-card-left>#txtAddress');
var ValidCustomerPhoneNumber = $('#customers-content-card-left>#txtPhoneNumber');
var isValidCustomerName = new RegExp("\\b[A-Z][a-z]*( [A-Z][a-z]*)*\\b");
var isValidCustomerAddress = new RegExp("^[A-Za-z0-9'\\/\\.,\\s]{5,}$");
var isValidPhoneNumber = new RegExp("^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$");


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

$(ValidCustomerAddress).on("input", function () {
    $(ValidCustomerAddress).css({
        border: "2px solid #B05200"
    });
});

$(ValidCustomerPhoneNumber).on("input", function () {
    $(ValidCustomerPhoneNumber).css({
        border: "2px solid #B05200"
    });
});

/**Add, Update, Delete, Clear All**/

function clearAll() {
    $('#txtCustomerID').val("");
    $('#txtName').val("");
    $('#txtAddress').val("");
    $('#txtPhoneNumber').val("");
}

function emptyPlaceHolder() {
    $(ValidCustomerID).attr("placeholder", "");
    $(ValidCustomerName).attr("placeholder", "");
    $(ValidCustomerAddress).attr("placeholder", "");
    $(ValidCustomerPhoneNumber).attr("placeholder", "");
}

function defaultBorderColor() {
    $(ValidCustomerID).css({
        border: "2px solid #B05200"
    });
    $(ValidCustomerName).css({
        border: "2px solid #B05200"
    });
    $(ValidCustomerAddress).css({
        border: "2px solid #B05200"
    });
    $(ValidCustomerPhoneNumber).css({
        border: "2px solid #B05200"
    });
}

function validCustomer() {
    var customerID = $('#txtCustomerID').val();
    var customerName = $('#txtName').val();
    var customerAddress = $('#txtAddress').val();
    var phoneNumber = $('#txtPhoneNumber').val();

    if (customerID === "" || !isValidCustomerName.test(customerName) || !isValidCustomerAddress.test(customerAddress) || !isValidPhoneNumber.test(phoneNumber)) {

        $(ValidCustomerID).css({
            border: "3px solid red"
        });
        $(ValidCustomerName).css({
            border: "3px solid red"
        });
        $(ValidCustomerAddress).css({
            border: "3px solid red"
        });
        $(ValidCustomerPhoneNumber).css({
            border: "3px solid red"
        });

        $(ValidCustomerID).attr("placeholder", "ID Empty");
        $(ValidCustomerName).attr("placeholder", "Wrong Input Try Again");
        $(ValidCustomerAddress).attr("placeholder", "Wrong Input Try Again");
        $(ValidCustomerPhoneNumber).attr("placeholder", "Wrong Input Try Again");

        $(ValidCustomerID).addClass('red');
        $(ValidCustomerName).addClass('red');
        $(ValidCustomerAddress).addClass('red');
        $(ValidCustomerPhoneNumber).addClass('red');

    }  else {
        defaultBorderColor();
        emptyPlaceHolder();
    }
}

function totalCustomers() {
    var total = customers.length;
    $('#count').text(total);
}

$('#btnClearAll-customer').on('click',() => {
    clearAll();
});

function loadCustomerTable() {
    $("#customers-table-tb").empty();

    customers.map((item,index) => {
        var customerRecord = `<tr>
                        <td class="c-id">${item.id}</td>
                        <td class="c-name">${item.name}</td>
                        <td class="c-address">${item.address}</td>
                        <td class="c-phoneNumber">${item.phoneNumber}</td>
                    </tr>`
        $('#customers-table-tb').append(customerRecord);
    });
}

$('#customers-table-tb').on('click','tr',function () {
    recordIndexCustomers = $(this).index();

    var id = $(this).find(".c-id").text();
    var name = $(this).find(".c-name").text();
    var address = $(this).find(".c-address").text();
    var phoneNumber = $(this).find(".c-phoneNumber").text();

    $('#txtCustomerID').val(id);
    $('#txtName').val(name);
    $('#txtAddress').val(address);
    $('#txtPhoneNumber').val(phoneNumber);
});

$('#addCustomers').on('click', () => {

    var customerID = $('#txtCustomerID').val();
    var customerName = $('#txtName').val();
    var customerAddress = $('#txtAddress').val();
    var phoneNumber = $('#txtPhoneNumber').val();

    if (customerID === "" || !isValidCustomerName.test(customerName) || !isValidCustomerAddress.test(customerAddress) || !isValidPhoneNumber.test(phoneNumber)) {
        validCustomer();
        return;
    }
    let customerModel = new CustomerModel(customerID,customerName,customerAddress,phoneNumber);
    customers.push(customerModel);
    defaultBorderColor();
    emptyPlaceHolder();
    loadCustomerTable();
    clearAll();
    totalCustomers();
});

$('#btnDelete-customer').on('click',() => {

    var customerID = $('#txtCustomerID').val();
    var customerName = $('#txtName').val();
    var customerAddress = $('#txtAddress').val();
    var phoneNumber = $('#txtPhoneNumber').val();

    if (customerID === "" || !isValidCustomerName.test(customerName) || !isValidCustomerAddress.test(customerAddress) || !isValidPhoneNumber.test(phoneNumber)) {
        validCustomer();
        return;
    }

    customers.splice(recordIndexCustomers,1);
    defaultBorderColor();
    emptyPlaceHolder();
    loadCustomerTable();
    clearAll();
    totalCustomers();
});

$('#btnUpdate-customer').on('click',() => {

    var customerID = $('#txtCustomerID').val();
    var customerName = $('#txtName').val();
    var customerAddress = $('#txtAddress').val();
    var phoneNumber = $('#txtPhoneNumber').val();

    if (customerID === "" || !isValidCustomerName.test(customerName) || !isValidCustomerAddress.test(customerAddress) || !isValidPhoneNumber.test(phoneNumber)) {
        validCustomer();
        return;
    }

    var cOb = customers[recordIndexCustomers];
    cOb.id = customerID;
    cOb.name = customerName;
    cOb.address = customerAddress;
    cOb.phoneNumber = phoneNumber;
    defaultBorderColor();
    emptyPlaceHolder();
    loadCustomerTable();
    clearAll();
    totalCustomers();
});

function searchCustomers(query) {
    const searchTerm = query.toLowerCase();

    for (let i = 0; i < customers.length; i++) {
        if (searchTerm === customers[i].id.toLowerCase() || searchTerm === customers[i].phoneNumber.toLowerCase()) {
            $('#txtCustomerID').val(customers[i].id);
            $('#txtName').val(customers[i].name);
            $('#txtAddress').val(customers[i].address);
            $('#txtPhoneNumber').val(customers[i].phoneNumber);
            break;
        }
    }
}

$('#search-customer').on('click', function() {
    const searchQuery = $('#txtSearch-customers').val();
    searchCustomers(searchQuery);
});

