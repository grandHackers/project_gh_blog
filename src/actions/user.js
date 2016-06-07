import callApi from '../api'

export const REQUEST_UPDATE_USERNAME = 'REQUEST_UPDATE_USERNAME'
export const UPDATE_USERNAME_SUCCESS = 'UPDATE_USERNAME_SUCCESS'
export const UPDATE_USERNAME_FAILURE = 'UPDATE_USERNAME_FAILURE'

function requestUpdateUsername(newUsername) {
    return {
        type: REQUEST_UPDATE_USERNAME,
        username: newUsername
    }
}

function updateUsernameSuccess(user) {
    return {
        type: UPDATE_USERNAME_SUCCESS,
        user
    }
}

function updateUsernameFailure(error) {
    return {
        type: UPDATE_USERNAME_FAILURE,
        error: error.message
    }
}

export function updateUsername(newUsername) {
    return (dispatch, getState) => {
        const payload = { username: newUsername }
        dispatch(requestUpdateUsername(newUsername))
        
        const currentUser = getState().currentUser 
        return callApi(`/users/${currentUser.id}`, 'PUT', payload)
            .then(response => {
                if (response.status == 200) {
                    return response.json() 
                } else {
                    throw Error(`Username update failed with ${response.status}`)
                }
            })
            .then(data => {
                console.log(data)
                dispatch(updateUsernameSuccess(data))
            })
            .catch(error => dispatch(updateUsernameFailure(error)))
    }
}
