import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DaysMaskDirective } from '../../shared/directives/days-mask-directive';
import { NumberMaskDirective } from '../../shared/directives/number-mask-directive';

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notZeroValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = parseInt(control.value);
    if (value === 0) {
      return { notZero: true };
    }
    return null;
  };
}

export function minMinus999Validator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = parseInt(control.value);
    if (value < -99) {
      return { min: true };
    }
    return null;
  };
}

export function max999Validator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = parseInt(control.value);
    if (value > 99) {
      return { max: true };
    }
    return null;
  };
}

export function minOneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = parseInt(control.value);
    if (value < 1) {
      return { min: true };
    }
    return null;
  };
}

export function max730Validator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = parseInt(control.value);
    if (value > 730) {
      return { max: true };
    }
    return null;
  };
}

export type FormCriterio = {
  nome: string;
  descricao: string;
  tipoAvaliacao: string;
  pontos: number;
  naturezaRegistro: number;
  tipoAtualizacao: string;
  periodicidade: string;
  dataUltimaDivulgacao: Date;
};

@Component({
  selector: 'app-formulario',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NumberMaskDirective,
    DaysMaskDirective,
  ],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  tema: 'light' | 'dark' = 'dark';

  alternarTema() {
    this.tema = this.tema === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', this.tema);
  }

  formulario = new FormGroup({
    nome: new FormControl('', Validators.required),
    descricao: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
    ]),
    tipoAvaliacao: new FormControl('', Validators.required),
    naturezaRegistro: new FormControl<number | null>(null, Validators.required),
    tipoAtualizacao: new FormControl('', Validators.required),
  });

  pontos = new FormControl('', [
    Validators.required,
    notZeroValidator(),
    minMinus999Validator(),
    max999Validator(),
  ]);

  periodicidade = new FormControl('', [
    Validators.required,
    minOneValidator(),
    max730Validator(),
  ]);

  dataUltimaDivulgacao = new FormControl('');

  tiposAvaliacao = [
    { codigo: 'E', nome: 'Elegibilidade' },
    { codigo: 'P', nome: 'Pontuação' },
  ];
  tiposNatureza = [
    { codigo: 1, nome: 'MCI' },
    { codigo: 2, nome: 'CNAE' },
    { codigo: 3, nome: 'CPF / CNPJ' },
  ];
  tiposAtualizacao = [
    { codigo: 'A', nome: 'Automática' },
    { codigo: 'M', nome: 'Manual' },
  ];

  cancelar() {
    this.formulario.markAllAsTouched();
    console.log(this.formulario.value);
    console.log(this.formulario.invalid);
    console.log(this.formInvalido());
  }

  erroNome() {
    if (!this.formulario.controls.nome.touched) return '';
    if (!this.formulario.controls.nome.value) return 'Campo obrigarório';
    return '';
  }

  erroPontos() {
    return this.pontos.errors
      ? this.pontos.errors['required']
        ? 'Campo obrigarório'
        : this.pontos.errors['notZero']
        ? 'O valor não pode ser zero'
        : this.pontos.errors['min']
        ? 'O valor deve ser maior ou igual a -99'
        : this.pontos.errors['max']
        ? 'O valor deve ser menor ou igual a 99'
        : ''
      : '';
  }

  erroPerodicidade() {
    return this.periodicidade.errors
      ? this.periodicidade.errors['required']
        ? 'Campo obrigatório'
        : this.periodicidade.errors['min']
        ? 'O valor deve ser maior do que zero.'
        : this.periodicidade.errors['max']
        ? 'O valor deve ser menor ou igual a 730'
        : ''
      : '';
  }

  formInvalido() {
    if(this.formulario.invalid) return true;
    if(this.formulario.value.tipoAvaliacao === 'P' && this.pontos.invalid) return true;
    if(this.formulario.value.tipoAtualizacao === 'M' && this.periodicidade.invalid) return true;
    // if(this.formulario.value.tipoAtualizacao === 'M' && this.dataUltimaDivulgacao.invalid) return true;
    return false;
  }
}
