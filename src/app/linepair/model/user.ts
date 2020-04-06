export class LinePairUser {

   Id: string;
   Name: string;
   ImgLink: string;
   Gender: string;
   Birthday: Date;
   SalaryRange: number;
   Married: string;
   Phone: string;
   Email: string;
   LineId: string;
   City: string;
   Occuptation: string;
   School: string;
   Weight: number;
   Height: number;
   HasCar: boolean;
   HasHouse: boolean;
   Intro: string;
   Payments: LinePairPayment[];
   Arranges: LinePairArrange[];
}

export class LinePairPayment {
  Date: Date;
  Amount: number;
  TargetId: string;
  Note: string;
}


export class LinePairArrange {
  Date: Date;
  InterestedId: string;
  ArrangeStatus: string;
  Result: string;
}