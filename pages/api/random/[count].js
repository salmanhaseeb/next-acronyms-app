import RandomCountService from "services/randomCountService";

export default async function handler(req, res) {
  const { count } = req.query;
  
  const randomCount = await RandomCountService(count)
  
  res.status(200).json(randomCount)
}
