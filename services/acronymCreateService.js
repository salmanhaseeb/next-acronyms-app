import clientPromise from 'lib/mongodb';

const AcronymCreateService = async (acronym, meaning) => {

  const client = await clientPromise;
  const db = client.db("messaging");

  const acr = await db.collection("acronyms").insertOne({
    acronym,
    meaning,
  });

  return acr;
}

export default AcronymCreateService;
