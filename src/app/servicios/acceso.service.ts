import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  usuarioId:string='0';
  fecha:any;
  hora:any;
  server : string='http://186.71.211.14:1023/api/api_odontologia/servicio.php';
  constructor(public http:HttpClient) { }
  postData( body ){
    let headers=new HttpHeaders({
    'Content-Type':'application/json; charset=UTF-8'
    });
    let options={
      headers:headers
    }
    return this.http.post(this.server, JSON.stringify(body), options);
  }
  getData(){
    let headers=new HttpHeaders({
      'Content-Type':'application/json; charset=UTF-8'
    });
    let options={
      headers:headers
    }
    return this.http.get(this.server,options);
  }
}
