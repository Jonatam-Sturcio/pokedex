import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss',
})
export class BuscaComponent {
  @Output() pesquisaFeita: EventEmitter<string>;
  @Output() limpezaFiltro: EventEmitter<void>;

  public buscaRealizada: boolean;
  public textoDigitado: string = '';

  constructor() {
    this.pesquisaFeita = new EventEmitter();
    this.limpezaFiltro = new EventEmitter();

    this.buscaRealizada = false;
  }

  onBuscar(texto: string): void {
    this.buscaRealizada = true;
    this.pesquisaFeita.emit(texto);
  }

  onLimpar(): void {
    this.buscaRealizada = false;
    this.textoDigitado = '';
    this.limpezaFiltro.emit();
  }
}
