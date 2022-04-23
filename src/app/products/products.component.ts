import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any;
  error: string;
  isLoading = false;
  message: string;
  selectedProductToEdit: any;
  @ViewChild('close') closeButton:ElementRef 

  constructor(
    private prod: ProductService,
    public auth:AuthService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.isLoading = true;
    this.prod.getProducts().subscribe((res) => {
      this.isLoading = false;
      if (!res.error) {
        this.message = 'products fetched successfully';
        this.products = res.products;
        setTimeout(() => {
          this.message = '';
        }, 5000);
      }
      else {
        this.error = 'Could not fetch the products';
      }
    }, err => {
      this.isLoading = false;
      this.error = 'Server Error';
    })
  }

  onDelete(product) {
   const confirmation = confirm('Are you sure to delete this product??');
   if(confirmation){
    this.prod.deleteProduct(product._id).subscribe((res) => {
      if(!res.error) {
        this.products.splice(this.products.indexOf(product),2)
      }
    })
   }
  }

  onEditProduct(product){
    this.selectedProductToEdit = product;    
  }

  onFormSubmit(){
    this.prod.updateProduct(this.selectedProductToEdit._id,this.selectedProductToEdit).subscribe((res) => {
    if(!res.error){
      this.closeButton.nativeElement.click()
    }      
    })
  }

}
