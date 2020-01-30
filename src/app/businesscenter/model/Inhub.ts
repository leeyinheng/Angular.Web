export class Vendor {
  Id: string;
  Company: string;
  County: string;
  District:  string;
  Street: string;
  Company_en: string;
  County_en: string;
  District_en: string;
  Street_en: string;
  Latitude: number;
  Longitude: number;
  DefaultSeats: number;
  ImageUrls: string[];
  Features: Feature[];
  Points: number;
}

export class Feature {
  Type: string;
  Name_en: string;
  Name: string;
  Image_Url: string;
  Checked: boolean;
}

export class Gps {
  Latitude: number;
  Longitude: number;
}

export class User {
  Id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Cell: string;
  Address: string;
  Points: number;
  DateJoined: Date;
  Password: string;
  Vendor: User_Vendor;
}

// tslint:disable-next-line:class-name
export class User_Vendor {
  company: string;
}
