import { Component, effect, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

/** Entidade */
export class Compra {
  constructor(readonly descricao = '', readonly valor = 0) {}
}

/** Aggregate Root */
export class ListaCompras {
  constructor(
    public compras: Compra[] = [],
    readonly dono: string = '',
    readonly criadoEm: Date = new Date()
  ) {}
  adicionar(compra: Compra): ListaCompras {
    // retorna nova instância (immutabilidade) → garante atualização no signal
    return new ListaCompras(
      [...this.compras, compra],
      this.dono,
      this.criadoEm
    );
  }

  adicionar2(compra: Compra): ListaCompras {
    this.compras = this.compras.concat(compra);
    return this;
  }

  total(): number {
    return this.compras.reduce((soma, c) => soma + c.valor, 0);
  }
}

@Component({
  selector: 'app-teste',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './teste.html',
  styleUrl: './teste.css',
})
export class Teste {
  compras = signal(new ListaCompras([], 'João'));
  compras2 = signal(new ListaCompras([], 'João'));
  teste = signal({ teste: 1 });
  efeito = effect(() => {
    console.log(this.compras());
  });
  efeito2 = effect(() => {
    console.log(this.compras2());
  });
  efeitoTeste = effect(() => {
    console.log(this.teste());
  });
  adicionar(descricao: string, valor: number) {
    this.compras.set(this.compras().adicionar(new Compra(descricao, valor)));
    this.compras2.set(this.compras2().adicionar(new Compra(descricao, valor)));
    this.teste.set({ teste: 1 });
  }
  testar() {
    this.adicionar('qwer', 1);
  }
}
