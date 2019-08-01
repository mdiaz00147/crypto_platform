import axios from 'axios';
// import * as config from "@/config/settings";
// import { store } from '@/store/index'

export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API
})