import { Request, Response } from 'express';
import axios from 'axios';
import { Shelter } from 'src/types';

const getAllShelters = async (req: Request, res: Response) => {
  //Apenas simução pois ainda não temos a api de consulta
  try {
    const response = await axios.get('url');

    const shelters: Shelter[] = response.data;

    console.log(JSON.stringify(shelters, null, 2));

    return res.status(200).json({ data: shelters });
  } catch (error: any) {
    console.error('Error fetching data from the external API:', error);
    return res.status(400).json({ error });
  }
};

export { getAllShelters };
