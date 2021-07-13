import React from 'react'
import Layout from '../components/Layout'
import CustomHeader from '../components/CustomHeader'
import Footer from '../components/Footer'
import SideBar from '../components/SideBar'
import HomePageArticles  from '../components/HomePageArticles'
import { useSelector } from 'react-redux'

export default function index() {
  
  return (
    <>
        <CustomHeader/>
      <Layout>
        <div className="flex flex-row ">
          <div className="p-2 border-r-2 border-gray-300 lg:w-4/5">
             <HomePageArticles />
          </div>
          <div >
            <SideBar  />
          </div>
        </div>
        <Footer />
      </Layout>
      </>
  )
}
