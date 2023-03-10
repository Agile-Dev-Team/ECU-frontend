// ----------------------------------------------------------------------

export type InvoiceAddress = {
  id: string;
  name: string;
  address: string;
  company: string;
  email: string;
  phone: string;
};

export type InvoiceItem = {
  id: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
  service: string;
};

export type UploadFile = {
  id: string;
  sent: number;
  title: string;
  status: string;
  totalPrice: number;
  invoiceNumber: string;
  subTotalPrice: number;
  taxes: number | string;
  discount: number | string;
  invoiceFrom: InvoiceAddress;
  invoiceTo: InvoiceAddress;
  createDate: Date | number;
  dueDate: Date | number;
  items: InvoiceItem[];
};

export type UploadFileState = {
  isLoading: boolean;
  error: Error | string | null;
  brand: string[];
  model: string[];
  generation: string[];
  engine: string[];
  power: string;
  torque: string;
  fuel: string[];
  ecu: string[];
  year: string[];
};