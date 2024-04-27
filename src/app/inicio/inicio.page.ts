import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  mostrarSpinner = false;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  irHacia(ruta: string)
  {
    this.mostrarSpinner = true;
    setTimeout(()=>{
      this.mostrarSpinner = false;
      this.router.navigate([ruta]);
    }, 2000)
  }

  cerrarSesion()
  {
    this.mostrarSpinner = true;

    this.auth.logout()?.then(()=>{
      setTimeout(()=>{
        this.mostrarSpinner = false;
        this.router.navigate(['/login']);
      }, 2000)
    });
  }
}
