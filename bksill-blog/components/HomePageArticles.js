import React, { useState } from 'react'
import ArticlesList  from './ArticlesList';
import HeroBanner from './HeroBanner';
import TopicsToAdd from './TopicsToAdd';

export default function HomePageArticles() {
    
    const [selected, setselected] = useState("1");
    
    return (
        <section className="w-full mt-8">
            <div className=" w-full ">
                <HeroBanner />
            </div>
            <div className="border-b-2 w-full p-4  border-gray-200" id="HomeSectionTabBar" >
                 <button className="mx-4" onClick={() =>setselected("1")} >
                     <p className={selected == "1" ? "font-bold" :""}>Recommended For you</p>
                </button>   
                <button className="mx-4" onClick={() =>setselected("2")}>
                     <p className={selected == "2" ? "font-bold" :""}>Topics</p>
                </button>   
                
            </div>
            <div className="" id="Articles">
                    {
                        selected == "1"  ?  <ArticlesList /> : <TopicsToAdd /> 
                    }
            </div>            
        </section>
    )
}
