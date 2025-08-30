import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberMask]',
  standalone: true,
})
export class NumberMaskDirective {
  constructor(private ngControl: NgControl) {}
  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    value = value.replace(/[^0-9-]/g, '');
    if (value.includes('-')) {
      value = '-' + value.replace(/-/g, '');
    }
    const isNegative = value.startsWith('-');
    const digits = isNegative ? value.substring(1) : value;
    if (digits.length > 3) {
      value = isNegative
        ? '-' + digits.substring(0, 3)
        : digits.substring(0, 3);
    }
    this.ngControl.control?.setValue(value, { emitEvent: false });
  }
}
