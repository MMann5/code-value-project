export interface Product {
  id: number; // unique identifier
  name: string; // up to 30 characters
  description?: string; // optional description up to 200 characters
  price: number; // positive number
  creationDate: Date;
}
