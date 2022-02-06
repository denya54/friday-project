import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true,
});

export type RegisterDataType = {
    email: string,
    password: string,
}

type RegisterResponseType = {
    addedUser: {}
    error?: string
}

export const RegisterAPI = {
    signUp (email: string, password: string) {
         return instance.post<RegisterResponseType>("/auth/register", {email, password});
    },
};

