import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AccesoService } from './../servicios/acceso.service';
import { Router } from '@angular/router';
import { date } from './../../assets/javascript/date'
import { calendar } from './../../assets/javascript/date'

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `]
})

export class ComponentsComponent implements OnInit {
    focus;
    doctores:any
    date: {year: number, month: number};
    model: NgbDateStruct;
    medico:any="Odontólogo"
    id_medico:any=0
    hoy:any
    f:any
    n1:any="1"
    n2:any="2"
    n3:any="3"
    n4:any="4"
    n5:any="5"
    n6:any="6"
    n7:any="7"
    n8:any="8"
    n9:any="9"
    n10:any="10"
    h1:any="8:00-8:45"
    h2:any="9:00-9:45"
    h3:any="10:00-10:45"
    h4:any="11:00-11:45"
    h5:any="12:00-12:45"
    h6:any="14:00-14:45"
    h7:any="15:00-15:45"
    h8:any="16:00-16:45"
    h9:any="17:00-17:45"
    h10:any="18:00-18:45"
    ho1:any=800
    ho2:any=900
    ho3:any=1000
    ho4:any=1100
    ho5:any=1200
    ho6:any=1400
    ho7:any=1500
    ho8:any=1600
    ho9:any=1700
    ho10:any=1800
    e1:any="Disponible"
    e2:any="Disponible"
    e3:any="Disponible"
    e4:any="Disponible"
    e5:any="Disponible"
    e6:any="Disponible"
    e7:any="Disponible"
    e8:any="Disponible"
    e9:any="Disponible"
    e10:any="Disponible"
    c1:any=false
    c2:any=false
    c3:any=false
    c4:any=false
    c5:any=false
    c6:any=false
    c7:any=false
    c8:any=false
    c9:any=false
    c10:any=false
    id:any
    id_p1:any="0"
    id_p2:any="0"
    id_p3:any="0"
    id_p4:any="0"
    id_p5:any="0"
    id_p6:any="0"
    id_p7:any="0"
    id_p8:any="0"
    id_p9:any="0"
    id_p10:any="0"
    nuevo:any=""
    citas:any
    currentHour:any;
    currentMinute:any;

    constructor( private renderer : Renderer2,
      private router:Router,
      private servicio:AccesoService) {}

    ngOnInit() {
      date();

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
        document.getElementById('consultas').style.display = 'none';
        this.llenar_medicos()
        this.fechajs()
    }

    

    fecha(){
      if(this.id_medico!=0 && this.nuevo!=""){
        this.f=this.nuevo;
        console.log(this.f)
        this.consulta_turnos()
        document.getElementById('consultas').style.display = 'block';
      }else{
        Swal.fire('','Llene todos los campos para continuar','warning');
      }
    }

    fechajs(){
      const currentDate = new Date();
      
      const currentDayOfMonth = currentDate.getDate();
      const currentMonth = currentDate.getMonth()+1; // Be careful! January is 0, not 1
      const currentYear = currentDate.getFullYear();
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();
      if(currentMinute<10){
        this.currentMinute='0'+currentMinute
      }else{
        this.currentMinute=currentMinute
      }
      this.currentHour=currentHour+''+this.currentMinute
      let mes
      if(currentMonth<10){
        mes ='0'+currentMonth
      }else{
        mes =currentMonth
      }
      this.hoy = currentYear + "-" + mes + "-" + currentDayOfMonth;
      console.log(this.hoy);
      console.log(this.currentHour)
    }

    llenar_medicos(){
        let body={
            'accion': 'consultar_medicos'
          }
          return new Promise(resolve=>{
            this.servicio.postData(body).subscribe((res:any)=>{
              if(res.estado){
                this.doctores=res.datos;
              }else{
                Swal.fire('','No existen medicos disponibles','warning');
              }
            },(err)=>{
              Swal.fire('Error','Error de conexión','error');
            });
          });
    }

    removeIdD(doc){
        this.medico=doc.nombre+" "+doc.apellido
        this.id_medico=doc.id_empleado
    }

    consulta_turnos(){
      this.id_p1=0
      this.id_p2=0
      this.id_p3=0
      this.id_p4=0
      this.id_p5=0
      this.id_p6=0
      this.id_p7=0
      this.id_p8=0
      this.id_p9=0
      this.id_p10=0
      this.e1="Disponible"
      this.e2="Disponible"
      this.e3="Disponible"
      this.e4="Disponible"
      this.e5="Disponible"
      this.e6="Disponible"
      this.e7="Disponible"
      this.e8="Disponible"
      this.e9="Disponible"
      this.e10="Disponible"
      this.c1=false
      this.c2=false
      this.c3=false
      this.c4=false
      this.c5=false
      this.c6=false
      this.c7=false
      this.c8=false
      this.c9=false
      this.c10=false
      let body={
        'accion': 'consultar_turnos',
        'id_empleado':  this.id_medico,
        'fecha': this.f
      }
      return new Promise(resolve=>{
        this.servicio.postData(body).subscribe((res:any)=>{
          if(res.estado){
            this.citas=res.datos;
            for(let i=0;i<=10;i++){
              if(this.n1==this.citas[i].numero){
                this.e1=this.citas[i].estado
                this.id_p1=this.citas[i].pacientes_id_paciente
                this.c1=true
              }
              if(this.n2==this.citas[i].numero){
                this.e2=this.citas[i].estado
                this.id_p2=this.citas[i].pacientes_id_paciente
                this.c2=true
              }
              if(this.n3==this.citas[i].numero){
                this.e3=this.citas[i].estado
                this.id_p3=this.citas[i].pacientes_id_paciente
                this.c3=true
              }
              if(this.n4==this.citas[i].numero){
                this.e4=this.citas[i].estado
                this.id_p4=this.citas[i].pacientes_id_paciente
                this.c4=true
              }
              if(this.n5==this.citas[i].numero){
                this.e5=this.citas[i].estado
                this.id_p5=this.citas[i].pacientes_id_paciente
                this.c5=true
              }
              if(this.n6==this.citas[i].numero){
                this.e6=this.citas[i].estado
                this.id_p6=this.citas[i].pacientes_id_paciente
                this.c6=true
              }
              if(this.n7==this.citas[i].numero){
                this.e7=this.citas[i].estado
                this.id_p7=this.citas[i].pacientes_id_paciente
                this.c7=true
              }
              if(this.n8==this.citas[i].numero){
                this.e8=this.citas[i].estado
                this.id_p8=this.citas[i].pacientes_id_paciente
                this.c8=true
              }
              if(this.n9==this.citas[i].numero){
                this.e9=this.citas[i].estado
                this.id_p9=this.citas[i].pacientes_id_paciente
                this.c9=true
              }
              if(this.n10==this.citas[i].numero){
                this.e10=this.citas[i].estado
                this.id_p10=this.citas[i].pacientes_id_paciente
                this.c10=true
              }
            }
          }else{
            this.e1="Disponible"
            this.e2="Disponible"
            this.e3="Disponible"
            this.e4="Disponible"
            this.e5="Disponible"
            this.e6="Disponible"
            this.e7="Disponible"
            this.e8="Disponible"
            this.e9="Disponible"
            this.e10="Disponible"
            this.c1=false
            this.c2=false
            this.c3=false
            this.c4=false
            this.c5=false
            this.c6=false
            this.c7=false
            this.c8=false
            this.c9=false
            this.c10=false
          }
        },(err)=>{
          Swal.fire('Error','Error de conexión','error');
        });
      });
    }
    
    agendar1(){
      if(this.id==this.id_p1 || this.id==this.id_p2 || this.id==this.id_p3 || this.id==this.id_p4 || this.id==this.id_p5
      || this.id==this.id_p6 || this.id==this.id_p7 || this.id==this.id_p8 || this.id==this.id_p9 || this.id==this.id_p10){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Ya tiene un turno para la fecha seleccionada',
          showConfirmButton: false,
          timer: 1500
        })
      }else if(this.hoy==this.f){
        if(this.ho1<=this.currentHour){
          Swal.fire('No puede agendar una cita para un horario anterior','','warning')
        }else{
          let body={
            'accion': 'agendar',
            'numero': this.n1,
            'fecha': this.f,
            'hora': this.h1,
            'estado': "no disponible",
            'empleados_id_empleado': this.id_medico,
            'pacientes_id_paciente': this.id
          }
          return new Promise(resolve=>{
            this.servicio.postData(body).subscribe((res:any)=>{
              if(res.estado){
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Cita agendada con exito',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.consulta_turnos()
                this.router.navigateByUrl("turnos")
              }else{
                
              }
            },(err)=>{
              Swal.fire('Error','Error de conexión','error');
            });
          });
        }
      }else{
        let body={
          'accion': 'agendar',
          'numero': this.n1,
          'fecha': this.f,
          'hora': this.h1,
          'estado': "no disponible",
          'empleados_id_empleado': this.id_medico,
          'pacientes_id_paciente': this.id
        }
        return new Promise(resolve=>{
          this.servicio.postData(body).subscribe((res:any)=>{
            if(res.estado){
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cita agendada con exito',
                showConfirmButton: false,
                timer: 1500
              })
              this.consulta_turnos()
              this.router.navigateByUrl("turnos")
            }else{
              
            }
          },(err)=>{
            Swal.fire('Error','Error de conexión','error');
          });
        });
      }
    }
    agendar2(){
      if(this.id==this.id_p1 || this.id==this.id_p2 || this.id==this.id_p3 || this.id==this.id_p4 || this.id==this.id_p5
        || this.id==this.id_p6 || this.id==this.id_p7 || this.id==this.id_p8 || this.id==this.id_p9 || this.id==this.id_p10){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Ya tiene un turno para la fecha seleccionada',
            showConfirmButton: false,
            timer: 1500
          })
        }else if(this.hoy==this.f){
          if(this.ho2<=this.currentHour){
            Swal.fire('No puede agendar una cita para un horario anterior','','warning')
          }else{
            let body={
              'accion': 'agendar',
              'numero': this.n2,
              'fecha': this.f,
              'hora': this.h2,
              'estado': "no disponible",
              'empleados_id_empleado': this.id_medico,
              'pacientes_id_paciente': this.id
            }
            return new Promise(resolve=>{
              this.servicio.postData(body).subscribe((res:any)=>{
                if(res.estado){
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cita agendada con exito',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.consulta_turnos()
                  this.router.navigateByUrl("turnos")
                }else{
                  
                }
              },(err)=>{
                Swal.fire('Error','Error de conexión','error');
              });
            });
          }
        }else{
          let body={
            'accion': 'agendar',
            'numero': this.n2,
            'fecha': this.f,
            'hora': this.h2,
            'estado': "no disponible",
            'empleados_id_empleado': this.id_medico,
            'pacientes_id_paciente': this.id
          }
          return new Promise(resolve=>{
            this.servicio.postData(body).subscribe((res:any)=>{
              if(res.estado){
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Cita agendada con exito',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.consulta_turnos()
                this.router.navigateByUrl("turnos")
              }else{
                
              }
            },(err)=>{
              Swal.fire('Error','Error de conexión','error');
            });
          });
        }
    }
    agendar3(){
      if(this.id==this.id_p1 || this.id==this.id_p2 || this.id==this.id_p3 || this.id==this.id_p4 || this.id==this.id_p5
        || this.id==this.id_p6 || this.id==this.id_p7 || this.id==this.id_p8 || this.id==this.id_p9 || this.id==this.id_p10){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Ya tiene un turno para la fecha seleccionada',
            showConfirmButton: false,
            timer: 1500
          })
        }else if(this.hoy==this.f){
          if(this.ho3<=this.currentHour){
            Swal.fire('No puede agendar una cita para un horario anterior','','warning')
          }else{
            let body={
              'accion': 'agendar',
              'numero': this.n3,
              'fecha': this.f,
              'hora': this.h3,
              'estado': "no disponible",
              'empleados_id_empleado': this.id_medico,
              'pacientes_id_paciente': this.id
            }
            return new Promise(resolve=>{
              this.servicio.postData(body).subscribe((res:any)=>{
                if(res.estado){
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cita agendada con exito',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.consulta_turnos()
                  this.router.navigateByUrl("turnos")
                }else{
                  
                }
              },(err)=>{
                Swal.fire('Error','Error de conexión','error');
              });
            });
          }
        }else{
          let body={
            'accion': 'agendar',
            'numero': this.n3,
            'fecha': this.f,
            'hora': this.h3,
            'estado': "no disponible",
            'empleados_id_empleado': this.id_medico,
            'pacientes_id_paciente': this.id
          }
          return new Promise(resolve=>{
            this.servicio.postData(body).subscribe((res:any)=>{
              if(res.estado){
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Cita agendada con exito',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.consulta_turnos()
                this.router.navigateByUrl("turnos")
              }else{
                
              }
            },(err)=>{
              Swal.fire('Error','Error de conexión','error');
            });
          });
        }
    }
    agendar4(){
      if(this.id==this.id_p1 || this.id==this.id_p2 || this.id==this.id_p3 || this.id==this.id_p4 || this.id==this.id_p5
        || this.id==this.id_p6 || this.id==this.id_p7 || this.id==this.id_p8 || this.id==this.id_p9 || this.id==this.id_p10){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Ya tiene un turno para la fecha seleccionada',
            showConfirmButton: false,
            timer: 1500
          })
        }else if(this.hoy==this.f){
          if(this.ho4<=this.currentHour){
            Swal.fire('No puede agendar una cita para un horario anterior','','warning')
          }else{
            let body={
              'accion': 'agendar',
              'numero': this.n4,
              'fecha': this.f,
              'hora': this.h4,
              'estado': "no disponible",
              'empleados_id_empleado': this.id_medico,
              'pacientes_id_paciente': this.id
            }
            return new Promise(resolve=>{
              this.servicio.postData(body).subscribe((res:any)=>{
                if(res.estado){
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cita agendada con exito',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.consulta_turnos()
                  this.router.navigateByUrl("turnos")
                }else{
                  
                }
              },(err)=>{
                Swal.fire('Error','Error de conexión','error');
              });
            });
          }
        }else{
          let body={
            'accion': 'agendar',
            'numero': this.n4,
            'fecha': this.f,
            'hora': this.h4,
            'estado': "no disponible",
            'empleados_id_empleado': this.id_medico,
            'pacientes_id_paciente': this.id
          }
          return new Promise(resolve=>{
            this.servicio.postData(body).subscribe((res:any)=>{
              if(res.estado){
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Cita agendada con exito',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.consulta_turnos()
                this.router.navigateByUrl("turnos")
              }else{
                
              }
            },(err)=>{
              Swal.fire('Error','Error de conexión','error');
            });
          });
        }
    }
    agendar5(){
      if(this.id==this.id_p1 || this.id==this.id_p2 || this.id==this.id_p3 || this.id==this.id_p4 || this.id==this.id_p5
        || this.id==this.id_p6 || this.id==this.id_p7 || this.id==this.id_p8 || this.id==this.id_p9 || this.id==this.id_p10){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Ya tiene un turno para la fecha seleccionada',
            showConfirmButton: false,
            timer: 1500
          })
        }else if(this.hoy==this.f){
          if(this.ho5<=this.currentHour){
            Swal.fire('No puede agendar una cita para un horario anterior','','warning')
          }else{
            let body={
              'accion': 'agendar',
              'numero': this.n5,
              'fecha': this.f,
              'hora': this.h5,
              'estado': "no disponible",
              'empleados_id_empleado': this.id_medico,
              'pacientes_id_paciente': this.id
            }
            return new Promise(resolve=>{
              this.servicio.postData(body).subscribe((res:any)=>{
                if(res.estado){
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cita agendada con exito',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.consulta_turnos()
                  this.router.navigateByUrl("turnos")
                }else{
                  
                }
              },(err)=>{
                Swal.fire('Error','Error de conexión','error');
              });
            });
          }
        }else{
          let body={
            'accion': 'agendar',
            'numero': this.n5,
            'fecha': this.f,
            'hora': this.h5,
            'estado': "no disponible",
            'empleados_id_empleado': this.id_medico,
            'pacientes_id_paciente': this.id
          }
          return new Promise(resolve=>{
            this.servicio.postData(body).subscribe((res:any)=>{
              if(res.estado){
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Cita agendada con exito',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.consulta_turnos()
                this.router.navigateByUrl("turnos")
              }else{
                
              }
            },(err)=>{
              Swal.fire('Error','Error de conexión','error');
            });
          });
        }
    }
    agendar6(){
      if(this.id==this.id_p1 || this.id==this.id_p2 || this.id==this.id_p3 || this.id==this.id_p4 || this.id==this.id_p5
        || this.id==this.id_p6 || this.id==this.id_p7 || this.id==this.id_p8 || this.id==this.id_p9 || this.id==this.id_p10){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Ya tiene un turno para la fecha seleccionada',
            showConfirmButton: false,
            timer: 1500
          })
        }else if(this.hoy==this.f){
          if(this.ho6<=this.currentHour){
            Swal.fire('No puede agendar una cita para un horario anterior','','warning')
          }else{
            let body={
              'accion': 'agendar',
              'numero': this.n6,
              'fecha': this.f,
              'hora': this.h6,
              'estado': "no disponible",
              'empleados_id_empleado': this.id_medico,
              'pacientes_id_paciente': this.id
            }
            return new Promise(resolve=>{
              this.servicio.postData(body).subscribe((res:any)=>{
                if(res.estado){
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cita agendada con exito',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.consulta_turnos()
                  this.router.navigateByUrl("turnos")
                }else{
                  
                }
              },(err)=>{
                Swal.fire('Error','Error de conexión','error');
              });
            });
          }
        }else{
          let body={
            'accion': 'agendar',
            'numero': this.n6,
            'fecha': this.f,
            'hora': this.h6,
            'estado': "no disponible",
            'empleados_id_empleado': this.id_medico,
            'pacientes_id_paciente': this.id
          }
          return new Promise(resolve=>{
            this.servicio.postData(body).subscribe((res:any)=>{
              if(res.estado){
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Cita agendada con exito',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.consulta_turnos()
                this.router.navigateByUrl("turnos")
              }else{
                
              }
            },(err)=>{
              Swal.fire('Error','Error de conexión','error');
            });
          });
        }
    }
    agendar7(){
      if(this.id==this.id_p1 || this.id==this.id_p2 || this.id==this.id_p3 || this.id==this.id_p4 || this.id==this.id_p5
        || this.id==this.id_p6 || this.id==this.id_p7 || this.id==this.id_p8 || this.id==this.id_p9 || this.id==this.id_p10){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Ya tiene un turno para la fecha seleccionada',
            showConfirmButton: false,
            timer: 1500
          })
        }else if(this.hoy==this.f){
          if(this.ho7<=this.currentHour){
            Swal.fire('No puede agendar una cita para un horario anterior','','warning')
          }else{
            let body={
              'accion': 'agendar',
              'numero': this.n7,
              'fecha': this.f,
              'hora': this.h7,
              'estado': "no disponible",
              'empleados_id_empleado': this.id_medico,
              'pacientes_id_paciente': this.id
            }
            return new Promise(resolve=>{
              this.servicio.postData(body).subscribe((res:any)=>{
                if(res.estado){
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cita agendada con exito',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.consulta_turnos()
                  this.router.navigateByUrl("turnos")
                }else{
                  
                }
              },(err)=>{
                Swal.fire('Error','Error de conexión','error');
              });
            });
          }
        }else{
          let body={
            'accion': 'agendar',
            'numero': this.n7,
            'fecha': this.f,
            'hora': this.h7,
            'estado': "no disponible",
            'empleados_id_empleado': this.id_medico,
            'pacientes_id_paciente': this.id
          }
          return new Promise(resolve=>{
            this.servicio.postData(body).subscribe((res:any)=>{
              if(res.estado){
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Cita agendada con exito',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.consulta_turnos()
                this.router.navigateByUrl("turnos")
              }else{
                
              }
            },(err)=>{
              Swal.fire('Error','Error de conexión','error');
            });
          });
        }
    }
    agendar8(){
      if(this.id==this.id_p1 || this.id==this.id_p2 || this.id==this.id_p3 || this.id==this.id_p4 || this.id==this.id_p5
        || this.id==this.id_p6 || this.id==this.id_p7 || this.id==this.id_p8 || this.id==this.id_p9 || this.id==this.id_p10){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Ya tiene un turno para la fecha seleccionada',
            showConfirmButton: false,
            timer: 1500
          })
        }else if(this.hoy==this.f){
          if(this.ho8<=this.currentHour){
            Swal.fire('No puede agendar una cita para un horario anterior','','warning')
          }else{
            let body={
              'accion': 'agendar',
              'numero': this.n8,
              'fecha': this.f,
              'hora': this.h8,
              'estado': "no disponible",
              'empleados_id_empleado': this.id_medico,
              'pacientes_id_paciente': this.id
            }
            return new Promise(resolve=>{
              this.servicio.postData(body).subscribe((res:any)=>{
                if(res.estado){
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cita agendada con exito',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.consulta_turnos()
                  this.router.navigateByUrl("turnos")
                }else{
                  
                }
              },(err)=>{
                Swal.fire('Error','Error de conexión','error');
              });
            });
          }
        }else{
          let body={
            'accion': 'agendar',
            'numero': this.n8,
            'fecha': this.f,
            'hora': this.h8,
            'estado': "no disponible",
            'empleados_id_empleado': this.id_medico,
            'pacientes_id_paciente': this.id
          }
          return new Promise(resolve=>{
            this.servicio.postData(body).subscribe((res:any)=>{
              if(res.estado){
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Cita agendada con exito',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.consulta_turnos()
                this.router.navigateByUrl("turnos")
              }else{
                
              }
            },(err)=>{
              Swal.fire('Error','Error de conexión','error');
            });
          });
        }
    }
    agendar9(){
      if(this.id==this.id_p1 || this.id==this.id_p2 || this.id==this.id_p3 || this.id==this.id_p4 || this.id==this.id_p5
        || this.id==this.id_p6 || this.id==this.id_p7 || this.id==this.id_p8 || this.id==this.id_p9 || this.id==this.id_p10){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Ya tiene un turno para la fecha seleccionada',
            showConfirmButton: false,
            timer: 1500
          })
        }else if(this.hoy==this.f){
          if(this.ho9<=this.currentHour){
            Swal.fire('No puede agendar una cita para un horario anterior','','warning')
          }else{
            let body={
              'accion': 'agendar',
              'numero': this.n9,
              'fecha': this.f,
              'hora': this.h9,
              'estado': "no disponible",
              'empleados_id_empleado': this.id_medico,
              'pacientes_id_paciente': this.id
            }
            return new Promise(resolve=>{
              this.servicio.postData(body).subscribe((res:any)=>{
                if(res.estado){
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cita agendada con exito',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.consulta_turnos()
                  this.router.navigateByUrl("turnos")
                }else{
                  
                }
              },(err)=>{
                Swal.fire('Error','Error de conexión','error');
              });
            });
          }
        }else{
          let body={
            'accion': 'agendar',
            'numero': this.n9,
            'fecha': this.f,
            'hora': this.h9,
            'estado': "no disponible",
            'empleados_id_empleado': this.id_medico,
            'pacientes_id_paciente': this.id
          }
          return new Promise(resolve=>{
            this.servicio.postData(body).subscribe((res:any)=>{
              if(res.estado){
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Cita agendada con exito',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.consulta_turnos()
                this.router.navigateByUrl("turnos")
              }else{
                
              }
            },(err)=>{
              Swal.fire('Error','Error de conexión','error');
            });
          });
        }
    }
    agendar10(){
      if(this.id==this.id_p1 || this.id==this.id_p2 || this.id==this.id_p3 || this.id==this.id_p4 || this.id==this.id_p5
        || this.id==this.id_p6 || this.id==this.id_p7 || this.id==this.id_p8 || this.id==this.id_p9 || this.id==this.id_p10){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Ya tiene un turno para la fecha seleccionada',
            showConfirmButton: false,
            timer: 1500
          })
        }else if(this.hoy==this.f){
          if(this.ho10<=this.currentHour){
            Swal.fire('No puede agendar una cita para un horario anterior','','warning')
          }else{
            let body={
              'accion': 'agendar',
              'numero': this.n10,
              'fecha': this.f,
              'hora': this.h10,
              'estado': "no disponible",
              'empleados_id_empleado': this.id_medico,
              'pacientes_id_paciente': this.id
            }
            return new Promise(resolve=>{
              this.servicio.postData(body).subscribe((res:any)=>{
                if(res.estado){
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cita agendada con exito',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.consulta_turnos()
                  this.router.navigateByUrl("turnos")
                }else{
                  
                }
              },(err)=>{
                Swal.fire('Error','Error de conexión','error');
              });
            });
          }
        }else{
          let body={
            'accion': 'agendar',
            'numero': this.n10,
            'fecha': this.f,
            'hora': this.h10,
            'estado': "no disponible",
            'empleados_id_empleado': this.id_medico,
            'pacientes_id_paciente': this.id
          }
          return new Promise(resolve=>{
            this.servicio.postData(body).subscribe((res:any)=>{
              if(res.estado){
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Cita agendada con exito',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.consulta_turnos()
                this.router.navigateByUrl("turnos")
              }else{
                
              }
            },(err)=>{
              Swal.fire('Error','Error de conexión','error');
            });
          });
        }
  }

  calendar(){
    calendar()
    this.nuevo=''
  }
}
