import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

/** Entidade */
export class Compra {
  constructor(readonly descricao = '', readonly valor = 0) {}
}

/** Aggregate Root */
export class ListaCompras {
  constructor(
    readonly compras: Compra[] = [],
    readonly dono: string = '',
    readonly criadoEm: Date = new Date()
  ) {}

  adicionar(compra: Compra): ListaCompras {
    // regra de negócio: não permitir compras duplicadas
    if (this.compras.some((c) => c.descricao === compra.descricao)) {
      throw new Error(`Compra "${compra.descricao}" já existe na lista.`);
    }

    // retorna nova instância (immutabilidade) → garante atualização no signal
    return new ListaCompras(
      [...this.compras, compra],
      this.dono,
      this.criadoEm
    );
  }

  total(): number {
    return this.compras.reduce((soma, c) => soma + c.valor, 0);
  }
}

@Component({
  selector: 'app-teste',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './teste.html',
  styleUrl: './teste.css',
})
export class Teste {
  compras = signal(new ListaCompras([], 'João'));

  adicionar(descricao: string, valor: number) {
    try {
      this.compras.set(this.compras().adicionar(new Compra(descricao, valor)));
    } catch (e) {
      console.error(e);
      // Aqui poderia ser exibida uma notificação no UI
    }
  }
}
