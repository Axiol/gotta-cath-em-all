import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemons';

@Component({
  selector: 'list-pokemon',
  templateUrl: './list-pokemon.component.html',
})
export class ListPokemonComponent implements OnInit {
  private pokemons: Pokemon[] = null;
  private title: string = 'Attrapez les tous !';

  constructor(private router: Router) {
     
  }

  ngOnInit() {
    this.pokemons = POKEMONS;
  }

  selectPokemon(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];

    this.router.navigate(link);
  }
}
