'use client'

import { useState, useEffect, useMemo } from 'react'
import { useAuth } from "@/contexts/AuthContext";
 
export default function usePost(url, post, domain = process.env.NEXT_PUBLIC_USER_API_URL) {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { isReady } = useAuth()

    const hasData = useMemo(
        () => (isLoading == false && error == false && data && Object.keys(data).length > 0)
    ,[isLoading, error, data])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${domain}/${url}`, 
                    {
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/json"
                        },
                        body: JSON.stringify(post),
                        credentials: "include"
                    }
                );

                if(response.status != 200)
                {
                    setData(response)
                    setError(true)
                }

                if(response.headers.get("content-type")?.includes("application/json")) // ex: Content-Type: application/json; charset=utf-8
                {
                    const data = await response.json()
                    setData(data)
                }
                else{
                    const data = await response.text()
                    setData(data)
                }
            } catch (err) {
                console.log(err)
                setData(err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        const ready_to_post = Boolean(isReady && url && post)
        
        console.log("usePost >> ","isReady:",isReady,"url:",url,"post:",post,"ready to post ?",ready_to_post)
        
        if (ready_to_post) {
            console.log("loading",url,"with",post)
            setLoading(true)
            setError(false)
            fetchData()
        }
    }, [isReady, url, post])

    return { data, isLoading, error, hasData }
}
