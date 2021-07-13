import { gql } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getClient, onFollowing,onInterestChange } from '../config/config'
import { addtoTopics } from '../redux/actions/topicActions';

export default function TopicsToAdd() {
    const [loading, setloading] = useState(true);
    const [categories, setcategories] = useState([]);
    useEffect(() =>{
        getCategories()
    },[])

    const getCategories =async () =>{
        
        const GET_CATEGORIES = gql`
            query{
                categories{
                    id
                    name
                    slug
                }
            }
        `
        const res = await getClient().query({query:GET_CATEGORIES})
        console.log(res)
        setcategories(res.data.categories)
        setloading(false)
    }
    return loading ? null : (
        <div className="grid lg:grid-cols-4 grid-cols-2">
                {
                    categories.map((itm,idx)=>{
                        return (<TopicCard key={idx} item={itm} />)
                    })
                }
        </div>
    )
}


const TopicCard = ({item}) =>   {
    const userReducer = useSelector(state => state.userReducer);
    const topicReducer = useSelector(state => state.topicReducer);
    const topicsList = topicReducer.map(itm => itm.id)
    const isInterested = topicReducer.find(itm => itm.id == item.id)
    const [image, setimage] = useState('');
    const dispatch = useDispatch()
    const appId = "8a2fafbdddd42c1dac144359baa8facfc9d20185dfc2fbd65912725b556bf276";
    const baseUrl = "https://api.unsplash.com/search/photos";
    // console.log("followingReducer",followingReducer)
    
    fetch(`${baseUrl}?client_id=${appId}&page=1&per_page=1&query=${item.name}`,{
        method:'GET',
    })
    .then(res =>res.json())
    .then(response =>{
        setimage(response.results[0].urls.small)
    }); 
    
    const onInterestFollow = () =>  {
        dispatch(addtoTopics(item));
        if(isInterested){
            const newListTopics = topicReducer.filter(itm => itm.id != item.id);
            const newList = newListTopics.map(itm => itm.id)
            console.log(newList)
            onInterestChange(userReducer,newList).then(res =>{   });
        }else{
            onInterestChange(userReducer,[...topicsList,item.id]).then(res =>{
                console.log(res)
            });
        }
        
    }


    
    return (
    <div className="flex p-3 justify-center items-center m-2">
        <img src={image} className="h-16 w-16 rounded-md self-center object-cover" />
        <div className="px-1 mx-4">
            <p className="font-semibold text-base m-2 text-center capitalize">{item.name}</p>
            <button onClick={onInterestFollow} className={`ring-1 ring-green-400 border-gray-400 ${isInterested ? "bg-green-400 text-white font-bold":""} text-sm px-2 py-1 rounded-full`} >
                Follow
            </button>
        </div>
    </div>)
}