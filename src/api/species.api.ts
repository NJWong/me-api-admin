import { useMutation, useQuery } from "@tanstack/vue-query"

const SPECIES_URL = `${import.meta.env.VITE_API_BASE_URL}/species`

type Species = {
  id: number
  name: string
}

export const useSpecies = () => {
  return useQuery({
    queryKey: ['species'],
    queryFn: fetchSpecies,
  })
}

const fetchSpecies = async () => {
  const response = await fetch(SPECIES_URL)
  const data = await response.json() as Species[]
  return data
}

export const useSpeciesById = (id: number) => {
  return useQuery({
    queryKey: ['species', id],
    queryFn: () => fetchSpeciesById(id),
  })
}

const fetchSpeciesById = async (id: number) => {
  const response = await fetch(`${SPECIES_URL}/${id}`)
  const data = await response.json() as Species
  return data
}

export const useCreateSpecies = () => {
  return useMutation({
    mutationFn: (variables: { name: string, token: string, callback: Function }) => createSpecies(variables.name, variables.token),
    onSuccess: (_, variables) => {
      variables.callback()
    }
  })
}

const createSpecies = async (name: string, token: string) => {
  const response = await fetch(SPECIES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  })
  const data = await response.json() as Species
  return data
}

export const useUpdateSpecies = () => {
  return useMutation({
    mutationFn: (variables: { id: number, name: string, token: string, callback: Function }) => updateSpecies(variables.id, variables.name, variables.token),
    onSuccess: (_, variables) => {
      variables.callback()
    }
  })
}

const updateSpecies = async (id: number, name: string, token: string) => {
  const response = await fetch(`${SPECIES_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  })
  const data = await response.json() as Species
  return data
}

export const useDeleteSpecies = () => {
  return useMutation({
    mutationFn: (variables: { id: number, token: string, callback: Function }) => deleteSpecies(variables.id, variables.token),
    onSuccess: (_, variables) => {
      variables.callback()
    }
  })
}

const deleteSpecies = async (id: number, token: string) => {
  const response = await fetch(`${SPECIES_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await response.json() as Species
  return data
}