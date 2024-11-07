import axios from "axios";
import { useEffect, useState } from "react";

interface IPokemonData {
  name: string;
  url: string;
  image: string;
}

interface IPokemonDetails {
  form_name: string;
  form_names: string[];
  form_order: number;
  id: number;
  is_battle_only: boolean;
  is_default: boolean;
  is_mega: boolean;
  name: string;
  names: string[];
  order: number;
  pokemon: Pokemon;
  sprites: Sprites;
  types: Type[];
  version_group: VersionGroup;
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface Type {
  slot: number;
  type: Type2;
}

export interface Type2 {
  name: string;
  url: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}

export const Home = () => {
  const [dataPokemon, setDataPokemon] = useState<IPokemonData[]>([]);
  const [listFiltered, setListFiltered] = useState<IPokemonData[]>([]);



  const handleSearchPokemon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const filterPokemon = dataPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setListFiltered(filterPokemon);
  };

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then(async (response) => {
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon: IPokemonData) => {
            const pokemonDetails = await axios.get<IPokemonDetails>(pokemon.url);
            return {
              name: pokemon.name,
              url: pokemon.url,
              image: pokemonDetails.data.sprites.front_default,
            };
          })
        );
        setDataPokemon(pokemonData);
        setListFiltered(pokemonData);
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  return (
    <div className="bg-slate-800 ">
      <div className="flex items-center justify-center p-4 flex-col ">
        <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="PokeAPI" className="w-20 h-16 ml-4" />
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Pesquisar Pokemon"
            className="border border-gray-300 rounded-md p-2 w-full pl-10"
            onChange={handleSearchPokemon}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {listFiltered.map((pokemon) => (
          <div key={pokemon.name} className="bg-white rounded-lg shadow-xl p-4 text-center cursor-pointer hover:scale-105 transition-all">
            <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 mx-auto" />
            <h2 className="text-lg font-semibold mt-2 capitalize">{pokemon.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
