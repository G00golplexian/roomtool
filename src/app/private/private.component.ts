import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Navigation } from '../models/navigation';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  navigation: Navigation[] = [
    {
      name: "Dashboard",
      icon: "home",
      path: ["/private", "dashboard"]
    },
    {
      name: "Benutzer",
      icon: "group",
      path: ["/private", "users"]
    },
    {
      name: "Defekte",
      icon: "list",
      path: ["/private", "reports"]
    },
    {
      name: "Defekt melden",
      icon: "build",
      path: ["/private", "report"]
    },
    {
      name: "FAQ",
      icon: "quiz",
      path: ["/private", "faq"]
    },
  ]
  
  constructor(
    public user: UserService,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/").finally(() => {
      this.snack.open("Sie wurden erfolgreich ausgeloggt.", undefined, { panelClass: "gsobk", duration: 5000 });
    });
  }
}
