import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../lib/upstash-redis';
import { Theme } from '../../typings';


type Data = {
    theme : Theme
}

type ErrorData = {
    body : string
}

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Data | ErrorData>) {

    if (req.method!= "POST"){
        res.status(405).json({body : "Method not allowed"})
        return;
    }

    const { theme } = req.body

    // if (redis.status == "end")
    //     await redis.connect();

    await redis.hset("themes",theme.id, JSON.stringify(theme))
    res.status(200).json({theme})


}
