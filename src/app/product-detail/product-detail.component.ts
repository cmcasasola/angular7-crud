import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {Product} from '../product';
import {ViewProductService} from '../view-product.service';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  product = {} as Product;
  product2 = {} as Product;
  subscription: Subscription;
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private viewProductService: ViewProductService) {
  }

  ngOnInit(): void {
    this.subscription = this.viewProductService.getCurrentProduct().subscribe(value => {
      // this.product.id = String(value['_id']);
      // this.product.prod_name = value.prod_name;
      // this.product.prod_desc = value.prod_desc;
      // this.product.prod_price = value.prod_price;
      // this.product = new Product(value['_id'], value.prod_name, value.prod_desc, value.prod_price);
      this.product.id = value['_id'];
      this.product = value;
    });
    this.isLoadingResults = false;
    // this.getProductDetails(this.route.snapshot.params['id']);
  }

  getProductDetails(id) {
    this.api.getProduct(id)
      .subscribe(data => {
        this.product = data;
        this.product.id = id;
        console.log(this.product);
        this.isLoadingResults = false;
      });
  }

  editProduct() {
    this.viewProductService.viewProduct(this.product);
    this.router.navigate(['/product-edit']);
  }

  deleteProduct(id) {
    this.isLoadingResults = true;
    this.api.deleteProduct(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/products']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
