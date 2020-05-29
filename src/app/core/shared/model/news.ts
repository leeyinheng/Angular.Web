
export class News {
  status: string;
  page: number;
  news: Article[];
}


export class Article {
  id: string;
  author: string;
  title: string;
  description: string;
  image: string;
  url: string;
}
