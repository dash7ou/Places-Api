import React, { useEffect , useState, Fragment} from "react";

import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import Spinner from "../../shared/components/UIElements/LoadingSpinner";

const User = ()=>{
    const [isLoading , setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loadingUsers , setLoadingUsers] = useState()
    useEffect(()=>{
        const sendRequest = async ()=>{
            try{
                setLoading(true);
                const response = await fetch("http://localhost:5000/api/v1/users");
                const data = await response.json();
                setLoadingUsers(data)
            }catch(err){
                setError(err)
            }
            setLoading(false);
        }
        sendRequest()
    }, [])

    const errorHandler = ()=>{
        setError(false)
    }
    return(
        <Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && <div className="center">
                <Spinner />
            </div>}
            { !isLoading && loadingUsers && <UserList items={loadingUsers}/> }

        </Fragment>
    )
}

export default User;