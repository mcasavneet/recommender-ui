$(document).ready(function(){

document.getElementById('dollara_result').style.visibility='hidden';

$( "#getTopDemandButton" ).on( "click", function() {

    var getTopDSPButtonUrl =  'http://172.16.4.177:1789/analytics/topPartners?dimension=dspId';
    var getTopATDButtonUrl =  'http://172.16.4.177:1789/analytics/topPartners?dimension=atdId';
    var urlStringForDATA = "";
    var platform = [];
		$('#platform :selected').each(function(i, selected){
  					platform[i] = $(selected).val();
  					urlStringForDATA = urlStringForDATA + '&platformIds='+platform[i];
  		 });
    //alert(getTopDSPButtonUrl);
    var iab_cat = [];
		$('#iab_cat :selected').each(function(i, selected){
  					iab_cat[i] = $(selected).val();
  					urlStringForDATA = urlStringForDATA + '&categoryIds='+iab_cat[i];
  		 });

    var geos = [];
		$('#geos :selected').each(function(i, selected){
  					geos[i] = $(selected).val();
  					urlStringForDATA = urlStringForDATA + '&geoIds='+geos[i];
  		 });

        getTopDSPButtonUrl=getTopDSPButtonUrl+urlStringForDATA;
        getTopATDButtonUrl=getTopATDButtonUrl+urlStringForDATA;



    $.ajax({
        type: 'GET',
        url: getTopDSPButtonUrl,
        data: { PubToken: 'adminuser' },
        dataType: 'json',
        success: function (data) {
        document.getElementById('dollara_result').style.visibility='visible';
        	 $.each( data, function( i, item ) {
        	        if( i<6){

        	           var displayString = "Name : "+ item.name +"<br>" +"Revenue : "+item.revenue+"<br>" +"ecpm : "+item.ecpm;
        	           var dsp_id="Dsp_"+i;console.log(dsp_id);
        	           document.getElementById(dsp_id).innerHTML = displayString;
        	        }

              });

        }
    });

    $.ajax({
        type: 'GET',
        url: getTopATDButtonUrl,
        data: { PubToken: 'adminuser' },
        dataType: 'json',
        success: function (data) {
        document.getElementById('dollara_result').style.visibility='visible';
        	 $.each( data, function( i, item ) {
        	        if( i<6){

        	           var displayString = "Name : "+ item.name +"<br>" +"Revenue : "+item.revenue+"<br>" +"ecpm : "+item.ecpm;
        	           var atd_id="atd_"+i;console.log(atd_id);
        	           document.getElementById(atd_id).innerHTML = displayString;
        	        }

              });

        }
    });
});

});