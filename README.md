# OSCN-JS
A Node.js wrapper for the oscn api that's currently in alpha.

# How To Use
```
npm i s oscn-js
or
yarn oscn-js
```
Then you can import it into your project like this:
```
import OSCN from 'oscn-js';
let os = new OSCN({api_key:"YOUR_API_KEY"});

os.getDockets(county,case_number).then() ..... 

```

## Example Elastic Search Query
```
let obj = {

    "query":{
 
       "bool":{
 
          "must":[
             {
                 "match":{
                     "casetype": "CF"
                 }	
             },
 
             {
 
                "nested":{
 
                   "score_mode":"max",
 
                   "path":"parties",
 
                   "query":{
 
                      "bool":{
 
                         "must":[
 
                            {
 
                               "match":{
 
                                  "parties.name":"daniel"
 
                               }
 
                            }
 
                         ]
 
                      }
 
                   }
 
                }
 
             }
 
          ]
 
       }
 
    }
 
 }

os.elasticSearchCases(obj).then(res=>{
    console.log('response from api', res);
})
```
