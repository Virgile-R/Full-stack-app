/**
 * Helper class to help user fetching and auth
 */

import { response } from "express"

export default class DataFetching {
    constructor(){
        this.apiBaseURL = 'http://localhost/api/'
    }

    /**
     * wraps the fetch API to avoid constructing the request again and again
     * @param {string} path
     * @param {string} method
     * @param {object} body
     * @param {boolean} requiresAuth
     * @param {object} credentials
     *  
    */
    fetchData(path, method = 'GET', body = null, requiresAuth = false, credentials = null){
        const url = this.apiBaseURL + path
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',  
            }
        }
        // if the body contains something, it is passed as option
        if (body !== null){
            options.body = JSON.stringify(body)
        }
        // if the route requires authentification, authentification is passed through credentials. Btoa is marked as deprecated in Node
        if (requiresAuth){
            const encodedCredentials = Buffer.from(`${credentials.username}:${credentials.password}`, 'base64')
            options.headers['Authorization'] = `Basic ${encodedCredentials}`
        }
        //finally, the fetch API is called with the options provided
        return fetch(url, options)
    }

    /** 
     * Function to get an user from the database
     * @param {string} username
     * @param {string} password
    */
   async getUser(username, password){
       //request info from the API
       const reponse = await this.apiBaseURL(`/users`, 'GET', null, true, {username, password})
       //if the response is OK, sends the user data to the next step
       if (response.status === 200){
           return reponse.json().then(data => data)
       } 
       //if the credentials are wrong, then nothing is returned
       else if (reponse.status === 401){
           return null
       } else {
           throw new Error()
       }
   }
   /**
    * Helper function to create an user in the database
    * @param {object} user 
    * @returns null if successful, an array with validation errors if the request was malformed.
    */
   async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

}