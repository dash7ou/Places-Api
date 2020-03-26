import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlacesList";
import Spinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserPlaces = ()=>{
  const userId = useParams().userId;
  const [ isLoading , error, sendRequest , clearError] = useHttpClient();
  const [places , setPlaces] = useState(null);
  console.log(userId)

  useEffect(()=>{
    const getPlaces = async ()=>{
      try{
        const data = await sendRequest(`http://localhost:5000/api/v1/places/user/${userId}`);
        setPlaces(data)
      }catch(err){}
    }

    getPlaces();
  },[])

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Spinner />}
      {places && <PlaceList items={places}/>}
    </Fragment>
  )
}


export default UserPlaces;