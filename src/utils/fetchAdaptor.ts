
const baseUrl = 'https://pokeapi.co/api/v2/';
const fetchAdaptor = {
   get: async <T>(endpoint: string) => {
      const data = await fetch(baseUrl + endpoint);
      const response = await data.json();
      return response as T;
   }
}

export default fetchAdaptor;