import { Component } from '@angular/core';
import { Aviso } from 'src/app/modelo/aviso';
import { IonicModule } from '@ionic/angular';
import { EventEmitter, Input, Output } from '@angular/core';
import { FechaPipe } from 'src/app/pipes/fecha.pipe';
import { AlertController } from '@ionic/angular';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.scss'],
  standalone: true,
  imports: [IonicModule, FechaPipe, NgIf],
})

export class AvisoComponent {
  @Input() aviso!: Aviso;
  @Output() eliminarAvisoEvent = new EventEmitter<number>(); 

  constructor(private alertController: AlertController) {}

  async eliminarAviso() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres eliminar esta publicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarAvisoEvent.emit(this.aviso.id); 
          },
        },
      ],
    });

    await alert.present();
  }
}