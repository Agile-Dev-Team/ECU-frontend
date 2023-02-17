
export type VehicleState = {
  _id: string | null;
  vehicleType: string | null;
  brand: string | null;
  model: string | null;
  modelType: string | null;
  modelYear: string | null;
  version: string | null;
  ps: string | null;
  hp: string | null;
  ecuType: string | null;
  ecuBrand: string | null;
  ecuVersion: string | null;
}

export type VehicleListState = {
  isLoading: boolean;
  error: Error | string | null;
  vehicles: VehicleState[];
  page: number;
  limit: number;
  search: string;
  totalCount: number;
}