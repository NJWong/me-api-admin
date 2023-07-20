import { useQuery } from "@tanstack/vue-query"

export const useGenders = () => {
  return useQuery({
    queryKey: ['genders'],
    queryFn: fetchGenders,
  })
}

const GENDERS_URL = `${import.meta.env.VITE_API_BASE_URL}/genders`

type Gender = {
  id: number
  name: string
}

const fetchGenders = async () => {
  const response = await fetch(GENDERS_URL)
  const data = await response.json() as Gender[]
  return data
}