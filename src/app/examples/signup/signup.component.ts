import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AccesoService } from '../../servicios/acceso.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    p_nombre:any
    p_apellido:any
    p_nombre2:any
    p_apellido2:any
    cedula:any
    cedula2:any
    clave:any
    clave2:any
    usuarios:any
    id:any=0
    celular:any
    constructor(
        private servicio:AccesoService,
        private router:Router
    ) { }

    ngOnInit() {
        this.id=localStorage.getItem('id')
        if(this.id==0){

          }else{
            this.router.navigateByUrl("inicio")
          }
        document.getElementById('registro').style.display = 'none';
        document.getElementById('recuperacion').style.display = 'none';
    }

    public validador;
    validadorDeCedula(cedula: String) {
      if(this.cedula=='0000000000'||this.cedula=='2222222222'||this.cedula=='4444444444'||this.cedula=='5555555555'){
        Swal.fire('Cédula inválida','','warning')
        this.cedula=''
      }else{
        let cedulaCorrecta = false;
        if (cedula.length == 10)
        {
          let tercerDigito = parseInt(cedula.substring(2, 3));
          if (tercerDigito < 6) {
              // El ultimo digito se lo considera dígito verificador
              let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
              let verificador = parseInt(cedula.substring(9, 10));
              let suma:number = 0;
              let digito:number = 0;
              for (let i = 0; i < (cedula.length - 1); i++) {
                  digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];
                  suma += ((parseInt((digito % 10)+'') + (parseInt((digito / 10)+''))));
            //      console.log(suma+" suma"+coefValCedula[i]);
              }
              suma= Math.round(suma);
            //  console.log(verificador);
            //  console.log(suma);
            //  console.log(digito);
              if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10)== verificador)) {
                  cedulaCorrecta = true;
              } else if ((10 - (Math.round(suma % 10))) == verificador) {
                  cedulaCorrecta = true;
              } else {
                  cedulaCorrecta = false;
                  Swal.fire('Cédula inválida','','warning')
                  this.cedula=''
              }
            } else {
              cedulaCorrecta = false;
              Swal.fire('Cédula inválida','','warning')
              this.cedula=''
            }
        } else {
              cedulaCorrecta = false;
              Swal.fire('Cédula inválida','','warning')
              this.cedula=''
        }
        this.validador= cedulaCorrecta;
      }
    }

    recuperacion(){
      document.getElementById('registro').style.display = 'none';
      document.getElementById('recuperacion').style.display = 'block';
      document.getElementById('login').style.display = 'none';
    }

    registro(){
        document.getElementById('recuperacion').style.display = 'none';
        document.getElementById('registro').style.display = 'block';
        document.getElementById('login').style.display = 'none';
    }

    atras(){
      document.getElementById('recuperacion').style.display = 'none';
      document.getElementById('registro').style.display = 'none';
      document.getElementById('login').style.display = 'block';
      this.p_nombre=""
      this.p_apellido=""
      this.cedula=""
      this.clave=""
    }

    recuperar(){
      if(this.p_nombre==null||this.p_apellido==null||this.cedula==null){
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        let body={
          'accion': 'consulta_recuperacion_clave',
          'cedula': this.cedula,
          'p_nombre': this.p_nombre,
          'p_apellido': this.p_apellido
        }
        
        return new Promise(resolve=>{
          this.servicio.postData(body).subscribe((res:any)=>{
            if(res.estado){
              let body={
                'accion': 'actualizar_contraseña',
                'clave': '12345',
                'cedula': this.cedula
              }
              
              return new Promise(resolve=>{
                this.servicio.postData(body).subscribe((res:any)=>{
                  if(res.estado){
                    Swal.fire({
                      position: 'top',
                      icon: 'success',
                      title: 'su nueva contraseña es "12345"',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    document.getElementById('recuperacion').style.display = 'none';
                    document.getElementById('registro').style.display = 'none';
                    document.getElementById('login').style.display = 'block';
                    this.p_nombre=""
                    this.p_apellido=""
                    this.cedula=""
                    this.clave=""
                  }else{
                    Swal.fire('Error','No se pudo recuperar la contraseña','warning');
                  }
                },(err)=>{
                  Swal.fire('Error','Error de conexión','error');
                });
              });
            }else{
              Swal.fire('Error','Paciente no encontrado','warning');
            }
          },(err)=>{
            Swal.fire('Error','Error de conexión','error');
          });
        });
      }
    }

    registro_pacientes(){
      if(this.p_nombre==null||this.p_apellido==null||this.cedula==null||this.clave==null){
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        let body={
          'accion': 'consulta_pacientes_cedula',
          'cedula': this.cedula
        }
        
        return new Promise(resolve=>{
          this.servicio.postData(body).subscribe((res:any)=>{
            if(res.estado){
              Swal.fire({
                position: 'top',
                icon: 'warning',
                title: 'Paciente ya existe',
                showConfirmButton: false,
                timer: 1500
              })
            }else{
              if(this.validador==true){
                let body={
                  'accion': 'registro_pacientes',
                  'p_nombre': this.p_nombre,
                  'p_apellido': this.p_apellido,
                  'cedula': this.cedula,
                  'celular': this.celular,
                  'clave': this.clave
                }
                
                return new Promise(resolve=>{
                  this.servicio.postData(body).subscribe((res:any)=>{
                    if(res.estado){
                      let body={
                        'accion': 'consulta_ultimo_paciente'
                      }
                      
                      return new Promise(resolve=>{
                        this.servicio.postData(body).subscribe((res:any)=>{
                          if(res.estado){
                            this.usuarios=res.datos;
                            this.id=this.usuarios[0].id_paciente
                            let body={
                              'accion': 'registro_pacientes_historia',
                              'pacientes_id_paciente': this.id
                            }
                            
                            return new Promise(resolve=>{
                              this.servicio.postData(body).subscribe((res:any)=>{
                                if(res.estado){
                                  Swal.fire({
                                    position: 'top',
                                    icon: 'success',
                                    title: 'Paciente Registrado con exito',
                                    showConfirmButton: false,
                                    timer: 1500
                                  })
                                    document.getElementById('registro').style.display = 'none';
                                    document.getElementById('login').style.display = 'block';
                                    this.p_nombre=""
                                    this.p_apellido=""
                                    this.cedula=""
                                    this.celular=""
                                    this.clave=""
                                }else{
                                  Swal.fire('Error','No se pudo recuperar la contraseña','warning');
                                }
                              },(err)=>{
                                Swal.fire('Error','Error de conexión','error');
                              });
                            });
                          }else{
                          }
                        },(err)=>{
                          Swal.fire('Error','Error de conexión','error');
                        });
                      });
                    }else{
                      
                    }
                  },(err)=>{
                    Swal.fire('Error','Error de conexión','error');
                  });
                });
              }
              
            }
          },(err)=>{
            Swal.fire('Error','Error de conexión','error');
          });
        });
      }
      }

      ingresar(){
        if(this.cedula2==null){
          Swal.fire('','Ingrese la cédula','warning');
        }else if(this.clave2==null){
          Swal.fire('','Ingrese la clave','warning');
        }else{
          let body={
            'accion': 'login_pacientes',
            'cedula': this.cedula2,
            'clave' : this.clave2        
          }
          return new Promise(resolve=>{
            this.servicio.postData(body).subscribe((res:any)=>{
              if(res.estado){
                this.usuarios=res.datos;
                localStorage.setItem('id', this.usuarios[0].id_paciente)
                this.p_nombre2=this.usuarios[0].p_nombre;
                this.p_apellido2=this.usuarios[0].p_apellido;
                Swal.fire({
                  position: 'top',
                  icon: 'success',
                  title: 'Bienvenido '+this.p_nombre2+' '+this.p_apellido2,
                  showConfirmButton: false,
                  timer: 1500
                })
                this.router.navigateByUrl("inicio")
              }else{       
                Swal.fire('Error','Datos incorrectos','warning');
              }
            },(err)=>{
              Swal.fire('Error','Error de conexión','error');
            });
          });
        }
      }
}
