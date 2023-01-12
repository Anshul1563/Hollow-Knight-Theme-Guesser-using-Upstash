import { SearchRedis } from "../../lib/redis";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<any>) {
    try{
        const themes = await SearchRedis()
        res.status(200).json({ themes })
    }catch(err : any){
        res.status(500).json({ error: err.message })
    }
}
