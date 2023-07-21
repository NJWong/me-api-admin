import { useMutation, useQuery } from "@tanstack/vue-query"

const CHARACTERS_URL = `${import.meta.env.VITE_API_BASE_URL}/characters`

export const useCharacters = () => {
  return useQuery({
    queryKey: ['characters'],
    queryFn: fetchCharacters,
  })
}

const fetchCharacters = async () => {
  const response = await fetch(CHARACTERS_URL)
  const data = await response.json()
  return data
}

type CharacterData = {
  name: string
  species: number
  gender: number
  class: string
}

export const useCreateCharacter = () => {
  return useMutation({
    mutationFn: (variables: { data: CharacterData, token: string, callback: Function }) => createCharacter(variables.data, variables.token),
    onSuccess: (_, variables) => {
      variables.callback()
    }
  })
}

const createCharacter = async (data: CharacterData, token: string) => {
  const response = await fetch(CHARACTERS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  const responseData = await response.json()
  return responseData
}

export const useDeleteCharacter = () => {
  return useMutation({
    mutationFn: (variables: { id: number, token: string, callback: Function }) => deleteCharacter(variables.id, variables.token),
    onSuccess: (_, variables) => {
      variables.callback()
    }
  })
}

const deleteCharacter = async (id: number, token: string) => {
  const response = await fetch(`${CHARACTERS_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const responseData = await response.json()
  return responseData
}