
export class News {
  status: string;
  totalResults: number;
  articles: Article[];
}


export class Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  urlToImage: string;
  url: string;
}


export class Source {
  id: string;
  name: string;
}

