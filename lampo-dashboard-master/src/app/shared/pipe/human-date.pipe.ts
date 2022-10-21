import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanDate'
})
export class HumanDatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
