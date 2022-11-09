import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Role, User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private user: UserService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.loginForm = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login()
  {
    if(this.loginForm.valid)
    {
      this.api.loginUser(this.loginForm.value).subscribe({
        next: (res) => 
        {
          if(!res.error)
          {
            localStorage.setItem("haumichtot", res.id.toString());

            this.api.getUser(res.id).subscribe(res => {
              const _userData = res;
              localStorage.setItem("UserData", JSON.stringify(_userData));
              this.user.currentUser = new User(_userData);
              this.router.navigate(["/private", "dashboard"]);
            })
          }
        },
        error: (err) => this.snack.open(err.error, undefined, { duration: 5000 })
      })
    }
  }
}
