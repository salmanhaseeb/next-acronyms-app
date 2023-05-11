import Auth from 'lib/auth';
import AcronymUpdateService from 'services/acronymUpdateService';
import AcronymGetService from 'services/acronymGetService';
import AcronymDeleteService from 'services/acronymDeleteService';

export default async function handler(req, res) {

  if (req.method !== "GET") {
    const { authorization } = req.headers
    const auth = Auth(authorization)

    if(!auth) {
      res.status(401).json({
        message: "Unauthorized"
      })
      return;
    }
  }

  const { acronym } = req.query;

  if (req.method === "PUT") {
    const { meaning } = req.body
    try {
      const updated_acr = await AcronymUpdateService(acronym, meaning)

      res.status(201).json({
        message: "Record Updated Successfully",
        object: updated_acr
      })
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }
  } else if(req.method === "GET") {
    try {
      const acr = await AcronymGetService(acronym)

      res.status(200).json(acr);
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }
  } else {
    try {
      const deleted_acr = await AcronymDeleteService(acronym);
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
