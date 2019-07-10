import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemons';

@Injectable()
export class PokemonsService {
  constructor(private http:HttpClient) { }

  private pokemonsUrl = 'api/pokemons';

  private log(log:string) {
    console.info(log);
  }

  private handleError<T>(operation='operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put(this.pokemonsUrl, pokemon, httpOptions).pipe(
      tap(_ => this.log(`Updated Pokemon ${pokemon.id}`)),
      catchError(this.handleError<any>('updatedPokemon'))
    );
  }

  // Retourne tous les pokémons
  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
      tap(_ => this.log('Fetched Pokemons')),
      catchError(this.handleError('getPokemons', []))
    );
  }
  
  // Retourne le pokémon avec l'identifiant passé en paramètre
  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${id}`;
  
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`Fetched Pokemon ${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon ${id}`))
    );
  }

  getPokemonTypes(): string[] {
    return ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol'];
  }
}