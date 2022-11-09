import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult, LoginResult } from '../models/api';
import { Report } from '../models/report';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private APIURL = "https://0b44-2a02-3035-812-482e-b9c4-8c78-a43-33dc.eu.ngrok.io/api/v1";


  constructor(
    private http: HttpClient,
    private user: UserService
  ) { }

  loginUser(email: string, password: string)
  {
    return this.http.post<LoginResult>(`${this.APIURL}/login`, {email, password});
  }

  getUsers()
  {
    return this.http.get<User[]>(`${this.APIURL}/users`, { headers: this.getHeaders() });
  }

  getUser(id: number)
  {
    return this.http.get<User>(`${this.APIURL}/user/${id}`, { headers: this.getHeaders() });
  }
  
  putUser(user: User)
  {
    return this.http.put<APIResult>(`${this.APIURL}/user/${user.id}`, user, { headers: this.getHeaders() });
  }
  
  changePassword(oldPassword: string, newPassword: string)
  {
    return this.http.put<APIResult>(`${this.APIURL}/user/password`, { oldPassword, newPassword }, { headers: this.getHeaders() });
  }

  getReports()
  {
    return this.http.get<Report[]>(`${this.APIURL}/reports`, { headers: this.getHeaders() });
  }

  getReportsForRoom(roomId: string)
  {
    return this.http.get<Report[]>(`${this.APIURL}/reports/room/${roomId}`, { headers: this.getHeaders() });
  }

  getReport()
  {
    return this.http.get<Report>(`${this.APIURL}/report`, { headers: this.getHeaders() });
  }

  postReport(report: Report)
  {
    return this.http.post<APIResult>(`${this.APIURL}/report`, report, { headers: this.getHeaders() });
  }

  putReport(report: Report)
  {
    return this.http.put<APIResult>(`${this.APIURL}/report`, report, { headers: this.getHeaders() });
  }


  //internal
  getHeaders()
  {
    const _token = localStorage.getItem("haumichtot");
    return new HttpHeaders({
      "x-app-haumichtot": _token ?? ""
    })
  }
}