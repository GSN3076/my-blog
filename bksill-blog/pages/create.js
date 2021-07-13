import React, { useState } from 'react'
import EditorJs from 'react-editor-js';
import CustomHeader from '../components/CustomHeader';
import { EDITOR_JS_TOOLS } from '../config/tools';
import Layout from './../components/Layout';

export default function create() {
    const [data, setdata] = useState({});

    return (
        <Layout >
            <div className="container ">
                <div className="h-32 w-full flex justify-between items-center border-b-2 border-gray-100">
                        <h1 className="text-xl font-black m-3">Write Article</h1>
                        <div>
                            <button className="bg-green-400 rounded-full p-3 px-5 hover:bg-green-600 font-bold text-white mx-2">
                                PUBLISH
                            </button>
                            <button className="bg-gray-400 rounded-full p-3 px-5 hover:bg-gray-600 font-bold text-white mx-2">
                                SAVE
                            </button>
                            
                        </div>
                </div>
                <EditorJs data={data}  onChange={(e) =>console.log(e)}  tools={EDITOR_JS_TOOLS} />
            </div>
        </Layout>
    )

}
