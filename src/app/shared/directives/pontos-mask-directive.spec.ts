import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PontosMaskDirective } from './pontos-mask-directive';

@Component({
  template: `<input type="text" [(ngModel)]="value" appPontosMask />`,
})
class TestComponent {
  value = '';
}

describe(PontosMaskDirective.name, () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, PontosMaskDirective],
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
