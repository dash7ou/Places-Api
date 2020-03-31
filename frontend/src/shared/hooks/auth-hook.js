import { useState, useEffect, useCallback } from "react";

let logoutTimer ;
export const useAuth = () =>{
    const [token, setToken ] = useState(null);
    const [userId, setUserId] = useState(null);
    const [tokenExpirationDate, setTokenExporationDate] = useState(null)
  
    const login = useCallback((uid, token, expirationDate)=>{
      setUserId(uid);
      setToken(token);
      const tokenExpirationDate = expirationDate ||  new Date(new Date().getTime() + 1000*60*60);
      setTokenExporationDate(tokenExpirationDate);
      localStorage.setItem("userData", JSON.stringify({ userId: uid, token , expiration: tokenExpirationDate.toISOString() }));
    }, []);
  
    const logout = useCallback(()=>{
      setToken(null);
      setUserId(null)
      setTokenExporationDate(null);
      localStorage.removeItem("userData");
    }, [])
  
    useEffect(()=>{
      if(token && tokenExpirationDate){
        const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
        logoutTimer =  setTimeout(logout ,remainingTime )
      }else{
        clearTimeout(logoutTimer);
      }
    }, [token , logout, tokenExpirationDate])
  
    useEffect(()=>{
      const storedData = JSON.parse(localStorage.getItem("userData"));
      if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
        login(storedData.userId , storedData.token, new Date(storedData.expiration))
      }
    }, [login])

    return [token , userId, login, logout]
  
}