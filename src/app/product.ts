export class Product {
  id: string;
  prod_name: string;
  prod_desc: string;
  prod_price: number;
  updated_at: Date;


  constructor(id: string, prod_name: string, prod_desc: string, prod_price: number) {
    this.id = id;
    this.prod_name = prod_name;
    this.prod_desc = prod_desc;
    this.prod_price = prod_price;
  }
}
