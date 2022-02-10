import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function EditPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const activePreset = useSelector(store => store.activePreset)

    useEffect(() => {
        dispatch({
            type: 'FETCH_ACTIVE_PRESET', 
            payload: params.id 
        })
    }, [params.id] )
    return(
        <>
        <h1>this is an edit page</h1>
        <p>id is {params.id}</p>
        
        </>
    )

}

export default EditPage