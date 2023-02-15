
export type News = {
  _id: string;
  title: string;
  image: string;
  content: string;
};


export type NewsState = {
  isLoading: boolean;
  error: Error | string | null;
  news: News[];
  sortBy: string | null;
};