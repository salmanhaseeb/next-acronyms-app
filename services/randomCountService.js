import clientPromise from 'lib/mongodb';

const getRandomNonAdjacentElements = (arr, n) => {
  const result = [];

  // Create a copy of the input array to avoid modifying the original
  const copyArr = [...arr];

  // Loop n times to select n random non-adjacent elements
  for (let i = 0; i < n; i++) {
    // Generate a random index within the bounds of the array
    const randomIndex = Math.floor(Math.random() * copyArr.length);

    // Add the randomly selected element to the result array
    result.push(copyArr[randomIndex]);

    // Remove the selected element and its adjacent elements from the copy array
    const startIndex = Math.max(0, randomIndex - 1);
    const endIndex = Math.min(randomIndex + 1, copyArr.length - 1);
    copyArr.splice(startIndex, endIndex - startIndex + 1);
  }

  return result;
}


const RandomCountService = async (count) => {

  const client = await clientPromise;
  const db = client.db("messaging");

  const acronyms = await db.collection("acronyms").find({}).toArray();

  const result = getRandomNonAdjacentElements(acronyms, count)

  return result;
}

export default RandomCountService;
