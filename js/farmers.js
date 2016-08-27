(function(){

  // custom encoding function, because querystring.encode will encode the $ => %24
  function qsEncode( params ){
    return Object.keys(params).map( key => `${key}=${encodeURIComponent(params[key])}`).join('&');
  }

  var farmersMarketEndpoint = 'https://data.hawaii.gov/resource/b2y9-ab7v.json';

  var queryParams = {
    $limit : 50
  };

  var farmersRequest = new Request(farmersMarketEndpoint + "?" + qsEncode(queryParams));

  fetch(farmersRequest)
    .then(function(response) {
      return response.json();
    })
    .then(console.log);

})();
