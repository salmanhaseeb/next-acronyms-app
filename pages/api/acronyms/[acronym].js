import clientPromise from 'lib/mongodb';
import Auth from 'lib/auth';
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

  const { acronym } = req.query;
  const { meaning } = req.body

  const client = await clientPromise;
  const db = client.db("messaging");

  if (req.method === "PUT") {
    const { authorization } = req.headers

    const auth = Auth(authorization)

    if(!auth) {
      res.status(401).json({
        message: "Unauthorized"
      })
    } else {
      try {
        const found_acr = await db.collection("acronyms").findOne({acronym: acronym});
        const updated_acr = await db.collection("acronyms").updateOne(
          {
            _id: ObjectId(found_acr._id),
          },
          {
            $set: {
              meaning: meaning,
            },
          },
          { 
            upsert: true
          }
        );
  
        res.status(201).json({
          message: "Record Updated Successfully",
          object: updated_acr
        })
      } catch (e) {
        console.error(e);
        throw new Error(e).message;
      }
    }
  } else if(req.method === "GET") {
    try {
      const acr = await db.collection("acronyms").findOne({acronym: acronym});

      res.status(200).json(acr);
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }
  } else {
      const { authorization } = req.headers

      const auth = Auth(authorization)

      if(!auth) {
        res.status(401).json({
          message: "Unauthorized"
        })
      } else {
        try {
          const found_acr = await db.collection("acronyms").findOne({acronym: acronym});
          const deleted_acr = await db.collection("acronyms").deleteOne({
            _id: ObjectId(found_acr._id)
          })
          res.status(200).json({
            message: 'Record Deleted Successfully',
            object: deleted_acr
          })
        } catch (e) {
          console.error(e);
          throw new Error(e).message;
        }
      }
  }
}
