 

export class weight  {
    id : number; 
    airweight:number; 
    waterweight : number; 
    ratioweight : string; 

    constructor(_id: number, _air: number , _water:number , _ratio: string)
    {
        this.id = _id; 
        this.airweight = _air; 
        this.waterweight = _water; 
        this.ratioweight = _ratio; 
    }

}