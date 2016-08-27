(function(){

  // custom encoding function, because querystring.encode will encode the $ => %24
  function qsEncode( params ){
    return Object.keys(params).map( key => `${key}=${encodeURIComponent(params[key])}`).join('&');
  }

  /*
   * FarmersMarket
   * contact :"Paul Richard"
   * farmer_s_market : "Country Market & Craft Fair at Waimanalo Homestead Community Center"
   * island : "Oahu"
   * location_1_location : "1330 Kalanianaole Hwy."
   * location_1_state : "HI"
   * location_info : "Waimanalo Homestead Community Center"
   * phone : "(808) 259-8611, Cell: (808) 284-2575"
   * sunday : "X"
   * time : "9:00 AM to 4:00PM"
   */
  function farmersRender( farmers ){
    // append each farmer to the dom
    var container = document.getElementById('farmers');

    farmers.map(function(market){
      var child = document.createElement('div');
      child.classList.add('farmersMarket');

      var contact = document.createElement('h3');
      contact.innerHTML = market.contact || '(Missing Contact)';

      var farmer_s_market = document.createElement('h4');
      farmer_s_market.innerHTML = market.farmer_s_market;

      var location = document.createElement('p');
      location.innerHTML = market.location_info || '(Missing location)';

      child.appendChild(contact);
      child.appendChild(farmer_s_market);
      child.appendChild(location);
      return child;
    })
    .forEach(container.appendChild.bind(container));

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
    .then(farmersRender);

})();
