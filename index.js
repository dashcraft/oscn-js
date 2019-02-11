const fetch = require('node-fetch');
const querystring = require('querystring');

class OSCN {
  constructor(config) {
    this.config = config;
    this.baseUrl='https://stage.oscn.net';
    if (this.config) {
      //config contains the api key
      if (!this.config.api_key) throw new Error('The api key was not defined!');
    } else {
      throw new Error('The config object was not defined!');
    }
  }

  getDockets(county, cn){
      if(!county || !cn){
          return new Promise.reject(new Error(!county ? 'The county is required!': 'The case number is required!'))
      }
    let queryObj = {
        county,
        cn
    }
    return fetch(this.returnUrl('/api/dockets',queryObj)).then(this.getJson);
  }

  getEvents(county,cn){
    if(!county || !cn){
        return new Promise.reject(new Error(!county ? 'The county is required!': 'The case number is required!'))
    }
    
    let queryObj = {
        county,
        cn
    }

    return fetch(this.returnUrl('/api/events',queryObj)).then(this.getJson);
  }

  getStyles(county, cn){
    if(!county || !cn){
        return new Promise.reject(new Error(!county ? 'The county is required!': 'The case number is required!'))
    }
    
    let queryObj = {
        county,
        cn
    }

    return fetch(this.returnUrl('/api/style',queryObj)).then(this.getJson);
  }
  
  getParties(county,cn){
    if(!county || !cn){
        return new Promise.reject(new Error(!county ? 'The county is required!': 'The case number is required!'))
    }
    
    let queryObj = {
        county,
        cn
    }

    return fetch(this.returnUrl('/api/parties',queryObj)).then(this.getJson);
  }

  getAttorneys(county,cn){
    if(!county || !cn){
        return new Promise.reject(new Error(!county ? 'The county is required!': 'The case number is required!'))
    }
    
    let queryObj = {
        county,
        cn
    }

    return fetch(this.returnUrl('/api/attorneys',queryObj)).then(this.getJson);
  }

  getOcisCases(str){
    if(!str){
        return new Promise.reject(new Error('You must enter a search string!'))
    }
    
    let queryObj = {
        q: str
    }

    return fetch(this.returnUrl('/api/ocis_cases',queryObj)).then(this.getJson);
  }

  elasticSearchCases(query){
    if(!query){
        return new Promise.reject(new Error('You must supply an Elastic Search Query'));
    }

    let headers =  { 
        method:'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body:JSON.stringify(query)
    }
    let elastQueryUrl = this.baseUrl+`/api/ocis_cases?k=${this.config.api_key}`

    return fetch(elastQueryUrl, headers).then(this.getJson);
  }

  returnUrl(endpoint, queryObj){
    queryObj.k = this.config.api_key;
    return this.baseUrl+endpoint+`?${querystring.stringify(queryObj)}`;
  }

  getJson(response) {
    return response
      .text()
      .then(text => {
        if (response.status >= 300) {
          throw new Error(text);
        }
        return text;
      })
      .then(JSON.parse);
  }
}

module.exports = OSCN;