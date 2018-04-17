 

export class customerlog  {
    Name : string; 
    PhoneNumber:string; 
    Email : string; 
    Note : string; 
    RecordTime : string; 
    RowKey : string; 

    constructor()
    {
        this.RecordTime = Date.now().toString(); 
    }

}