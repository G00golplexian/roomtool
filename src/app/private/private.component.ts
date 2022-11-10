import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Navigation } from '../models/navigation';
import { Role } from '../models/user';
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
      path: ["/private", "dashboard"],
      allow: [Role.admin, Role.betreuer, Role.lehrer, Role.user, Role.werkstatt]
    },
    {
      name: "Benutzer",
      icon: "group",
      path: ["/private", "users"],
      allow: [Role.admin]
    },
    {
      name: "Defekte",
      icon: "list",
      path: ["/private", "reports"],
      allow: [Role.admin, Role.betreuer, Role.werkstatt]
    },
    {
      name: "Defekt melden",
      icon: "build",
      path: ["/private", "report-create"],
      allow: [Role.admin, Role.betreuer, Role.lehrer]
    },
    {
      name: "FAQ",
      icon: "quiz",
      path: ["/private", "faq"],
      allow: [Role.admin, Role.betreuer, Role.lehrer, Role.user, Role.werkstatt]
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
