import clientPromise from 'lib/mongodb';
import FuzzySearch from 'services/fuseSearchService';
import PaginationInfo from 'services/paginationInfoService';

const AcronymListService = async (from, limit, search) => {

  const client = await clientPromise;
  const db = client.db("messaging");

  const acronyms = await db.collection("acronyms").find({}).toArray();

  const lim = parseInt(limit) + parseInt(from)
  const sliced_acronyms = acronyms.slice(from, lim) // slicing for pagination

  const keys = ['acronym', 'meaning']
  let fuzzySearch = FuzzySearch(sliced_acronyms, keys, search) // Implemented FuzzySearch
  const paginationInfo = PaginationInfo(acronyms, from, lim) // Implemented Pagination Info

  fuzzySearch.push({
    paginationInfo
  })

  return fuzzySearch;
}

export default AcronymListService;
