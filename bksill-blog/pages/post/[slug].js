import { gql } from '@apollo/client';
import React, { useEffect, useState } from 'react'

import { API_URL, getClient, onFollowing } from '../../config/config';
import Layout from '../../components/Layout';
import Image from 'next/image';
import CustomHeader from '../../components/CustomHeader';
import MarkDown from "react-markdown"
import SideBar from '../../components/SideBar';
import moment from 'moment';
import readingTime from 'reading-time';
import { useDispatch, useSelector } from 'react-redux';
import { addTofollowing } from '../../redux/actions/followingActions';
import CommentList from '../../components/CommentList';
import { motion } from 'framer-motion';

export const config =  {amp:true};

export default function article(props) {

    const followingReducer = useSelector(state => state.followingReducer);
    const userReducer = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [isLiked, setisLiked] = useState(false);
    
    const isFollowing = followingReducer.find(itm => itm.id == props.data.user.id);
    
    const followerlists = followingReducer.map(itm => itm.id);
    
    useEffect(() =>{
        updateViews()
    },[])
    const updateViews =  async () =>{
        const UPDATE_VIEWS = gql`
        mutation{
            updateArticle(input:{
                where:{
                    id:${props.data.id}
                }
                data:{
                    numberofViews:${props.data.numberofViews + 1}
                }
            }){
                article{
                    id
                    numberofViews
                }
            }
            }
        `
        const res = await getClient(userReducer).mutate({mutation:UPDATE_VIEWS})
    }
    const updateLikes =  async () =>{
        setisLiked(!isLiked)
        const liked = isLiked ? (props.data.numberofClaps - 1) : (props.data.numberofClaps + 1)
        const UPDATE_LIKES = gql`
        mutation{
            updateArticle(input:{
                where:{
                    id:${props.data.id}
                }
                data:{
                    numberofClaps:${liked}
                }
            }){
                article{
                    id
                    numberofClaps
                }
            }
            }`

        const res = await getClient(userReducer).mutate({mutation:UPDATE_LIKES})
        console.log(res)
    }


    const onFollowingChange = () =>  {
        dispatch(addTofollowing(props.data.user));
        console.log(isFollowing) 
        if(isFollowing){
            const newListFollower = followingReducer.filter(itm => itm.id != props.data.user.id);
            const newList = newListFollower.map(itm => itm.id)
            console.log(newList)
            onFollowing(userReducer,newList).then(res =>{
                console.log(res)
            });
        }else{
            onFollowing(userReducer,[...followerlists,props.data.user.id]).then(res =>{
                console.log(res)
            });
        }
    }

    return (
        <>
         <CustomHeader />
            <Layout >
                <amp-section className="flex flex-row">
                <div className="lg:w-4/5 lg:p-8 border-r-2 border-gray-200">
                <div className="p-4 shadow-md mb-2 flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center">
                        <Image className="rounded-full object-cover" src={`${API_URL}${props.data.user.picture.url}`} width={50} height={50} /> 
                        <div>
                            <p className="font-bold text-sm mx-4">@{props.data.user.username}</p>
                            <p className="font-semibold text-sm mx-4 text-gray-500">{props.data.user.bio}</p>
                        </div>
                    </div>
                <button onClick={onFollowingChange} className={`items-center flex flex-row my-2 p-2 font-bold rounded-full border-2 hover:border-white hover:text-white ${isFollowing ? "bg-green-400 text-white" : ""} hover:bg-green-400 border-green-500  text-sm `}>
                    Follow
                    { isFollowing ? <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>}
                </button>                
                </div>
                    <div className="relative rounded-lg">
                            <Image className="mt-4" src={`${API_URL}${props.data.image.url}`} width={1200} height={600} />
                            <div className="absolute top-0 bottom-0 left-0 right-0  bg-gradient-to-b to-black from-transparent">
                                            <p className="font-semibold text-md absolute bottom-8 left-6 text-white line-clamp-2 w-4/5 ">
                                                {props.data.title}
                                            </p>
                            </div>
                    </div>
                <p className="font-black text-xl px-4 pt-4 w-4/5 ">{props.data.title}</p>
                <p className="font-bold text-lg px-4 pt-2 text-gray-500 ">{props.data.description}</p>
                <p className="text-sm  bottom-2 left-6 capitalize p-4 font-bold text-green-500" >{moment(props.data.created_at).format("MMM DD, YYYY")} | {readingTime(props.data.content).text} | {props.data.category.name}</p>
                <div className="prose max-w-none p-4">
                    <MarkDown
                        source={props.data.content}
                        skipHtml={false}
                        allowDangerousHtml
                    />
                </div>
                <div className=" lg:hidden md:hidden xl:hidden 2xl:hidden p-4 h-52 w-full flex mt-10 justify-evenly border-b-2 border-gray-200">
                            <div className="flex flex-row justify-center items-center">
                                
                                <motion.button onClick={updateLikes} whileHover={{scale:1.1}} className="rounded-full bg-red-200 p-2 mx-2">
                                    {!isLiked ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  text-red-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                            :
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>}
                                </motion.button>

                                <p className="font-bold text-gray-500">{props.data.numberofClaps  }</p>    
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                <motion.button whileHover={{scale:1.1}} className="rounded-full bg-green-200 p-2 mx-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </motion.button>
                                <p className="font-bold text-gray-500">{props.data.numberofViews}</p>    
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                    <motion.button whileHover={{scale:1.1}} className="rounded-full bg-indigo-200 p-2 mx-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                        </svg>
                                    </motion.button>
                                    <p className="font-bold text-gray-500">{props.data.numberofViews}</p>    
                            </div>
                        </div>    
                <div className="p-4">
                    <CommentList article={props.data}  />
                </div>
                </div>
                <div className="hidden  lg:block flex flex-col">
                        <div className="p-4 h-52 w-full flex mt-10 justify-evenly border-b-2 border-gray-200">
                            <div className="flex flex-row justify-center items-center">
                                
                                <motion.button onClick={updateLikes} whileHover={{scale:1.1}} className="rounded-full bg-red-200 p-2 mx-2">
                                    {!isLiked ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  text-red-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                            :
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>}
                                </motion.button>

                                <p className="font-bold text-gray-500">{props.data.numberofClaps  }</p>    
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                <motion.button whileHover={{scale:1.1}} className="rounded-full bg-green-200 p-2 mx-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </motion.button>
                                <p className="font-bold text-gray-500">{props.data.numberofViews}</p>    
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                    <motion.button whileHover={{scale:1.1}} className="rounded-full bg-indigo-200 p-2 mx-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                        </svg>
                                    </motion.button>
                                    <p className="font-bold text-gray-500">{props.data.numberofViews}</p>    
                            </div>
                        </div>    
                    <SideBar/>
                </div>
                </amp-section>
            </Layout>
        </>
    )
}


export const getStaticPaths = async (ctx)=> {
    
    const GET_POST = gql`    
    query getAllPosts{
        articles{
            id
            slug
        } 
    }`

    const response = await getClient().query({
        query: GET_POST
    });
    
        return {
            paths: response.data.articles.map(item => ({params:{slug:item.slug}})),
            fallback: true 
          };
    
  }
  

  export const getStaticProps = async (ctx) => {

    const GET_POST = gql`
    query getAllPosts{
        articles(
            where:{
                slug:"${ctx.params.slug}"
            }
        ){
                id
                created_at
                title
                description
                content
                numberofClaps
                numberofViews
                category{
                    id
                    name
                }
                image{
                    url
                }
                user{
                        id
                        name
                        username
                        email    
                        picture{
                            url
                        }
                        bio
                }
        } 
    }`
  
      const res = await getClient().query({
          query:GET_POST
      })
      return {
          props:{
              data:res.data.articles[0]
          },
          revalidate: 4, // In seconds
      }
  }