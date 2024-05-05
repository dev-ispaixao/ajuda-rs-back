import { Request, Response } from 'express';
import axios, { Axios, AxiosError } from 'axios';
import { Shelter } from 'src/types';
const { SHELTER_API_HOST } = process.env

const getAllShelters = async (req: Request, res: Response) => {
  //Apenas simução pois ainda não temos a api de consulta
  try {
    const response = await axios.get(`${SHELTER_API_HOST}/abrigos`);

    const shelters = response.data;

    return res.status(200).json({ data: shelters });
  } catch (error: any) {
    const err = error as AxiosError
    console.error('Error fetching data from the external API:', err);
    return res.status(500).json({ err });
  }
};

export { getAllShelters };
