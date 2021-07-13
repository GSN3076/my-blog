import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { API_URL } from '../config/config';
import { addtoTopics} from '../redux/actions/topicActions';
import { addTofollowing } from '../redux/actions/followingActions';
import {setUser,clearUser} from "../redux/actions/userAction"

export default function login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userReducer = useSelector(state => state.userReducer);
    const dispatch = useDispatch()
    
    const router = useRouter()
    useEffect(() =>{
        if(userReducer){
            // router.push("/")
        }
    },[])
    const onSubmit = async  () => {
            const res = await fetch(`${API_URL}/auth/local`,{method:'POST',headers:{"content-type":"application/json"},body:JSON.stringify({identifier:email,password:password})})
            const response = await res.json();
            
                if( response.statusCode != 400 || response.statusCode != 404 ){
                        dispatch(setUser(response));
                        dispatch(addtoTopics(response.user.topicsFollow))
                        // dispatch(addTofollowing(response.user.followings))
                        console.log(response)
                        router.push("/");
                }
                else{
                    alert("Invalid Username/Password")
                }
             }

    return (
        <div className=" bg-white flex h-screen w-full" >
                <div className="md:w-2/3 md:block  hidden  lg:w-2/3  bg-gray-50  relative  " >
                        <img className="md:w-screen object-cover  h-full bg-cover"  src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
                        <div className=" bg-black opacity-40 absolute top-0 bottom-0 left-0 right-0" />
                </div>
                <div className="md:w-1/3 sm:w-full  lg:w-1/3 h-full ">
                        <Image src="/assets/images/workinhome.png" width="1200" height="800"   />
                            <div className="flex flex-col p-20 justify-center items-center ">
                                    <img src="images/logo-dark.png" className="w-48 h-14" />
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Username or Email" className="p-4 rounded-md focus:ring-offset-gray-50 my-2 w-80 bg-gray-100" type="email" />
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"  className="p-4 rounded-md focus:ring-offset-gray-50 my-2 w-80  bg-gray-100" type="password" />
                                    <button onClick={onSubmit} className="bg-blue-500 font-bold focus:outline-none  text-white  rounded-full py-4  px-10 shadow-lg uppercase mt-8" >
                                        LOGIN
                                    </button>
                                    <p className="mt-4 font-medium ">
                                        Don't have an account ? <span className="text-blue-400">Create an account</span>
                                    </p>
                            </div>
                    </div>
        </div>
    )
}
