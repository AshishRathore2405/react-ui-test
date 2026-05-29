interface Address {
  city: string;
}
interface Company {
  name: string;
}
export interface User {
  id?: number;
  name: string;
  email: string;
  address: Address;
  company: Company;
}

export type SortBy = "name" | "email" | "address.city" | "company.name";

export type SortOrder = "asc" | "desc";
