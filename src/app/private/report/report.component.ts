import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Report, RoomType } from 'src/app/models/report';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  report: Report = new Report();
  roomtype = RoomType;
  roomTypes = [
    {
      type: RoomType.omnibus,
      text: "Omnibus"
    },
    {
      type: RoomType.pc_circle,
      text: "PC-Raum Kreis"
    },
    {
      type: RoomType.pc_sixtable,
      text: "PC-Raum 6er Tischgruppen"
    },
    {
      type: RoomType.u_big,
      text: "U-Form Groß"
    },
    {
      type: RoomType.u_small,
      text: "U-Form Klein"
    },
  ];
  statuses: string[] = ["offen", "verifiziert", "in bearbeitung", "geschlossen"]
  statusControl = new FormControl("", Validators.required)
  
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(res => {
      if(res.has("id"))
      {
        this.api.getReport(Number(res.get("id"))).subscribe(res => {
          if(res) {
            this.report = new Report(res);
            if(res.status) this.statusControl.patchValue(res.status);
          }
        })
      }
    })
  }

  saveStatus()
  {
    if(this.statusControl.invalid) return;

    this.report.status = this.statusControl.value!;
    this.api.putReport(this.report).subscribe({
      next: (res) => {
        if(!res?.error)
        {
          this.snack.open("Der Status wurde aktualisiert", undefined, { duration: 5000, panelClass: "gsobk" })
        }
      },
      error: (data) => {
        this.snack.open("Der Status konnte nicht aktualisiert werden.", undefined, { duration: 5000, panelClass: "gsobk" })
      }
    })
  }
}
