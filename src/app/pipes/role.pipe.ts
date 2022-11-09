import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../models/user';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: string | Role): string {
    switch(value)
    {
      case Role.admin: return "Administrator";
      case Role.lehrer: return "Fachlehrer";
      case Role.betreuer: return "Raumbetreuer";
      case Role.werkstatt: return "PC-Werkstatt";
      default: return "Unbekannt";
    }
  }

}
