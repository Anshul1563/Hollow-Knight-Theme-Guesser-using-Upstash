import { SearchTheme } from "../../lib/redis";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<any>) {
    try{
        console.log(req.body)
        const themes = await SearchTheme(req.body.text)
        res.status(200).json({ themes })
    }catch(err : any){
        res.status(500).json({ error: err.message })
    }
}
