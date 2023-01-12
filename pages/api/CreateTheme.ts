import { CreateTheme } from "../../lib/redis";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<any>) {
    try{
        const id = await CreateTheme(req.body)
        res.status(200).json({ id })
    }catch(err : any){
        res.status(500).json({ error: err.message })
    }
}
