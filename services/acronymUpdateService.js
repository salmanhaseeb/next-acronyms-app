import clientPromise from 'lib/mongodb';
import { ObjectId } from "mongodb";

const AcronymUpdateService = async (acronym, meaning) => {

  const client = await clientPromise;
  const db = client.db("messaging");

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

  return updated_acr;
}

export default AcronymUpdateService;
