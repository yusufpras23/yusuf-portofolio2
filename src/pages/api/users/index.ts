import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);

    switch (req.method) {
        case "POST":
            try{
                // const body = req.body
                const body = JSON.parse(req.body)
                if(typeof body !== "object"){
                    throw new Error('invalid request')
                }
                
                if( body.name == ""){
                    throw new Error('name is required')
                }

                if( body.phone == ""){
                    throw new Error('phone is required')
                }


                if( body.email == ""){
                    throw new Error('email is required')
                }

                if( body.status == ""){
                    throw new Error('status is required')
                }

                let users = await db.collection("users").insertOne(body);
                res.status(200).json({ data: users, message:'data berhasil di simpan' });

            }catch(err){
                res.status(422).json({ message: err.message});
            }
            break;
        default:
            const usersData = await db.collection("users").find({}).toArray();
            res.json({ data: usersData });
        break;
    }
}