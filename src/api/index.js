import http from '../utils/request'

export const homeData = ()=>{
    return http.get('/home/getData')
}