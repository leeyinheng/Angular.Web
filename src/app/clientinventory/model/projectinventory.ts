abstract class ClientInventorybase {
    ClientId: string;
    ClientName: string;
    Address: string;
    Phone: string;
    private _message: string;
    get Message() {
        return this._message;
    }
    set Message(value) {
        this._message = value;
    }
    SubTotal: number;
    SubStock: number;
    SubReturn: number;

}

export class ClinetInfo extends ClientInventorybase {
  Comment: string;
}

export class ClientInventory extends ClientInventorybase {
  Inventories: Inventory[];
}

export class ClientInventoryFull extends ClientInventorybase {
  Inventories: InventoryFull[];
}

export class Inventory {
    ProductId: string;
    ProductName: string;
    Stock: number;
    Unit: string;
    Return: number;
    NotReturn: number;
}

export class InventoryFull extends Inventory {
  GroupId: string; // 產品大類
  BarCode: string; // 條碼
  LocationId: string; // 倉架位置
}

export class InventoryTrade extends InventoryFull {
  ClientId: string;
  ClientName: string;
}

export class TradeConfirm {
  ToClientId: string;
  TradeInfo: string;
  TradeAmount: number;
  TradeList: InventoryTrade[];
}

export class InventoryExtend {
    ProductId: string;
    GroupId: string; // 產品大類
    BarCode: string; // 條碼
    LocationId: string; // 倉架位置
}


export class ProjectImages {
    FileName: string;
    ImageUrl: string;
    Comment: string;
}
