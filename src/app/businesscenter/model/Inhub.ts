export class Vendor {
  _id: string;
  company: string;
  county: string;
  district:  string;
  street: string;
  company_en: string;
  county_en: string;
  district_en: string;
  street_en: string;
  latitude: number;
  longitude: number;
  defaultSeats: number;
  imageUrls: string[];
  features: Feature[];
  points: number;
  intro: string;
  intro_en: string;
}

export class Vendor_poco {
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
  Features: Feature_poco[];
  Points: number;
  Intro: string;
  Intro_en: string;
}

export class Feature {
  type: string;
  name_en: string;
  name: string;
  image_url: string;
  checked: boolean;
}

export class Feature_poco {
  Type: string;
  Name_en: string;
  Name: string;
  Image_Url: string;
  Checked: boolean;
}

export class Gps {
  latitude: number;
  longitude: number;
}

export class Gps_poco {
  Latitude: number;
  Longitude: number;
}

export class User {
  _id: string;
  firstName: string;
  lastName: string;
  eMail: string;
  cell: string;
  address: string;
  points: number;
  dateJoined: Date;
  vendor: User_Vendor;
  password: string;
  referral: string;
  vendorId: Vendor;
}


export class User_poco {
  Id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Cell: string;
  Address: string;
  Points: number;
  DateJoined: Date;
  Vendor: User_Vendor;
  Password: string;
  Referral: string;
}

// tslint:disable-next-line:class-name
export class User_Vendor {
  company: string;
}
