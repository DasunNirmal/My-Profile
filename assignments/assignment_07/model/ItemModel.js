export default class ItemModel {

    constructor(id,name,price,qty) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._qty = qty;
    }


    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get price() {
        return this._price;
    }

    set price(price) {
        this._price = price;
    }

    get qty() {
        return this._qty;
    }

    set qty(qty) {
        this._qty = qty;
    }
}