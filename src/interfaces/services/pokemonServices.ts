
export interface IPokemonResponse {
   name: string;
   url: string; //detail url
}

export interface IPokemonDetailResponse {
   id: number;
   name: string;
   types: {
      slot: number,
      type: {
         name: string
      }
   }[],
   sprites: {
      front_default: string,
      front_shiny: string
   },
   stats: {
      base_stat: number,
      stat: {
         name: string
      }
   }[],
   weight: number;
   height: number;
   abilities: {
      ability: {
         name: string,
      }
   }[]
}

export interface IPokemonSpeciesResponse {
   color: {
      name: string
   },
   flavor_text_entries:{
      flavor_text: string
   }[],
   generation: {
      name: string,
      url: string
   },
   genera: {
      genus: string,
      language: {
         name: string,
         url: string
      }
   }[]
}