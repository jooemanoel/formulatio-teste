import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPontosMask]',
  standalone: true,
})
export class PontosMaskDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // mantém apenas números e "-"
    value = value.replace(/[^0-9-]/g, '');

    // garante apenas um "-" no início
    if (value.includes('-')) {
      value = '-' + value.replace(/-/g, '');
    }

    const isNegative = value.startsWith('-');
    let digits = isNegative ? value.substring(1) : value;

    // remove zeros à esquerda
    digits = digits.replace(/^0+/, '');

    // se ficou vazio, só volta a vazio (não força "0")
    if (digits === '') {
      value = isNegative ? '-' : '';
    } else {
      // limita a 3 dígitos
      if (digits.length > 3) {
        digits = digits.substring(0, 3);
      }
      value = isNegative ? '-' + digits : digits;
    }

    this.ngControl.control?.setValue(value, { emitEvent: false });
  }
}
