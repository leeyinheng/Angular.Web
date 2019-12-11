export class ClientInventory {
    ClientId: string;
    ClientName: string;
    Address: string;
    Phone: string;
    Inventories: Inventory[];
    private _message: string;
    get Message() {
        return this._message;
    }
    set Message(value) {
        this._message = value;
    }
}

export class Inventory {
    ProductId: string;
    ProductName: string;
    Stock: number;
    Unit: string;
    Return: number;
    NotReturn: number;
}


export class ProjectImages  {
    FileName: string;
    ImageUrl: string;
    Comment: string;
}
