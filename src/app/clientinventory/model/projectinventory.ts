export class ClientInventory {
    ClientId: string;
    ClientName: string;
    Address: string;
    Phone: string;
    Inventories: Inventory[];
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
