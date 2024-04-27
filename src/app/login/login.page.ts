import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo = '';
  password = '';
  mostrarSpinner = false;
  mensajeError = '';
  mostrarError = false;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(){}

  ingresar()
  {
    this.mostrarSpinner = true;
    this.auth.login(this.correo, this.password)
      ?.then(response =>
      {
        console.log("redireccionando...");
        this.correo = '';
        this.password = '';
        setTimeout(()=>{
          this.mostrarSpinner = false;
          this.router.navigate(['/inicio']);
        }, 2000);
        
      })
      .catch(error =>
      {
        switch(error.code)
          {
            case 'auth/invalid-email':
              this.mensajeError =  "Correo inválido.";
            break;
            case 'auth/missing-password':
              this.mensajeError = "Contraseña inválida.";
            break;
            case 'auth/invalid-login-credentials':
              this.mensajeError = 'Correo y/o contraseña incorrectos.';
            break;
          }
        
        setTimeout(()=>{
          this.mostrarSpinner = false;
          this.showError();
        }, 2000);
      });
  }

  cambiarUsuario(usuarioElegido: string)
  {
    switch(usuarioElegido)
    {
      case 'admin':
        this.correo = 'admin@admin.com';
        this.password = '111111'; 
      break;
      case 'invitado':
        this.correo = 'invitado@invitado.com';
        this.password = '222222'; 
      break;
      case 'usuario':
        this.correo = 'usuario@usuario.com';
        this.password = '333333'; 
      break;
      case 'tester':
        this.correo = 'tester@tester.com';
        this.password = '555555'; 
      break;
      case 'anonimo':
        this.correo = 'anonimo@anonimo.com';
        this.password = '444444'; 
      break;
    }
  }  
  
  limpiarCampos()
  {
    this.correo = '';
    this.password = '';
  }

  showError()
  {
    this.mostrarError = true;
    
    setTimeout(()=>{
      this.mostrarError = false;
    }, 2500);
  }
}
