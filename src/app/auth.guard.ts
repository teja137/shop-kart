import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private auth:AuthService,private route:Router){}

  canActivate(route: ActivatedRouteSnapshot){
    const roles = route.data.role as Array<string>;
    const userDetails = this.auth.getUserDetails();
    if(userDetails && roles.includes(userDetails.role)){
      return true;
    }else{
      this.route.navigate(['/login'])
      return false;
    }
  }
  
}
