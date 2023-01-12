import { UpdateTheme } from "../../lib/redis";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<any>) {
    try{
        console.log(req.body)
        const theme = await UpdateTheme(req.body.entityId,req.body.process)
        res.status(200).json({ theme })
    }catch(err : any){
        res.status(500).json({ error: err.message })
    }
}
