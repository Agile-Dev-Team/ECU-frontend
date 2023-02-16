
export type News = {
  _id: string;
  title: string;
  imageUrl: string;
  content: string;
  status: boolean;
  createdAt?: string;
};


export type NewsState = {
  isLoading: boolean;
  error: Error | string | null;
  news: News[];
  sortBy: string | null;
  totalPages: number;
  currentPage: number;
  count: number;
};