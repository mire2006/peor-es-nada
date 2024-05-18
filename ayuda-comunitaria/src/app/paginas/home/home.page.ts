import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AvisosService } from 'src/app/servicios/avisos.service';
import { Aviso } from 'src/app/modelo/aviso';
import { FechaPipe } from 'src/app/pipes/fecha.pipe';
import { NgFor, NgIf } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';
import { CrearAvisoPage } from '../crear-aviso/crear-aviso.page';
import { AvisoComponent } from 'src/app/componentes/aviso/aviso.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FechaPipe, NgFor, NgIf, AvisoComponent, CrearAvisoPage],

})

export class HomePage implements OnInit {
  avisos: Aviso[] = [];

  constructor(private avisosService: AvisosService, private modalController: ModalController) {}

  ngOnInit() {
    this.avisos = []; 
    this.cargarAvisos();
  }

  async cargarAvisos() {
    this.avisos = await this.avisosService.getAvisos();
  }

  async eliminarAviso(id: number) {
    await this.avisosService.eliminarAviso(id);
    this.cargarAvisos();
  }

  async abrirModalCrearAviso() {
    const modal = await this.modalController.create({
      component: CrearAvisoPage,
    });
    modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.cargarAvisos(); 
    }
  }
}