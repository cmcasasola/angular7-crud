import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ApiService } from '../api.service';
import {ViewProductService} from '../view-product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['prod_name', 'prod_price'];
  data: Product[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService, private viewProduct: ViewProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.api.getProducts()
    .subscribe(res => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  viewProductDetail(product: Product): void {
    this.viewProduct.viewProduct(product);
    this.router.navigate(['/product-details']);
  }

}
