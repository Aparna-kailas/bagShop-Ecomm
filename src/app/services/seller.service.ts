import { HttpClientModule } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError=new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }
  sellerSignUp(data: signUp) {
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result) => {
      console.warn(result);
      if(result){
        alert("Signup successfull")
      localStorage.setItem('seller', JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
      }
    })
  }
  
  sellerLogin(data:login){
console.warn(data);
this.http.get<signUp[]>(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
  if(result && result.body?.length){
    localStorage.setItem('seller', JSON.stringify(result.body[0]))
    this.router.navigate(['seller-home'])
    }
  else{
    console.warn("login failed");
    this.isLoginError.emit(true)
  }
  })
}
reloadSeller(){
  if(localStorage.getItem('seller')){
    this.isSellerLoggedIn.next(true)
    this.router.navigate(['seller-home'])
  }
}
}
