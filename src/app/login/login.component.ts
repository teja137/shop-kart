import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean;
  error: string;
  message: any;

  constructor(
    private auth: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.auth.onLogin(form.value).subscribe((res) => {
      this.isLoading = false;
      if (!res.error) {
        localStorage.setItem('userDetails', JSON.stringify(res))
        this.route.navigate(['/products'])
      } else {
        this.message = res.message;
        if(res.message.toLowerCase().trim() === 'no user found'){
          this.route.navigate(['/register'])
        }
      }
    }, err => {
      this.error = 'Something went wrong ...try again later..'
    })
  }
}
