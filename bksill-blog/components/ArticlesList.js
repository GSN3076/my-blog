import React, { useEffect, useState } from 'react'
import ArticleCard from './ArticleCard'
import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client';
import { API_URL } from '../config/constants';
import InfiniteScroll from 'react-infinite-scroll-component';



const client = new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache()
});

export default function ArticlesList() {
    const [articles, setarticles] = useState([]);
    const [totalCount, settotalCount] = useState();
    const [loading, setloading] = useState(true);

    useEffect(() => {
        getArticles()
    }, [])
    const getArticles = async () => {

        const GET_ARTICLES = gql`
    query{
        articles(
            limit:10
            start:${articles.length}    
        ){
            id
            created_at
            title
            description
            slug
            category{
            name
            id
            }
            user{
                username
                bio
                id
                picture{
                    url
                }
            }
            image{
                url
            }
        }
        articlesConnection{
                aggregate{
                   totalCount
                }
            }
        }
    `
        const res = await client.query({ query: GET_ARTICLES })
        setarticles((val) => [...res.data.articles,...val])
        settotalCount(res.data.articlesConnection.aggregate.totalCount)
        setloading(false)
    }

    return loading ? null : (
        <div>
            <InfiniteScroll
                dataLength={articles.length} //This is important field to render the next data
                next={getArticles}
                hasMore={totalCount === articles.length ? false : true}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <div className="flex items-center justify-center p-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                        <b className="">Yay! You have seen it all</b>
                    </div>
                }
                refreshFunction={() => console.log("refreshing...")}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                }>
                {
                    articles.map((item, index) => <ArticleCard key={index} data={item} />)
                }
            </InfiniteScroll>
        </div>
    )
}
