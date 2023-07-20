import { useQuery } from "@tanstack/vue-query"

export const useCharacters = () => {
  return useQuery({
    queryKey: ['characters'],
    queryFn: fetchCharacters,
  })
}

const CHARACTERS_URL = `${import.meta.env.VITE_API_BASE_URL}/characters`

const fetchCharacters = async () => {
  const response = await fetch(CHARACTERS_URL)
  const data = await response.json()
  return data
}