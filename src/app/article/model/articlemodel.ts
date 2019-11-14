export class Article {
    Id: string;
    Title: string;
    Comment: string;
    Pages: Page[];
}


export class Page  {
    Image_Url: string;
    Name: string;
    Comment: string;
}
