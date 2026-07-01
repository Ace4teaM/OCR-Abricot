'use client'

import { useState, useEffect, useMemo } from 'react'
import { useAuth } from "@/contexts/AuthContext";
 
export default function Put(url, put, domain = process.env.NEXT_PUBLIC_USER_API_URL) {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { isReady } = useAuth()

    const hasData = useMemo(
        () => (isLoading == false && error == false && data && Object.keys(data).length > 0)
    ,[isLoading, error, data])

    async function putData() {
        try {
            const response = await fetch(`${domain}/${url}`, 
                {
                    method: "PUT",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(put),
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
                setData("La demande à été annulée, veuillez réessayer")
            } else {
                setData(err)
            }
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const ready_to_put = ()=>{
        return Boolean(isReady && url && put)
    }

    const retry = ()=>{
        if (ready_to_put()) {
            console.log("loading",url,"with",put)
            setLoading(true)
            setError(false)
            putData()
        }
    }

    useEffect(() => {
        if (ready_to_put()) {
            console.log("loading",url,"with",put)
            setLoading(true)
            setError(false)
            putData()
        }
    }, [isReady, url, put])

    return { data, isLoading, error, hasData, retry }
}
