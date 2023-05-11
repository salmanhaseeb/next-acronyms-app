const Auth = (api_key) => {
  console.log("In auth function")
  return api_key === process.env.API_KEY
}

export default Auth;
