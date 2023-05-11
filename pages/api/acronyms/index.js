import AcronymCreateService from 'services/acronymCreateService';
import AcronymListService from 'services/acronymListService';

export default async function handler(req, res) {

  if(req.method === "POST") {
    
    try {
      const { acronym, meaning } = req.body
      const acr = await AcronymCreateService(acronym, meaning)

      res.status(201).json({
        message: "Record Successfully Created",
        object: acr
      })
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }

  } else {
    try {

      const { from, limit, search } = req.query;
      
      const acronyms = await AcronymListService(from, limit, search)

      res.status(200).json(acronyms)
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }
  }
}