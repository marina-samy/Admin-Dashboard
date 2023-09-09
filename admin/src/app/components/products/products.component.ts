import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/iproduct';
import { ProductsService } from 'src/app/services/products.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  ListOfPro:IProduct[]=[]
  searchTerm: string = '';
  pro:IProduct= {} as IProduct;
  searchData: any;
  tableSize:number = 10;
  tableSizes:any = [5, 10, 15, 20, 25];
  count:number=0;
  page: number = 1
  constructor(private proAPI: ProductsService, private router:Router, private sweetAlertService: SweetAlertService ){
      
  

  }
  ngOnInit(): void {
    this.proAPI.getAllProducts().subscribe(response =>{
      this.ListOfPro = response;
      console.log(response);
    })
  }

  
  update(id:number){
    this.router.navigate(['/updateProduct',id])
    }


  deletePro(val: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.proAPI.deleteProduct(val).subscribe((data: any) => {
          console.log(data);
          this.sweetAlertService.showSuccess('Product Deleted Successfully');
          this.ListOfPro= this.ListOfPro.filter((pro) => pro.id !== val);
  
        }); 
      }
    });
  }


  search(){
    if(this.searchData ==""){
      this.proAPI.getAllProducts()
    }else{
      this.ListOfPro = this.ListOfPro.filter(res =>{
        return res.name.toLocaleLowerCase().match(this.searchData.toLocaleLowerCase())
        
      })
    }
  }


onTableDataChange(event:any){
  this.page = event;
  this.proAPI.getAllProducts()
}

onTableSizeChange(event:any): void{
  this.tableSize = event.target.value;
  this.page= 1;
  this.proAPI.getAllProducts()
}
}
function gettAllByCat() {
  throw new Error('Function not implemented.');
}

