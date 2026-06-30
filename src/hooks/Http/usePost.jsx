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

    async function postData() {
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

            if (!response.ok)
            {
                const errorData = await response.json().catch(() => null);

                throw new Error(
                    errorData?.message ?? `Erreur HTTP ${response.status}`
                );
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
            console.log("fetch exception", typeof err, err)    
            if (err instanceof Error && err.name === "NotAllowedError" ) {
                setData("Le serveur a refusé la demande, veuillez reéssayer")
            } else if (err instanceof Error && err.name === "TypeError" ) {
                setData("Le serveur ne semble pas accessible, veuillez reéssayer")
            } else if (err instanceof TypeError) {
                setData("Le serveur ne semble pas accessible, veuillez reéssayer")
            } else if (err instanceof Error && err.name === "AbortError") {
                setData("La demande à été annulée, veuillez reéssayer")
            } else {
                setData(err)
            }
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const ready_to_post = ()=>{
        return Boolean(isReady && url && post)
    }

    const retry = ()=>{
        if (ready_to_post())
            postData()
    }

    useEffect(() => {
        console.log("usePost >> ","isReady:",isReady,"url:",url,"post:",post,"ready to post ?",ready_to_post)
        
        if (ready_to_post()) {
            console.log("loading",url,"with",post)
            setLoading(true)
            setError(false)
            postData()
        }
    }, [isReady, url, post])

    return { data, isLoading, error, hasData, retry }
}
