import { Request, Response } from 'express'
import axios, { AxiosError } from 'axios'
const { SHELTER_API_HOST, SHELTER_API_AUTH_TOKEN } = process.env

const getAllShelters = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${SHELTER_API_HOST}/abrigos`, { 
      headers: {
        Authorization: SHELTER_API_AUTH_TOKEN
      }
    })

    const shelters = response.data

    return res.status(200).json({ data: shelters })
  } catch (error: any) {
    const err = error as AxiosError
    console.error('Error fetching data from the external API:', err)
    return res.status(500).json({ err })
  }
}

const getShelter = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const response = await axios.get(`${SHELTER_API_HOST}/abrigo/${id}`, { 
      headers: {
        Authorization: SHELTER_API_AUTH_TOKEN
      }
    })

    const shelterResponse = response.data

    const shelter = {
      address: shelterResponse.address,
      phone: typeof shelterResponse.telefone === 'object' ? shelterResponse.telefone[0] : shelterResponse.telefone,
      name: shelterResponse.nome,
      needs: shelterResponse.demanda,
      vacancy: parseInt(shelterResponse.vagas) - parseInt(shelterResponse.vagas_ocupadas)
    }

    return res.status(200).json({ data: shelter })
  } catch (error: any) {
    const err = error as AxiosError
    console.error('Error fetching data from the external API:', err)
    return res.status(500).json({ err })
  }
}

export { getAllShelters, getShelter }
