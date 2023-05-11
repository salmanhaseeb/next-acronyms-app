const Fuse = require('fuse.js')

const FuzzySearch = (sliced_acronyms, keys, search) => {
  const fuse = new Fuse(sliced_acronyms, {
    keys: keys
  })

  const result = fuse.search(search)
  return result;
}

export default FuzzySearch;
