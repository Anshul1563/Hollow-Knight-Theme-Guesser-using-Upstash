import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../lib/upstash-redis';
import { Theme } from '../../typings';


type Data = {
    themes : Theme[]
}

type ErrorData = {
    body : string
}

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Data | ErrorData>) {

    if (req.method!= "GET"){
        res.status(405).json({body : "Method not allowed"})
        return;
    }
    
    const themeResponse =  await redis.hvals("themes")

    const themes : Theme[] = themeResponse.map((theme)=>{
        return JSON.parse(theme)
    }).sort((a : Theme,b : Theme)=> b.name > a.name ? -1 : 1 )

    res.status(200).json({themes})


}
