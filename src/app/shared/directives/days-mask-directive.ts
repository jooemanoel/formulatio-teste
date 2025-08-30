import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDaysMask]',
  standalone: true,
})
export class DaysMaskDirective {
  private suffix = ' dias';

  constructor(
    private ngControl: NgControl,
    private el: ElementRef<HTMLInputElement>
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement;
    let value = input.value.replace(/\D/g, ''); // remove tudo que não for número

    // limita a 3 dígitos
    if (value.length > 3) {
      value = value.slice(0, 3);
    }

    // remove zeros à esquerda
    value = value.replace(/^0+/, '');

    // atualiza o FormControl com o valor puro
    this.ngControl.control?.setValue(value, { emitEvent: false });

    // guarda posição do cursor
    const cursorPos = input.selectionStart ?? 0;

    // monta valor com sufixo
    const displayValue = value ? `${value}${this.suffix}` : '';
    input.value = displayValue;

    // calcula posição correta do cursor
    const newCursorPos = Math.min(cursorPos, value.length);
    input.setSelectionRange(newCursorPos, newCursorPos);
  }

  @HostListener('blur')
  onBlur() {
    const input = this.el.nativeElement;
    const value = input.value.replace(/\D/g, '').replace(/^0+/, '');
    input.value = value ? `${value}${this.suffix}` : '';
  }
}
