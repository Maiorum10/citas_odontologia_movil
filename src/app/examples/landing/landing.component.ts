import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AccesoService } from '../../servicios/acceso.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
  id:any
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
  }
  citas(){
    this.router.navigateByUrl("citas")
  }
}
