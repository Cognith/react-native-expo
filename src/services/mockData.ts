export const getPokemonsTestData = {
  "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    },
    {
      "name": "venusaur",
      "url": "https://pokeapi.co/api/v2/pokemon/3/"
    },
    {
      "name": "charmander",
      "url": "https://pokeapi.co/api/v2/pokemon/4/"
    },
    {
      "name": "charmeleon",
      "url": "https://pokeapi.co/api/v2/pokemon/5/"
    },
    {
      "name": "charizard",
      "url": "https://pokeapi.co/api/v2/pokemon/6/"
    },
    {
      "name": "squirtle",
      "url": "https://pokeapi.co/api/v2/pokemon/7/"
    },
    {
      "name": "wartortle",
      "url": "https://pokeapi.co/api/v2/pokemon/8/"
    },
    {
      "name": "blastoise",
      "url": "https://pokeapi.co/api/v2/pokemon/9/"
    },
  ]
}

export const getPokemonDetailTestData =  {
   id: 1,
   pokemonId: '#0001',
   image: 'https://example.com/images/front_shiny.png', 
   types: ['fire', 'flying'], 
   name: 'Charmander',
   weight: 8.5, 
   height: 0.6, 
   stats: [
      { label: 'hp', value: 39 },
      { label: 'attack', value: 52 },
      { label: 'defense', value: 43 },
      { label: 'special-attack', value: 60 },
      { label: 'special-defense', value: 50 },
      { label: 'speed', value: 65 }
   ],
   abilities: ['blaze', 'solar-power'], 
   color: 'red', 
   flavorText: 'Charmander’s flame can be used to cook meat to make it tender.',
   generationName: 'generation-i', 
   generationUrl: 'https://example.com/generation-i', 
   category: 'lizard'
};

export const testData = (id = 1) => ( {
   id: id,
   pokemonId: '#0001',
   image: 'https://example.com/images/front_shiny.png', 
   types: ['fire', 'flying'], 
   name: 'Charmander',
   weight: 8.5, 
   height: 0.6, 
   stats: [
      { label: 'hp', value: 39 },
      { label: 'attack', value: 52 },
      { label: 'defense', value: 43 },
      { label: 'special-attack', value: 60 },
      { label: 'special-defense', value: 50 },
      { label: 'speed', value: 65 }
   ],
   abilities: ['blaze', 'solar-power'], 
   color: 'red', 
   flavorText: 'Charmander’s flame can be used to cook meat to make it tender.',
   generationName: 'generation-i', 
   generationUrl: 'https://example.com/generation-i', 
   category: 'lizard'
});