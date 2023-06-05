import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    ngOnInit() {
       
    }

    login(form:NgForm){
        const email=form.value.email;
        const password=form.value.password;
    }

}
