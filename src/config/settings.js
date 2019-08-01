'use strict';
// export let  defaultURL = "http://localhost:3001"
// export let  defaultDomain = "http://45.77.119.133:8080"

export let  defaultURL = "https://api.cryptobusinesscompany.com"
export let  defaultDomain = "https://app.cryptobusinesscompany.com"


export function logout(){
  localStorage.removeItem("auth_token")
  localStorage.removeItem("vuex")
  window.location.replace("#/login")
}

export function userData(){
  return JSON.parse(localStorage.getItem("user"))
}

export function setUser(val){
  return localStorage.setItem("user", JSON.stringify(val))
}

export function validateDelete() {
  const answer = window.confirm('Do you really want to destroy?')
  if (answer) return true
}