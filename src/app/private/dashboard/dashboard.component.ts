import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  role = Role;
  roomControl = new FormControl<string>('');
  rooms: string[] = [
    "C001", "C002", "C003",
    "B001", "B002", "B003",
    "A001", "A002", "A003"
  ];
  filteredRooms!: Observable<string[]>;

  constructor(
    public user: UserService
  ) { }

  ngOnInit(): void {
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.rooms.filter(room => room.toLowerCase().includes(filterValue));
  }
}
