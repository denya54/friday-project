import axios from "axios";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    // baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})


export const ForgotPasswordAPI = {

    forgotPassword (email: string) {
        return instance.post<ResponseForgotPassword>('/auth/forgot',
            {
                email: email,
                //ПОТОМ ПОМЕНЯТЬ ССЫЛКУ на gitpage.io
                message: `
<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/set_new_password/$token$'>link</a></div>
`,
            })
    },
    setNewPassword (newPassword: string, resetPasswordToken: string) {
        return instance.post<ResponseForgotPassword>('/auth/set-new-password',
            {
                password: newPassword,
                resetPasswordToken: resetPasswordToken
            })
    },

    checkPing() {
        return instance.get<ResponseCheckPing>('/ping')
    }
}

type ResponseForgotPassword = {
    info: string
    error: string
}

type ResponseCheckPing = {
    backTime: number
    frontTime: string
    info: string
    ping: number
}