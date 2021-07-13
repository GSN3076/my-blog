import React, { useEffect, useState } from 'react'
import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client';
import { API_URL } from '../config/constants';
import WritersCard from './WritersCard';
import { useSelector } from 'react-redux';



const client = new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache()
  });


export default function SideBar() {
    const [loading, setloading] = useState(true);
    const [writers, setwriters] = useState([]);
    const followingReducer = useSelector(state => state.followingReducer);    
    const followList = followingReducer.map(itm => itm.id);

            useEffect(() =>{
                getWriters()
            },[followingReducer])

            useEffect(() =>{
                getWriters()
            },[]);

            console.log(followList)
            const getWriters = async () =>{    
                    setloading(true)
                    const GET_WRITERS = gql`
                    query{
                        users(
                            limit:10
                            where:{
                                _id_nin:[${followList}]
                            }
                        ){
                            id
                            name
                            picture{
                                 url
                            }
                            bio    
                        }
                }`
                const res = await client.query({query:GET_WRITERS})
                setwriters(res.data.users)
                console.log(res.data.users.map(itm => itm.id))
                setloading(false);
            }

    return  (
        <div className="hidden lg:block w-full   h-screen sticky absolute top-20 p-4">
            <div>
                    <p className="text-lg font-bold text-center">You Should Follow.</p>
                    {
                        writers.map((item,index) => {
                            // const isExist = followingReducer.filter(itm => itm.id == item.id)
                            return  (<WritersCard data={item} key={index} />)
                        })
                    }
            </div>
            <div className="">
                    <div className="">

                    </div>
            </div>
            
        </div>
    )
}
