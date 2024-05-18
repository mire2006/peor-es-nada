import { Component } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonRouterOutlet],
})

export class AppComponent {
  public appPages = [
    { title: 'Publicaciones', url: '/home', icon: 'newspaper' },
    { title: 'Crear Publicación', url: '/crear-aviso', icon: 'add-circle' },
  ];

  constructor() {}
}
