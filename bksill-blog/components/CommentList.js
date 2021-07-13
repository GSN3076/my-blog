import { gql } from '@apollo/client'
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { API_URL, getClient } from '../config/config'
import { motion } from 'framer-motion';

export default function CommentList({article}) {
    
    const userReducer = useSelector(state => state.userReducer);
    const [comments, setcomments] = useState([]);
    const [loading, setloading] = useState(true);
    const [commentString, setcommentString] = useState("");

    useEffect(() =>{
        getComments()
    },[])

    const getComments = async () =>{
    const GET_COMMENTS = gql`
        query getComment{
            comments(
                where:{
                        article:${article.id}
                }
                ){
                    id
                    created_at
                        comment
                            user{
                                id
                                username
                                picture{
                                    url
                                }
                            }
                        
                }
            }
        `
        const res  = await getClient(userReducer).query({query:GET_COMMENTS})
        setcomments((val) => [...res.data.comments])
        setloading(false)
    }
    const onCommentSubmit = async (e) =>{
        // e.preventDefault()
        const POST_COMMENT = gql`
        mutation{
        createComment(
            input:{
                data:{
                    comment:"""${commentString}"""
                    user:${article.user.id}
                    article:${article.id}
                }
            }
        ){
            comment{
            id
            created_at
            comment
                user{
                    id
                    username
                    picture{
                        url
                    }
                }
            }
        }
        }`
        const res = await getClient(userReducer).mutate({mutation:POST_COMMENT})
        console.log(res);
        getComments()
    }


    return loading ? <div></div> : (
        <div className="mt-4">
            <p className="text-lg font-black border-b-2 border-gray-300 pb-2">Reader's Comment</p>

                {
                    comments.map((item,index) =>{
                            console.log(item)
                        return(
                            <motion.div  initial={{y:.8,opacity:0}} animate={{y:1,opacity:1}} key={`${index}comment`} className="py-4 border-b-2 border-gray-100">
                                    <div className="flex flex-row items-center">
                                        <div className="h-10 w-10 rounded-full ring-2 overflow-hidden">
                                            <Image className="object-cover" width={60} height={60} src={`${API_URL}${item.user.picture.url}`} />
                                          </div>
                                          <div className="m-2">
                                                <p className="text-sm font-bold">{item.user.username}</p>
                                                <p className="text-sm font-semibold text-gray-400">{moment(item.created_at).format("MMM DD, YYYY")}</p>
                                          </div>
                                    </div>
                                    <div className="p-4">
                                        <p className="font-semibold ">{item.comment}</p>
                                    </div>
                            </motion.div>
                        )

                    })
                }
                <motion.div whileFocus={{translateX:10}} className="flex items-center  pt-3 py-8">
                    <img className="h-10 w-10 rounded-full ring-2 object-cover" src={`${API_URL}${userReducer.user.picture.url}`} />
                    {/* <motion.p  whileFocus={{translateX:10}}  className="text-sm font-bold mx-2 absolute" style={{zIndex:-1}} >{userReducer.user.name.split(" ")[0]}</motion.p> */}
                    <motion.input multiple  onSubmit={onCommentSubmit} whileFocus={{translateX:15}} onChange={(e) => setcommentString(e.target.value)}  className="p-2 border-0 focus:outline-none focus:border-0  text-sm font-bold bg-white mx-4 w-full"  placeholder="Say something about this.." />
                    <button className="font-bold" onClick={onCommentSubmit} >
                        SUBMIT
                    </button>
                </motion.div>
        </div>
    )
}
