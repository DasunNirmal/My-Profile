export default class OrderModel {

    constructor(itemID,ItemName,unitPrice,qtyOnHand,orderQty,orderID,customerID,customerName,phoneNumber,orderDate,totalPrice) {
        this._itemID = itemID;
        this._ItemName = ItemName;
        this._unitPrice = unitPrice;
        this._qtyOnHand = qtyOnHand;
        this._orderQty = orderQty;
        this._orderID = orderID;
        this._customerID = customerID;
        this._customerName = customerName;
        this._phoneNumber = phoneNumber;
        this._orderDate = orderDate;
        this._totalPrice = totalPrice;
    }


    get itemID() {
        return this._itemID;
    }

    set itemID(itemID) {
        this._itemID = itemID;
    }

    get ItemName() {
        return this._ItemName;
    }

    set ItemName(itemName) {
        this._ItemName = itemName;
    }

    get unitPrice() {
        return this._unitPrice;
    }

    set unitPrice(unitPrice) {
        this._unitPrice = unitPrice;
    }

    get qtyOnHand() {
        return this._qtyOnHand;
    }

    set qtyOnHand(qtyOnHand) {
        this._qtyOnHand = qtyOnHand;
    }

    get orderQty() {
        return this._orderQty;
    }

    set orderQty(orderQty) {
        this._orderQty = orderQty;
    }

    get orderID() {
        return this._orderID;
    }

    set orderID(orderID) {
        this._orderID = orderID;
    }

    get customerID() {
        return this._customerID;
    }

    set customerID(customerID) {
        this._customerID = customerID;
    }

    get customerName() {
        return this._customerName;
    }

    set customerName(customerName) {
        this._customerName = customerName;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }

    set phoneNumber(phoneNumber) {
        this._phoneNumber = phoneNumber;
    }

    get orderDate() {
        return this._orderDate;
    }

    set orderDate(orderDate) {
        this._orderDate = orderDate;
    }


    get totalPrice() {
        return this._totalPrice;
    }

    set totalPrice(totalPrice) {
        this._totalPrice = totalPrice;
    }
}