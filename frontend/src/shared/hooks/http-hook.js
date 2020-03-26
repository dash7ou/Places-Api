import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = ()=>{
    const [ isLoading , setIsLoading ] = useState(false);
    const [ error , setError ]= useState(null);

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback( 
        async (url , method='GET', body=null, headers={})=>{
            try {
                setIsLoading(true);
                const httpAbortCtrl = new AbortController();
                activeHttpRequests.current.push(httpAbortCtrl);

                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal
                });
        
                const data = await response.json();
                activeHttpRequests.current = activeHttpRequests.current.filter(reqctl => reqctl !== httpAbortCtrl);
                if(!response.ok){
                    throw new Error(data.message);
                }
                setIsLoading(false);
                console.log(data)
                return data
            } catch (error) {
                setError(error.message);
                setIsLoading(false)
                throw error;
            }

        },[]
    );

    const clearError = ()=>{
        setError(null);
    }

    useEffect(()=>{
        return ()=>{
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
        }
    }, [])

    return [ isLoading, error, sendRequest, clearError];
};

