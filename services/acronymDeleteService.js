import clientPromise from 'lib/mongodb';
import { ObjectId } from "mongodb";

const AcronymDeleteService = async (acronym) => {

  const client = await clientPromise;
  const db = client.db("messaging");

  const found_acr = await db.collection("acronyms").findOne({acronym: acronym});
  const deleted_acr = await db.collection("acronyms").deleteOne({
    _id: ObjectId(found_acr._id)
  })

  return deleted_acr
}

export default AcronymDeleteService;
