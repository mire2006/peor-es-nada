import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha',
  standalone: true
})
export class FechaPipe implements PipeTransform {

  transform(value: Date): string {
    if (value) {
      const dia = value.getDate().toString().padStart(2, '0');
      const mes = (value.getMonth() + 1).toString().padStart(2, '0');
      const anio = value.getFullYear();
      return `${dia}/${mes}/${anio}`;
    }
    return '';
  }
}
