import React from 'react'
import Image from "next/image"
import { API_URL } from '../config/constants'
import { useDispatch, useSelector } from 'react-redux';
import { onFollowing } from '../config/config';
import { addTofollowing } from '../redux/actions/followingActions';

import {motion} from "framer-motion"

export default function WritersCard({data}) {
    const userReducer = useSelector(state => state.userReducer);
    const followingReducer = useSelector(state => state.followingReducer);
    const isFollowing = followingReducer.find(itm => itm.id == data.id);
    console.log(userReducer.following)
    const dispatch = useDispatch()

    const followerlists = followingReducer.map(itm => itm.id);
    
    const onFollowingChange = () =>  {
        dispatch(addTofollowing(data));
        console.log(isFollowing) 
        if(isFollowing){
            const newListFollower = followingReducer.filter(itm => itm.id != data.id);
            const newList = newListFollower.map(itm => itm.id)
            console.log(newList)
            onFollowing(userReducer,newList).then(res =>{

            });
        }else{
            onFollowing(userReducer,[...followerlists,data.id]).then(res =>{
                console.log(res)
            });
        }
        
    }


    return (
        <motion.div  className="p-4 py-2 my-4">
            <div className="flex flex-row items-center">
                <div className="rounded-full ring-2 h-10 w-10 ring-green-400 justify-center items-center relative overflow-hidden">
                <Image className="" width={60} height={60}  objectFit="cover"   src={`${API_URL}${data.picture.url}`} />
                </div>
                <div>
                    <p className="font-bold mx-4 text-sm">{data.name}</p>
                    <p className="font-bold mx-4 text-sm text-gray-500">{data.bio}</p>
                </div>
            </div>
            <div>
            <button onClick={onFollowingChange} className={`items-center justify-center  w-full flex flex-row my-2 p-2 font-bold rounded-full border-2 hover:border-white hover:text-white ${isFollowing ? "bg-green-400 text-white" : ""} hover:bg-green-400 border-green-500  text-sm `}>
                    Follow
                    {  isFollowing ? <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>}
                </button>  
            </div>
        </motion.div>
    )
}
