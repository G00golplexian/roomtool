import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
    private router: Router
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
    const _userData = { id: 1, role: Role.admin, firstName: "Admin", lastName: "Dummy", email: "admin@gso.schule.koeln" };
    localStorage.setItem("UserData", JSON.stringify(_userData));
    this.user.currentUser = new User(_userData);
    this.router.navigate(["/private", "dashboard"]);
  }
}
