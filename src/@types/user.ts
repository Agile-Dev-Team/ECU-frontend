// ----------------------------------------------------------------------
export type UserAccount = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  photoURL: string | null;
  country: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  zipCode: string | null;
  company?: string;
  status?: string;
  role?: string;
  about: string | null;
  isPublic: boolean;
  profileImage:string | undefined;
};

export type UserListState = {
  isLoading: boolean;
  users: UserManager[];
  error: Error | string | null;
}

export type AccountState = {
  isLoading: boolean;
  error: Error | string | null;
  _id: string | null;
  profileImage: string | null;
  phoneNumber: string | null;
  name: string | null;
  email: string | null;
  address: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  zipCode: string | null;
  status?: string;
  role?: string | null;
  about?: string | null;
  isPublic?:boolean;
  facebookLink: string | null;
  instagramLink: string | null;
  linkedinLink: string | null;
  twitterLink: string | null;
  bills: Bill[] | null;
};

export type Bill = {
  id: string | null;
  createdAt: Date | null | number;
  price: number | 0;
};

export type CreditCard = {
  id: string;
  cardNumber: string;
  cardType: string;
};

export type Follower = {
  id: string;
  avatarUrl: string;
  name: string;
  country: string;
  isFollowed: boolean;
};

export type Gallery = {
  id: string;
  title: string;
  postAt: Date | string | number;
  imageUrl: string;
};

export type UserAddressBook = {
  id: string;
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
};

export type Profile = {
  id: string;
  cover: string;
  position: string;
  follower: number;
  following: number;
  quote: string;
  country: string;
  email: string;
  company: string;
  school: string;
  role: string;
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  twitterLink: string;
};

export type UserManager = {
  _id: string;
  avatarUrl: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  company: string;
  isVerified: boolean;
  status: string;
  role: string;
};

export type UserData = {
  id: string;
  avatarUrl: string;
  cover: string;
  name: string;
  follower: number;
  following: number;
  totalPost: number;
  position: string;
};

