import ApiResponsePagination from "../interfaces/api/ApiResponse";
import IPokemon from "../interfaces/IPokemon";
import { IPokemonDetailResponse, IPokemonResponse, IPokemonSpeciesResponse } from "../interfaces/services/pokemonServices";
import fetchAdaptor from "../utils/fetchAdaptor";

const PokemonServices = {
   getPokemons: async (offset: number = 0, limit: number = 20) : Promise<ApiResponsePagination<IPokemonResponse[]>> => {
      try {
         const data = await fetchAdaptor.get<ApiResponsePagination<IPokemonResponse[]>>(`pokemon?limit=${limit}&offset=${offset}`);  
         return data;
      }catch(err) {
         console.log("getPokemons error", err);
         throw err;
      }
   },
   getPokemonDetail: async (pokemonId: number | string) : Promise<IPokemon>  => {
      let speciesData;
      try {
         const data = await fetchAdaptor.get<IPokemonDetailResponse>(`pokemon/${pokemonId}`);  
         try {
            speciesData = await fetchAdaptor.get<IPokemonSpeciesResponse>(`pokemon-species/${pokemonId}`) 
         }catch{}
       
         return{
            id: data.id,
            pokemonId: `#${data.id.toString().padStart(4, '0')}`,
            image: data.sprites.front_shiny,
            types: data.types.map((type) => type.type.name),
            name: data.name,
            weight: data.weight,
            height: data.height,
            stats: data.stats.map(stat => ({
                label: stat.stat.name.replace('-', ' '), 
                value: stat.base_stat
            })),
            abilities: data.abilities.map(ability => ability.ability.name),
            color: speciesData?.color.name,
            flavorText: speciesData?.flavor_text_entries?.[0]?.flavor_text,
            generationName: speciesData?.generation.name,
            generationUrl: speciesData?.generation.url,
            category: speciesData?.genera.find(cat => cat.language.name === 'en')?.genus
         };
      }catch(err) {
         console.log("getPokemonDetail error", err);
         throw err;
      }
   },
}

export default PokemonServices