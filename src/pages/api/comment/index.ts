import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);

    switch (req.method) {
        case "POST":
            try {
                const { comment, blog_id, role, email, name } = JSON.parse(req.body);
                if (!comment || !blog_id || !role || !email || !name) {
                    return res.status(400).json({ error: "All fields are required" });
                }
                const newComment = {
                    _id: new Date().getTime().toString(),
                    comment,
                    blog_id,
                    role,
                    email,
                    name,
                };
                const result = await db.collection("comments").insertOne(newComment);
                return res.status(200).json({ message: "Comment added successfully", result });
            } catch (err) {
                res.status(422).json({ message: err.message });
            }
            break;
        default:
            
            break;
    }
}