export class BusinessCenter {
    Id: string;
    Name: string;
    Intro: string;
    BusinessHours:  BusinessHour[];
    Phone: string;
    Email: string;
    WebSite: string;
    Address: string;
    MinPrice: Number;
    MaxPrice: Number;
    Coordinates: string;
    RecordTime: string;
    Comment: string;
    Images: BusinessCenterImage[];
    MeetingRooms: BusinessCenterMeetingRoom[];
    Features: BusinessCenterFeature[];
}


export class BusinessCenterImage  {
    Image_Url: string;
    Name: string;
    Comment: string;
}

export class BusinessCenterMeetingRoom {
    Name: string;
    Image_Url: string;
    Category: string;
    Price: string;
    Status: string;

}


export class BusinessCenterFeature  {
    Image_Url: string;
    Name: string;
    Comment: string;
    Checked: boolean;
}


export class BusinessHour {
    Day: string;
    StartTime: string;
    EndTime: string;
}

export class Request {
    RequestOffice: string;
    Type: string;
    HowLong: string;
    HowManyPeople: string;
    Comment: string;
    Name: string;
    Phone: string;
    Email: string;
}
