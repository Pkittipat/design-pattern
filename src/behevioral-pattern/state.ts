interface State {
    addItem(count: number): void;
    requestItem(): void;
    insertMoney(money: number): void;
    dispenseItem(): void;
}

class VendingMachine {
    public hasItem: State;
    public noItem: State;
    public itemRequested: State;
    public itemDelivered: State;

    public currentState: State;

    public itemCount: number;
    public itemPrice: number;

    constructor(itemCount: number, itemPrice: number) {
        this.hasItem = new HasItem(this);
        this.noItem = new NoItem(this);
        this.itemRequested = new ItemRequested(this);
        this.itemDelivered = new ItemDelivered(this);

        this.itemCount = itemCount;
        this.itemPrice = itemPrice;

        this.currentState = this.hasItem;
    }

    setState(state: State) {
        this.currentState = state;
    }

    addItem(count: number) {
        this.currentState.addItem(count);
    }

    requestItem() {
        this.currentState.requestItem();
    }

    insertMoney(money: number) {
        this.currentState.insertMoney(money);
    }

    dispenseItem() {
        this.currentState.dispenseItem();
    }
}

class HasItem implements State {
    public vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine) {
        this.vendingMachine = vendingMachine;
    }

    addItem(count: number): void {
        this.vendingMachine.itemCount += count;
    }

    requestItem(): void {
        console.log(`Item requested`);
        this.vendingMachine.setState(this.vendingMachine.itemRequested);
    }

    insertMoney(money: number): void {
        console.log(`money ${money} inserted`)
        console.log(`Please select an item first`);
    }

    dispenseItem(): void {
        console.log(`Please select an item first`);
    }
}

class NoItem implements State {
    public vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine) {
        this.vendingMachine = vendingMachine;
    }

    addItem(count: number): void {
        this.vendingMachine.itemCount += count;
        this.vendingMachine.setState(this.vendingMachine.hasItem);
    }

    requestItem(): void {
        console.log(`No item available`);
    }

    insertMoney(money: number): void {
        console.log(`money ${money} inserted`)
        console.log(`No item available`);
    }

    dispenseItem(): void {
        console.log(`No item available`);
    }
}

class ItemRequested implements State {
    public vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine) {
        this.vendingMachine = vendingMachine;
    }

    addItem(count: number): void {
        console.log(`Item count is ${count}`);
        console.log(`Item Dispensed in progress`);
    }

    requestItem(): void {
        console.log(`Item already requested`);
    }

    insertMoney(money: number): void {
        if (money < this.vendingMachine.itemPrice) {
            console.log(`Inserted money is less than item price`);
            return
        }

        console.log(`money entered is OK`);
        this.vendingMachine.setState(this.vendingMachine.itemDelivered);
    }

    dispenseItem(): void {
        console.log(`Please insert money first`);
    }
}

class ItemDelivered implements State {
    public vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine) {
        this.vendingMachine = vendingMachine;
    }

    addItem(count: number): void {
        console.log(`Item count is ${count}`);
        console.log(`Item Dispensed in progress`);
    }

    requestItem(): void {
        console.log(`Item already requested`);
    }

    insertMoney(money: number): void {
        console.log(`money ${money} inserted`);
        console.log(`money already inserted`);
    }

    dispenseItem(): void {
        console.log(`Dispensing item`);
        this.vendingMachine.itemCount = this.vendingMachine.itemCount - 1;
        if (this.vendingMachine.itemCount > 0) {
            this.vendingMachine.setState(this.vendingMachine.hasItem);
        } else {
            console.log(`No item available`);
            this.vendingMachine.setState(this.vendingMachine.noItem);
        }
    }
}

const vendingMachine = new VendingMachine(1, 10);
vendingMachine.requestItem();
vendingMachine.insertMoney(10);
vendingMachine.dispenseItem();
