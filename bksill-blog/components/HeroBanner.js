import { gql } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { API_URL, getClient } from '../config/config';
import Image from 'next/image';
import WritersCard from './WritersCard';
import moment from 'moment';
import readingTime from 'reading-time';
import Link from 'next/link';
export default function HeroBanner() {

    const [loading, setloading] = useState(true);
    const [articles, setarticles] = useState([]);
    const userReducer = useSelector(state => state.userReducer);

    useEffect(() =>{
        getTrendings();
    },[])
    
    const getTrendings = async () =>{
        const GET_TRENDINGS = gql`
        query{
                articles(
                    sort:"numberofClaps:desc"
                    limit:1
                ){
                        id
                    created_at
                    description
                    title
                    slug
                    content
                    category{
                        id
                        name
                    }
                    image{
                     url
                    }
                        user{
                    id
                    picture{
                        url
                    }
                        name
                        username
                        bio
                    }   
                }
                }`
        
        const res = await getClient().query({query:GET_TRENDINGS})
        setarticles(res.data.articles)
        setloading(false)
    } 

    return loading ? null : (
        <Link href={`post/${articles[0].slug}`} as={`post/${articles[0].slug}`} >
            <a>
        <div className="flex lg:flex-row flex-col  p-4 overflow-hidden relative">
                    <div className="w-4/5 px-2 pb-4">
                                <div className="flex flex-row items-center my-2">
                                        <div className="rounded-full ring-2 h-10 w-10 ring-green-400 justify-center items-center relative overflow-hidden">
                                        <Image className="" width={60} height={60}  objectFit="cover"   src={`${API_URL}${articles[0].user.picture.url}`} />
                                        </div>
                                        <div>
                                            <p className="font-bold mx-4 text-sm">{articles[0].user.name}</p>
                                            <p className="font-bold mx-4 text-sm text-gray-500">{articles[0].user.bio}</p>
                                        </div>
                                    </div>
                           <h3 className="font-black text-lg py-1   line-clamp-2">{articles[0].title}</h3>
                        <p className="font-bold text-sm py-1 text-gray-500 line-clamp-2">{articles[0].description}</p>
                        <p className="font-bold text-sm py-1 text-green-500 capitalize">{moment(articles[0].created_at).format("MMM DD, YYYY")} | {readingTime(articles[0].content).text} | {articles[0].category.name}</p>
                    </div>
                <div className="flex w-full h-38  md:h-56 lg:h-60 p-1 ">
                    <Image   src={`${API_URL}${articles[0].image.url}`} width={1200} height={500} className="rounded-md object-cover" />
                </div>
            </div>
            </a>
        </Link>
    )
}
