import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AccesoService } from './../servicios/acceso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  id:any
  turnos:any
  constructor(private router:Router,
    private servicio:AccesoService) { }

  ngOnInit(): void {
    this.id=localStorage.getItem('id')
    console.log(this.id)
    if(this.id==0){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Inicie sesión',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigateByUrl("login")
    }
    this.consulta_turnos()
  }
  consulta_turnos(){
    let body={
      'accion': 'consultar_turnos_paciente',
      'pacientes_id_paciente': this.id
    }
    return new Promise(resolve=>{
      this.servicio.postData(body).subscribe((res:any)=>{
        if(res.estado){
          this.turnos=res.datos;
        }else{
          Swal.fire('','No existen turnos','warning');
        }
      },(err)=>{
        Swal.fire('Error','Error de conexión','error');
      });
    });
  }

}
