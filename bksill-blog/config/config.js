import { ApolloClient ,gql,InMemoryCache} from "@apollo/client";

export const API_URL = "http://192.168.1.8:1337"

export  const getClient = ( user ) =>{
      const client = new ApolloClient({
        uri: `${API_URL}/graphql`,
        cache: new InMemoryCache(),
        headers:{
          "Authorization": user ? `Bearer ${user.jwt}` : ""
        }
      });
    return client
}


export const onFollowing = async (user,followings) =>{
  const FOLLOWING = gql`
    mutation{
      updateUser(
        input:{
          where:{
            id:${user.user.id}
          }
          data:{
            followings:[${followings}]
          }
        }
      )
      {
        user{
          followings{
              id
          }
        }
      }
    }
  `
  const res = await getClient(user).mutate({mutation:FOLLOWING})
  console.log(res)
}

export const onInterestChange = async (user,topics) =>{
  const TOPICS = gql`
    mutation{
      updateUser(
        input:{
          where:{
            id:${user.user.id}
          }
          data:{
            topicsFollow:[${topics}]
          }
        }
      )
      {
        user{
          topicsFollow{
              id
          }
        }
      }
    }
  `
  const res = await getClient(user).mutate({mutation:TOPICS})
  console.log(res)
}