import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AvisosService } from 'src/app/servicios/avisos.service';
import { Aviso } from 'src/app/modelo/aviso';
import { ModalController } from '@ionic/angular/standalone';
import { FormularioAvisoComponent } from 'src/app/componentes/formulario-aviso/formulario-aviso.component';

@Component({
  selector: 'app-crear-aviso',
  templateUrl: './crear-aviso.page.html',
  styleUrls: ['./crear-aviso.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormularioAvisoComponent],
})

export class CrearAvisoPage {

  constructor(private avisosService: AvisosService, private modalController: ModalController) {}
  
    crearAviso(nuevoAviso: Aviso) {
      this.avisosService.agregarAviso(nuevoAviso);
      this.modalController.dismiss(nuevoAviso); 
  }
  cerrarModal() {
    this.modalController.dismiss();
  }
}
