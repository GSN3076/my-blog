import React from 'react'
import Head from "next/head"

export default function Layout(props) {
    return (
        <div className="container mx-auto">
            <Head>
                <title>{props.title}</title>
                <meta charSet="UTF-8" />
                <meta name="description" content={props.title} />
                <meta name="keywords" content={props.tags} />
                {/* <meta name="author" content={""} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
            </Head>
            <div className="w-full container ">
                {props.children}
            </div>
        </div>
    )
}
