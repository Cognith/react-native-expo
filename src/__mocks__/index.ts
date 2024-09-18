import { Pokemon } from "../types";

const pokemonDetailMock: Pokemon = {
  id: 1,
  formattedId: "0001",
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon-species/1/",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
  types: [{ name: "grass" }, { name: "poison" }],
  stats: [
    { name: "HP", baseStat: 45 },
    { name: "Attack", baseStat: 49 },
    { name: "Defense", baseStat: 49 },
    { name: "Special Attack", baseStat: 65 },
    { name: "Special Defense", baseStat: 65 },
    { name: "Speed", baseStat: 45 },
  ],
};

const pokemonDetailResponseMock = {
  id: 1,
  name: "bulbasaur",
  species: {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon-species/1/",
  },
  sprites: {
    front_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
  },
  stats: [
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: "hp",
        url: "https://pokeapi.co/api/v2/stat/1/",
      },
    },
    {
      base_stat: 49,
      effort: 0,
      stat: {
        name: "attack",
        url: "https://pokeapi.co/api/v2/stat/2/",
      },
    },
    {
      base_stat: 49,
      effort: 0,
      stat: {
        name: "defense",
        url: "https://pokeapi.co/api/v2/stat/3/",
      },
    },
    {
      base_stat: 65,
      effort: 1,
      stat: {
        name: "special-attack",
        url: "https://pokeapi.co/api/v2/stat/4/",
      },
    },
    {
      base_stat: 65,
      effort: 0,
      stat: {
        name: "special-defense",
        url: "https://pokeapi.co/api/v2/stat/5/",
      },
    },
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: "speed",
        url: "https://pokeapi.co/api/v2/stat/6/",
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/",
      },
    },
    {
      slot: 2,
      type: {
        name: "poison",
        url: "https://pokeapi.co/api/v2/type/4/",
      },
    },
  ],
};

const pokemonListMock = [
  {
    id: 1,
    formattedId: "0001",
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon-species/1/",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
    types: [{ name: "grass" }, { name: "poison" }],
    stats: [
      { name: "HP", baseStat: 45 },
      { name: "Attack", baseStat: 49 },
      { name: "Defense", baseStat: 49 },
      { name: "Special Attack", baseStat: 65 },
      { name: "Special Defense", baseStat: 65 },
      { name: "Speed", baseStat: 45 },
    ],
  },
  {
    id: 4,
    formattedId: "0004",
    name: "charmander",
    url: "https://pokeapi.co/api/v2/pokemon-species/4/",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png",
    types: [{ name: "fire" }],
    stats: [
      { name: "HP", baseStat: 39 },
      { name: "Attack", baseStat: 52 },
      { name: "Defense", baseStat: 43 },
      { name: "Special Attack", baseStat: 60 },
      { name: "Special Defense", baseStat: 50 },
      { name: "Speed", baseStat: 65 },
    ],
  },
  {
    id: 7,
    formattedId: "0007",
    name: "squirtle",
    url: "https://pokeapi.co/api/v2/pokemon-species/7/",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/7.png",
    types: [{ name: "water" }],
    stats: [
      { name: "HP", baseStat: 44 },
      { name: "Attack", baseStat: 48 },
      { name: "Defense", baseStat: 65 },
      { name: "Special Attack", baseStat: 50 },
      { name: "Special Defense", baseStat: 64 },
      { name: "Speed", baseStat: 43 },
    ],
  },
];

const pokemonListResponseMock = {
  count: 1302,
  next: "https://pokeapi.co/api/v2/pokemon?offset=undefined&limit=20",
  previous: null,
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
  ],
};

export {
  pokemonDetailMock,
  pokemonDetailResponseMock,
  pokemonListMock,
  pokemonListResponseMock,
};
