import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  tema: 'light' | 'dark' = 'dark';
  
    alternarTema() {
      this.tema = this.tema === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-bs-theme', this.tema);
    }
}
