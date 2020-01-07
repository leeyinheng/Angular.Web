// tslint:disable-next-line:class-name
abstract  class baseClient  {
    ClientId: string;
    ClientName: string;
    Address: string;
    Phone: string;
}


export class UserInfo<T, T1> extends baseClient {
    Info: T;
    InfoHistory: T1[];
    Comment: string;
}


export class HealthInfo {
  Height: number;
  Note: string;
}

export class HealthHistory {
  BloodPressures: BloodPressure[];
  Meals: Meal[];
  WalkSteps: number;
  Weight: string;
  DateTime: string;
  Comment: string;
  DataKey: string;
}

export class BloodPressure {
  DateTime: string;
  BloodLow: number;
  BloodHigh: number;
  Pulse: number;
  Comment: string;
}

export class Meal {
  Name: string;
  ImageLink: string;
  DateTime: string;
}


export class PaymentInfo {
  NextPaymentDate: string;
  LastPaymentDate: string;
  TotalStock: number;
  TotalFee: number;
  PaymentPeriod: number; // month unit
  PaymentStatus: string;
  Comment: string;
}

export class PaymentHistory {
  Date: string;
  Item: string;
  PaymentType: string;
  Amount: string;
  Comment: string;
  DataKey: string;
}
