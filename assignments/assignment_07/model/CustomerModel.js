export default class CustomerModel {

    constructor(id,name,address,phoneNumber) {
        this._id = id;
        this._name = name;
        this._address = address;
        this._phoneNumber = phoneNumber;
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

    get address() {
        return this._address;
    }

    set address(address) {
        this._address = address;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }

    set phoneNumber(phoneNumber) {
        this._phoneNumber = phoneNumber;
    }
}