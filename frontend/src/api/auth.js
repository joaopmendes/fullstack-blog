import axios from "axios";


export const getUserData = (token) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + token
        },
    };
    return axios
        .get('/api/user', headers)
        .then((res) => {
            console.log('[AUTH API] Get user info');
            return res.data.data;
        })
        .catch(() => {
            throw new Error('[Auth API] Could not get user info')
        });
}
