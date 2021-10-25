/**
 * Helper class to help user fetching and auth
 */



export default class DataFetching {
    constructor(){
        this.apiBaseURL = 'http://localhost:5000/api'
    }

    /**
     * wraps the fetch API to avoid constructing the request again and again
     * @param {string} path path to the API
     * @param {string} method HTML Method
     * @param {object} body Body of the request
     * @param {boolean} requiresAuth If the route requires auth or not
     * @param {object} credentials If the route requires auth, the credentials
     *  
    */
    fetchData(path, method = 'GET', body = null, requiresAuth = false, credentials = null){
        const url = this.apiBaseURL + path
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',  
            },
            mode: 'cors'
        }
        // if the body contains something, it is passed as option
        if (body !== null){
            options.body = JSON.stringify(body)
        }
        // if the route requires authentification, authentification is passed through credentials. Btoa is marked as deprecated in Node
        if (requiresAuth){
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`)
            options.headers['Authorization'] = `Basic ${encodedCredentials}`
        }
        //finally, the fetch API is called with the options provided
        console.log(options)
        return fetch(url, options)
    }

    /** 
     * Function to get an user from the database
     * @param {string} username
     * @param {string} password
    */
   async getUser(emailAddress, password){
       //request info from the API
       const response = await this.fetchData(`/users`, 'GET', null, true, {emailAddress, password})
       //if the response is OK, sends the user data to the next step
       if (response.status === 200){
           return response.json().then(data => data)
       } 
       //if the credentials are wrong, then nothing is returned
       else if (response.status === 401){
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