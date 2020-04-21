

export class weight {
    id: number;
    airweight: number;
    waterweight: number;
    ratioweight: string;
    note: string;
    type: string;
    constructor(_id: number, _air: number , _water:number , _ratio: string , _note: string, _type: string)
    {
        this.id = _id;
        this.airweight = _air
        this.waterweight = _water;
        this.ratioweight = _ratio;
        this.note = _note;
        this.type = _type;
    }

}
