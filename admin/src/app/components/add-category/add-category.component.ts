import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/models/icategory';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  cat:ICategory= {} as ICategory;
  ListOfCat:ICategory[]=[];
  constructor(private catAPI : CategoriesService, private router:Router, private sweetAlertService: SweetAlertService){

  }
  ngOnInit(): void {

  }

  addCat(){
  
  
  
    this.catAPI.addNewCat(this.cat).subscribe({
      next:(Cat)=>{
        console.log(Cat);
        this.sweetAlertService.showSuccess('Category added successfully');
        //alert("category added successfully")
        this.router.navigate(['/category']);
  
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







