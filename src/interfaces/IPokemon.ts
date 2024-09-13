interface IPokemon {
   id: number;
   pokemonId: string;
   image: string;
   types: string[];
   name: string;
   weight: number;
   height: number;
   stats: {
      label: string;
      value: number;
   }[],
   color?: string;
   flavorText?: string;
   generationName?: string,
   generationUrl?: string,
   category?: string;
   abilities?: string[]

}

export default IPokemon;