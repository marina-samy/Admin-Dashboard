import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/models/iproduct';
import { ProductsService } from 'src/app/services/products.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit{
  val: any;
  products: IProduct[] = [];
  pro!: IProduct;

    constructor(private proAPI: ProductsService, private router:Router, public route:ActivatedRoute){

    }
  ngOnInit(): void {
    let sub = this.route.params.subscribe(params => {
      this.val = params['id'];
    });
    console.log("id: " + this.val);

    this.proAPI.getUpdateProduct(this.val).subscribe( res => {
      this.pro = res;
    });
  }

  update(){
    this.proAPI.updateProduct(this.pro).subscribe(data => {
    });
    this.getProduct();
    this.router.navigate(['/product'])
  }

  getProduct(){
    this.proAPI.getAllProducts().subscribe((response)=>{
      this.products = response ;
    })
  }


}
