import {http} from "./config";

export const register = (data) => {
  http('register', data, 'POST', false)
}

export const login = (data) => {
   return http('login', data, 'POST', false)
}

export const user = () => {
  return http('mine', null, 'GET', true)
}

export const Dashboard = () =>{
  return http('dashboard')
}

export const Topic = () =>{
  return http('topic')
}


