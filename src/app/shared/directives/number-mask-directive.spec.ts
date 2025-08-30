import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NumberMaskDirective } from './number-mask-directive';

@Component({
  template: `<input type="text" [(ngModel)]="value" appNumberMask />`,
})
class TestComponent {
  value = '';
}

describe('NumberMaskDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NumberMaskDirective],
      declarations: [TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should transform invalid input', () => {
    const input = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    input.value = '12-34a';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBe('123');
  });
});
