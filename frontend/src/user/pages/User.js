import React, { useEffect , useState, Fragment} from "react";

import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import Spinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook"

const User = ()=>{
    const [loadingUsers , setLoadingUsers] = useState()
    const [ isLoading, error, sendRequest, clearError] = useHttpClient()
    useEffect(()=>{
        const fetchUsers = async ()=>{
            try{
               const data = await sendRequest("http://localhost:5000/api/v1/users");
                setLoadingUsers(data)
            }catch(err){}
        }
        fetchUsers()
    }, [sendRequest])

    return(
        <Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <div className="center">
                <Spinner asOverlay/>
            </div>}
            { !isLoading && loadingUsers && <UserList items={loadingUsers}/> }

        </Fragment>
    )
}

export default User;