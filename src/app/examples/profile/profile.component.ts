import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AccesoService } from '../../servicios/acceso.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    cedula:any
    p_nombre:any
    p_apellido:any
    clave:any
    id:any
    celular:any
    constructor(
        private router:Router,
        private servicio:AccesoService,
    ) { }

    ngOnInit() {
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
        this.consulta_paciente()
    }
    consulta_paciente(){
        let body={
            'accion': 'consultar_pacientes',
            'id_paciente': this.id
          }
          console.log(body)
          return new Promise(resolve=>{
            this.servicio.postData(body).subscribe((res:any)=>{
              if(res.estado){
                  this.p_nombre=res.datos[0].p_nombre
                  this.p_apellido=res.datos[0].p_apellido
                  this.cedula=res.datos[0].cedula
                  this.celular=res.datos[0].celular
                  this.clave=res.datos[0].clave
              }else{
                
              }
            },(err)=>{
              Swal.fire('Error','Error de conexión','error');
            });
          });
    }
    editar(){
        let body={
          'accion': 'actualizar_pacientes',
          'p_nombre': this.p_nombre,
          'p_apellido': this.p_apellido,
          'cedula': this.cedula,
          'celular': this.celular,
          'clave': this.clave,
          'id_paciente': this.id
          }
          console.log(body)
          return new Promise(resolve=>{
            this.servicio.postData(body).subscribe((res:any)=>{
              if(res.estado){
                Swal.fire({
                  position: 'top',
                  icon: 'success',
                  title: 'Paciente Actualizado con exito',
                  showConfirmButton: false,
                  timer: 1500
                })
                  this.router.navigateByUrl("inicio")
              }else{
                
              }
            },(err)=>{
              Swal.fire('Error','Error de conexión','error');
            });
          });
    }

}
