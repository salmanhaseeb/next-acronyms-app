import clientPromise from 'lib/mongodb';

const AcronymGetService = async (acronym) => {

  const client = await clientPromise;
  const db = client.db("messaging");

  const acr = await db.collection("acronyms").findOne({acronym: acronym});

  return acr;
}

export default AcronymGetService;
