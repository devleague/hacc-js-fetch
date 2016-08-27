(function(){

  // custom encoding function, because querystring.encode will encode the $ => %24
  function qsEncode( params ){
    return Object.keys(params).map( key => `${key}=${encodeURIComponent(params[key])}`).join('&');
  }

  var FarmersMarketList = React.createClass({
    render: function() {
      return <div>
        { this.props.farmers.map(market =>
          <FarmersMarket
           contact={market.contact}
           farmer_s_market={market.farmer_s_market}
           location_info={market.location_info}
           />
          )
        }
      </div>;
    }
  });

  var FarmersMarket = React.createClass({
    render: function() {
      return <div>
        <h3>{this.props.contact}</h3>
        <h4>{this.props.farmer_s_market}</h4>
        <p>{this.props.location_info}</p>
      </div>;
    }
  });

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
    ReactDOM.render(
      <FarmersMarketList farmers={farmers} />,
      document.getElementById('farmers')
    );
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
