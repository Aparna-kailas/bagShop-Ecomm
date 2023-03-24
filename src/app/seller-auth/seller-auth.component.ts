import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { signUp } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{
  showLogin=false;
  authError: string='';
  // sellerSigndata=''
constructor(private seller:SellerService,private router:Router){}


ngOnInit(): void {
  this.seller.reloadSeller()
}

signUp(data:signUp){   //:void
// console.warn(data);
this.seller.sellerSignUp(data);
}


login(data:signUp){
  // this.authError="";
  this.seller.sellerLogin(data);
  this.seller.isLoginError.subscribe((isError)=>{
    console.warn(isError);
    
    if(isError){
this.authError="incorrect email or password";
    }
  })
  }

openLogin(){
this.showLogin=true
}
openSignUp(){
  this.showLogin=false
}

}
