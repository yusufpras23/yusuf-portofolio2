import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);
    const idParam: string = req?.query?.id as string || ''

    switch (req.method) {
        case "GET":
            const comments = await db.collection("comments")
                .find({ blog_id: idParam })
                .toArray();
            res.status(200).json({ data: comments });

            break;
        default:
            break;
    }
}