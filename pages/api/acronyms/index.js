import clientPromise from 'lib/mongodb';
const Fuse = require('fuse.js')

export default async function handler(req, res) {

  const client = await clientPromise;
  const db = client.db("messaging");

  if(req.method === "POST") {
    
    try {
      const { acronym, meaning } = req.body
      const acr = await db.collection("acronyms").insertOne({
        acronym,
        meaning,
      });

      res.status(201).json({
        message: "Record Successfully Created",
        object: acr
      })
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }

  } else {
    const acronyms = await db.collection("acronyms").find({}).toArray();

    const { from, limit, search } = req.query;
    const lim = parseInt(limit) + parseInt(from)
    const sliced_acronyms = acronyms.slice(from, lim) // slicing for pagination

    const keys = ['acronym', 'meaning']

    const fuse = new Fuse(sliced_acronyms, {
      keys: keys
    })

    const previous_count = acronyms.slice(0, from).length
    const next_count = acronyms.slice(lim, acronyms.length).length

    let result = fuse.search(search)

    result.push({
      pagination_info: {
        previous_count: previous_count,
        next_count: next_count,
      }
    })

    res.status(200).json(result)
  }
}