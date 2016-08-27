(function(){
  var farmersMarketEndpoint = 'https://data.hawaii.gov/resource/b2y9-ab7v.json';

  fetch(farmersMarketEndpoint)
    .then(function(response) {
      return response.json();
    })
    .then(console.log);

})();
