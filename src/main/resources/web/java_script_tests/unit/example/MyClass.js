export class MyClass {
    constructor() {
        this._it = "Default it"
    }

    setIt(it) {
        this._it = it;
        return this;
    }

    getIt() {
        return this._it;
    }

    static doubleIt(number) {
        return number * 3;
    }


    static reverseIt(str) {
        return str.split("").reverse().join("");
    }

}


