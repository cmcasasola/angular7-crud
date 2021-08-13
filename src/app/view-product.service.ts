import { Injectable } from '@angular/core';
import {Product} from './product';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewProductService {

  private currentProduct = new BehaviorSubject<Product>({} as Product);

  constructor() {
  }

  getCurrentProduct(): Observable<Product> {
    return this.currentProduct.asObservable();
  }

  viewProduct(product: Product) {
    this.currentProduct.next(product);
  }
}
