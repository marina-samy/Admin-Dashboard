import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/iproduct';
import { ProductsService } from 'src/app/services/products.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {     

  ListOfPro:IProduct[]=[]
    pro:IProduct= {} as IProduct;

    constructor(private proAPI: ProductsService, private router:Router, private sweetAlertService: SweetAlertService){

    }
 
    addPro(){
  
      this.proAPI.addNewProduct(this.pro).subscribe({
        next:(pro)=>{
          console.log(pro);
          this.sweetAlertService.showSuccess('Product added successfully');
          //alert("category added successfully")
          this.router.navigate(['/product']);
    
        },
        error:(err)=>{
          console.log(err);
   
        },
        complete:() => {
          console.log('Observable completed');
        },
        
      })
      }



 
        
      }



