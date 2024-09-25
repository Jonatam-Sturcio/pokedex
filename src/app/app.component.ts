import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokemonApiService } from './services/pokemon-api.service';
import { Pokemon } from './models/pokemon';
import { NgClass, NgForOf } from '@angular/common';
import { converterParaTitleCase } from './util/converter-para-title-case';
import { TipoPokemon } from './models/tipo-pokemon';
import { ListagemComponent } from './components/listagem/listagem.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
