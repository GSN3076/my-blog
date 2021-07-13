import moment from 'moment'
import React from 'react'
import { API_URL } from '../config/constants'
import Link from "next/link"
import { motion } from 'framer-motion'

export default function ArticleCard({data}) {
    // console.log(data.user)
    return (
        <Link href={`post/${data.slug}`} as={`post/${data.slug}`} >
                 <a className="flex flex-row h-30 p-2 border-b-2 border-opacity-30">
                            <div className="h-30  p-4 w-4/5  md:w-4/5 xl:w-4/5 lg:w-4/5">
                            <div className="flex flex-row items-center">
                                <img  className="ring-2 ring-green-500 rounded-full h-8 w-8 object-cover" src={`${API_URL}${data.user.picture.url}`} />
                                <div>
                                    <p className="text-sm font-bold mx-4">{data.user.username}</p>
                                    <p className="text-sm font-semibold text-gray-500 mx-4">{data.user.bio}</p>
                                </div>
                            </div>
                            <h3 className=" font-black text-sm lg:text-lg md:text-lg  my-2 ">{data.title}</h3>
                                <h4 className="font-semibold text-sm  my-1 text-gray-500 line-clamp-2 ">{data.description}</h4>
                            <p className="font-semibold text-sm my-1 text-gray-600 capitalize">{moment(data.created_at).format("MMM DD, YYYY")} | 2 min Read | {data.category.name}</p>
                            </div>
                            <div className="p-4 w-28 md:flex md:flex-1 lg:flex lg:flex-1 ">
                                <img className="rounded-md object-cover w-full h-26" src={`${API_URL}${data.image.url}`} />
                            </div>
                </a>
        </Link>
        )
}



const   PostLoader = () => {
    return (
        <motion.div  initial={{opacity:.5,}} transition={{repeat:Infinity,repeatType:'loop',repeatDelay:1,duration:1,ease:'easeIn'}} exit={{opacity:.5}}  animate={{opacity:1}}  className="mx-auto m-4 bg-gray-50 p-2 rounded-lg">
                <div className="flex flex-row m-4">
                    <div className="rounded-full bg-gray-200 h-8 w-8">
                    </div>
                    <div className="m-1 h-80 flex flex-col w-full rounded-lg">
                            <div className="bg-gray-200 my-2 h-2 w-full" />
                            <div className="bg-gray-200 my-2 h-4 w-full" />
                            <div className="bg-gray-200 my-2 h-4 w-full" />
                            <div className="bg-gray-200 my-2 h-full w-full" />
                    </div>
                </div>
        </motion.div>
    )
}
