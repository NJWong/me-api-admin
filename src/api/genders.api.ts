import { useMutation, useQuery } from "@tanstack/vue-query"

const GENDERS_URL = `${import.meta.env.VITE_API_BASE_URL}/genders`

type Gender = {
  id: number
  name: string
}

export const useGenders = () => {
  return useQuery({
    queryKey: ['genders'],
    queryFn: fetchGenders,
  })
}


const fetchGenders = async () => {
  const response = await fetch(GENDERS_URL)
  const data = await response.json() as Gender[]
  return data
}

export const useCreateGender = () => {
  return useMutation({
    mutationFn: (variables: { name: string, token: string, callback: Function }) => createGender(variables.name, variables.token),
    onSuccess: (_, variables) => {
      variables.callback()
    }
  })
}

const createGender = async (name: string, token: string) => {
  const response = await fetch(GENDERS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  })
  const data = await response.json() as Gender
  return data
}

export const useUpdateGender = () => {
  return useMutation({
    mutationFn: (variables: { id: number, name: string, token: string, callback: Function }) => updateGender(variables.id, variables.name, variables.token),
    onSuccess: (_, variables) => {
      variables.callback()
    }
  })
}

const updateGender = async (id: number, name: string, token: string) => {
  const response = await fetch(`${GENDERS_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  })
  const data = await response.json() as Gender
  return data
}

export const useDeleteGender = () => {
  return useMutation({
    mutationFn: (variables: { id: number, token: string, callback: Function }) => deleteGender(variables.id, variables.token),
    onSuccess: (_, variables) => {
      variables.callback()
    }
  })
}

const deleteGender = async (id: number, token: string) => {
  const response = await fetch(`${GENDERS_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await response.json()
  return data
}