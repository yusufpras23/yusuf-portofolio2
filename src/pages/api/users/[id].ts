import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from 'mongodb';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);
    const idParam:string = req?.query?.id as string || ''
    const id = new ObjectId(idParam);

    switch (req.method) {  
        case "PUT":
            try{
                const filter = {_id: id }
                const body = JSON.parse(req.body)
                // const body = req.body
                const updateDoc = {
                    $set: {
                        status: body.status,
                        email: body.email,
                        phone: body.phone,
                        name: body.name
                    },
                  };
                console.log('filter',filter)
                const users = await db.collection("users")
                        .updateOne(filter, updateDoc, { upsert: true })

                res.status(200).json({data:[users], message: 'data berhasil di perbaharui'});
            }catch(err){
                res.status(422).json({ message: err.message});
            }
        break;
        case "DELETE":
            try{
                const resDelete = await db.collection("users").deleteOne({
                    _id: id
                })

                if(resDelete.deletedCount < 1){
                    throw new Error('data tidak ditemukan')
                }

                res.json({ data: [resDelete], message:"data berhasil dihapus" });
            }catch(err){
                res.status(422).json({ message: err.message});
            }
        break;
        default:
            const education = await db.collection("users")
                .findOne({ _id: id })
            res.json({ data: education });
        break;
    }
}