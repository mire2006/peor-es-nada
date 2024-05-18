import { Injectable } from '@angular/core';
import { Aviso } from '../modelo/aviso';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})

export class AvisosService {
  private avisosKey = 'mis_avisos';
  private nextId = 1; 

  constructor() {
    this.cargarNextId(); 
  }

  private async cargarNextId() {
    const idGuardado = await Preferences.get({ key: 'nextId' });
    this.nextId = idGuardado.value ? parseInt(idGuardado.value, 10) + 1 : 1;
  }

  async getAvisos(): Promise<Aviso[]> {
    const avisosJson = await Preferences.get({ key: this.avisosKey });
    const avisos: Aviso[] = avisosJson.value ? JSON.parse(avisosJson.value) : [];
    return avisos.map(aviso => ({
      ...aviso,
      fecha: new Date(aviso.fecha) 
    }));
  }

  async agregarAviso(aviso: Aviso): Promise<void> {
    const avisos = await this.getAvisos();
    avisos.push({ ...aviso, id: this.nextId++ }); 
    await Preferences.set({ key: this.avisosKey, value: JSON.stringify(avisos) });
    await Preferences.set({ key: 'nextId', value: this.nextId.toString() }); 
  }

  async eliminarAviso(id: number): Promise<void> { 
    let avisos = await this.getAvisos();
    avisos = avisos.filter(a => a.id !== id); 
    await Preferences.set({ key: this.avisosKey, value: JSON.stringify(avisos) });
  }
}
