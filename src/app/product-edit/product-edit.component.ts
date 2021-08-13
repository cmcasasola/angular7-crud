import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {ViewProductService} from '../view-product.service';
import {Subscription} from 'rxjs/internal/Subscription';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.sass']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  productForm: FormGroup;
  subscription: Subscription;
  _id:string='';
  prod_name:string='';
  prod_desc:string='';
  prod_price:number=null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder, private viewProduct: ViewProductService) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      'prod_name' : [null, Validators.required],
      'prod_desc' : [null, Validators.required],
      'prod_price' : [null, Validators.required]
    });
    this.getProduct();
  }

  getProduct() {
    // this.api.getProduct(id).subscribe(data => {
    //   this._id = id;
    //   this.productForm.setValue({
    //     prod_name: data.prod_name,
    //     prod_desc: data.prod_desc,
    //     prod_price: data.prod_price
    //   });
    // });
    this.subscription = this.viewProduct.getCurrentProduct().subscribe(value => {
      this._id = value.id;
      this.productForm.setValue({
        prod_name: value.prod_name,
        prod_desc: value.prod_desc,
        prod_price: value.prod_price
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.updateProduct(this._id, form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/product-details']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  productDetails() {
    this.router.navigate(['/product-details', this._id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
