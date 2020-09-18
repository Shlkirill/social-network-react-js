import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '1f53d161-bcd3-47d8-8414-bda7e59dbf15',
    }
})


export const apiGetUsers = (count, page) => {
    return instance.get(`users?count=${count}&page=${page}`)
        .then((response) => {
            return response.data
        });
};

export const apiAuth = () => {
    return instance.get(`auth/me`,)
        .then((response) => {
            return response.data
        });
};

export const apiSetProfile = (userId) => {
    return instance.get(`profile/${userId}`)
        .then((response) => {
            return response.data
        });
};

export const apiGetFollowUser = (id) => {
    return instance.get(`follow/${id}`)
    .then((response) => {
        return response.data
    });
};

export const apiFollowUser = (id) => {
    return instance.post(`follow/${id}`);
};

export const apiUnfollowUser = (id) => {
    return instance.delete(`/follow/${id}`);
};