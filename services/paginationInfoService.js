const PaginationInfo = (acronyms, from, lim) => {
  const paginationInfo = {
    previous_count: acronyms.slice(0, from).length,
    next_count: acronyms.slice(lim, acronyms.length).length
  }

  return paginationInfo
}

export default PaginationInfo;
