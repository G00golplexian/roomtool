import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult, LoginResult } from '../models/api';
import { Report } from '../models/report';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private APIURL = "http://localhost:8080/api/v1";


  constructor(
    private http: HttpClient
  ) { }

  resetPassword(email: string)
  {
    return this.http.post<LoginResult>(`${this.APIURL}/user/reset_pw`, {email});
  }

  loginUser(data: { email: string, password: string })
  {
    return this.http.post<LoginResult>(`${this.APIURL}/login`, data);
  }

  getUsers()
  {
    return this.http.get<User[]>(`${this.APIURL}/users`, { headers: this.getHeaders() });
  }

  getUser(id: number)
  {
    return this.http.get<User>(`${this.APIURL}/user/${id}`, { headers: this.getHeaders() });
  }
  
  postUser(data: User, password: string)
  {
    return this.http.post<APIResult>(`${this.APIURL}/user`, {...data, password});
  }
  
  putUser(user: User)
  {
    return this.http.put<APIResult>(`${this.APIURL}/user/${user.id}`, user, { headers: this.getHeaders() });
  }
  
  changePassword(oldPassword: string, newPassword: string)
  {
    return this.http.put<APIResult>(`${this.APIURL}/user/password`, { oldPassword, newPassword }, { headers: this.getHeaders() });
  }

  getRooms()
  {
    return this.http.get<string[]>(`${this.APIURL}/rooms`, { headers: this.getHeaders() });
  }

  getReports()
  {
    return this.http.get<Report[]>(`${this.APIURL}/reports`, { headers: this.getHeaders() });
  }

  getReportsHistory()
  {
    return this.http.get<Report[]>(`${this.APIURL}/history`, { headers: this.getHeaders() });
  }

  getReportsForRoom(roomId: string)
  {
    return this.http.get<Report[]>(`${this.APIURL}/reports/room/${roomId}`, { headers: this.getHeaders() });
  }

  getReport(id: number)
  {
    return this.http.get<Report>(`${this.APIURL}/report/${id}`, { headers: this.getHeaders() });
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