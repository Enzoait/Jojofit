const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/search', async (req, res) => {
  const { query } = req.query;
  const foodSearch = {
    method: 'foods.search',
    search_expression: query
  };

  const url = 'https://platform.fatsecret.com/rest/server.api';
  const httpMethod = 'POST';

  try {
    const result = new FatSecretOauth1(httpMethod, url, foodSearch);
    const response = await fetch(`${url}?${result.paramString}&oauth_signature=${result.signature}`, {
      method: 'POST'
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error searching for food:', error);
    res.status(500).json({ error: 'An error occurred while searching for food.' });
  }
});

class FatSecretOauth1 {
    constructor(httpMethod, url, inputParameters) {
        this.requestUrl = url;
        this.httpMethod = httpMethod.toUpperCase();
        this.inputParameters = {
            ...inputParameters,
            format: 'json',
            oauth_consumer_key: '7dce2dfb02b2433d96dae6e41ac23330',
            oauth_nonce: uuidv4(),
            oauth_signature_method: 'HMAC-SHA1',
            oauth_timestamp: Math.floor(new Date().getTime()),
            oauth_version: '1.0'
        };
        this.paramString = this.buildRequestParameterString();
        this.signature = this.buildSignature();
        return { paramString: this.paramString, signature: this.signature };
    }

    buildSignature() {
        let method = encodeURIComponent(this.httpMethod);
        let url = encodeURIComponent(this.requestUrl);
        let params = encodeURIComponent(this.paramString);
        let signature = crypto
            .createHmac('sha1', `${'9c484c275efd4bc584be283f19915f53'}&`) //I missed the "&" after the API_KEY before hashing.
            .update(`${method}&${url}&${params}`)
            .digest()
            .toString('base64');
        return encodeURIComponent(signature);
    }

    buildRequestParameterString() {
        let params = '';
        Object.entries(this.inputParameters)
            .sort()
            .forEach((cur) => (params += `&${encodeURI(cur[0])}=${encodeURI(cur[1])}`));
        params = params.substring(1);
        return params;
    }
}

const foodSearch = {
    method: 'foods.search',  //This is the endpoint method, not the httpMethod
    search_expression: 'egg'  //Get this parameter from the endpoint documentation.
};

const searchByID = {
    method: 'food.get.v4',  //This is the endpoint method, not the httpMethod
    food_id: 27443   //Get this parameter from the endpoint documentation. 
};

let url = 'https://platform.fatsecret.com/rest/server.api';
let httpMethod = 'POST';

(async () => {
    const result = new FatSecretOauth1(httpMethod, url, foodSearch); //Call the class and add the required items.  
    const response = await fetch(`${url}?${result.paramString}&oauth_signature=${result.signature}`, {
        method: 'POST'
    });

    const data = await response.json();
    console.log('fetch Data: ', data);
})();

app.listen(3001, () => {
  console.log('Backend server is running on port 3001');
});
