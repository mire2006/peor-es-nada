import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { EventEmitter, Output } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Aviso } from 'src/app/modelo/aviso';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-formulario-aviso',
  templateUrl: './formulario-aviso.component.html',
  styleUrls: ['./formulario-aviso.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})

export class FormularioAvisoComponent {
  @Output() avisoCreado = new EventEmitter<Aviso>();

  nuevoAviso: Aviso = {
    id: 0, 
    titulo: '',
    descripcion: '',
    fecha: new Date(),
  };

  constructor(private alertController: AlertController) {}

  async crearAviso() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres crear esta publicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Crear',
          handler: () => {
            this.avisoCreado.emit(this.nuevoAviso);
            this.nuevoAviso = {
              id: 0,
              titulo: '',
              descripcion: '',
              fecha: new Date(),
            };
          },
        },
      ],
    });

    await alert.present();
  }
   
  async capturarImagen() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });

    if (image) {
      this.nuevoAviso.imagen = image.webPath;
    }
  }
}
