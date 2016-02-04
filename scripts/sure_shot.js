$(document).ready(function(){
	$(function() {
    $( "#tabs" ).tabs();
 	 });


$.ajax({ 
    type: 'GET', 
    url: 'http://localhost:9090/common/buyer?pageSize=20&pageNumber=1&pmpEnabled=1&filters=loggedInOwnerId%20eq%2031445&filters=loggedInOwnerTypeId%20eq%201', 
    data: { PubToken: 'adminuser' }, 
    dataType: 'json',
    success: function (data) { 
        for (var i = 0, len = data.items.length; i < len; i++) {
        		 $('#buyerFilter').append($('<option/>', { 
       				 value: data.items[i].id,
     					 text : data.items[i].name
    	}));
    }
    }
});

$.ajax({ 
    type: 'GET', 
    url: 'http://localhost:9090/common/advertiser?pageSize=20&pageNumber=1&pmpEnabled=1&filters=loggedInOwnerId%20eq%2031445&filters=loggedInOwnerTypeId%20eq%201', 
    data: { PubToken: 'adminuser' }, 
    dataType: 'json',
    success: function (data) { 
        for (var i = 0, len = data.items.length; i < len; i++) {
        		 $('#dspFilter').append($('<option/>', { 
       				 value: data.items[i].id,
     					 text : data.items[i].name
    	}));
    }
    }
});

$.ajax({ 
    type: 'GET', 
    url: 'http://localhost:9090/common/platform?pageSize=20&pageNumber=1&pmpEnabled=1', 
    data: { PubToken: 'adminuser' }, 
    dataType: 'json',
    success: function (data) { 
        for (var i = 0, len = data.items.length; i < len; i++) {
        		 $('#platformFilter').append($('<option/>', { 
       				 value: data.items[i].id,
     					 text : data.items[i].name
    	}));
    }
    }
});

$.ajax({ 
    type: 'GET', 
    url: 'http://localhost:9090/common/geo?pageSize=100&pageNumber=1&pmpEnabled=1&filters=loggedInOwnerId%20eq%2031445&filters=loggedInOwnerTypeId%20eq%201', 
    data: { PubToken: 'adminuser' }, 
    dataType: 'json',
    success: function (data) { 
        for (var i = 0, len = data.items.length; i < len; i++) {
        		 $('#geoFilter').append($('<option/>', { 
       				 value: data.items[i].id,
     					 text : data.items[i].name
    	}));
    }
    }
});



$.ajax({ 
    type: 'GET', 
    url: 'http://localhost:9090/common/adSize?pageSize=20&pageNumber=1', 
    data: { PubToken: 'adminuser' }, 
    dataType: 'json',
    success: function (data) { 
        for (var i = 0, len = data.items.length; i < len; i++) {
        		 $('#adSizeFilter').append($('<option/>', { 
       				 value: data.items[i].id,
     					 text : data.items[i].name
    	}));
    }
    }
});

$( "#applyFilterButton" ).on( "click", function() {
    var savedSearchUrl =  'http://localhost:9090/SavedOfferAlerts/filter?'    
    var buyers = []; 
		$('#buyerFilter :selected').each(function(i, selected){ 
  					buyers[i] = $(selected).val(); 
  					if(i == 0)
  						savedSearchUrl = savedSearchUrl + 'buyerIds='+buyers[i];
  					else {
  						savedSearchUrl = savedSearchUrl + ',' + buyers[i];
  					}
  		 });
    //alert(savedSearchUrl);		
    var dsps = []; 
		$('#dspFilter :selected').each(function(i, selected){ 
  					dsps[i] = $(selected).val(); 
  					if(i == 0)
  						savedSearchUrl = savedSearchUrl + '&dspIds='+dsps[i];
  					else {
  						savedSearchUrl = savedSearchUrl + ',' + dsps[i];
  					}
  		 });
    		
    var geoIds = []; 
		$('#geoFilter :selected').each(function(i, selected){ 
  					geoIds[i] = $(selected).val(); 
  					if(i == 0)
  						savedSearchUrl = savedSearchUrl + '&geoIds='+geoIds[i];
  					else {
  						savedSearchUrl = savedSearchUrl + ',' + geoIds[i];
  					}
  		 });
  		 
  	var plats = []; 
		$('#platformFilter :selected').each(function(i, selected){ 
  					plats[i] = $(selected).val(); 
  					if(i == 0)
  						savedSearchUrl = savedSearchUrl + '&platformIds='+plats[i];
  					else {
  						savedSearchUrl = savedSearchUrl + ',' + plats[i];
  					}
  		 });
  		 
  	var adSizes = []; 
		$('#adSizeFilter :selected').each(function(i, selected){ 
  					adSizes[i] = $(selected).val(); 
  					if(i == 0)
  						savedSearchUrl = savedSearchUrl + '&adSizeIds='+adSizes[i];
  					else {
  						savedSearchUrl = savedSearchUrl + ',' + adSizes[i];
  					}
  		 });
    /*var competition = $("#filtersForm input[type='radio']:checked").val();	
 	 savedSearchUrl = savedSearchUrl + '&nocompetition=' + competition	*/ 
 	 //alert(savedSearchUrl);
   $.ajax({ 
    type: 'GET', 
    url: savedSearchUrl, 
    data: { PubToken: 'adminuser' }, 
    dataType: 'json',
    success: function (data) {
    	  $('#data_table').empty(); 
        for (var i = 0, len = data.content.length; i < len; i++) {
        		 var nam = data.content[i].name;
        		 var startDate = new Date(data.content[i].startDate).toUTCString();
        		 var endDate = new Date(data.content[i].endDate).toUTCString();
        		 //alert(startDate);
        		 var requestedById = data.content[i].accountId;
        		 var compCount = data.content[i].count;
        		 alert(compCount);
        		 var lowerImpressions = data.content[i].searchFilters.lowerImpression;
        		 var higherImpressions = data.content[i].searchFilters.higerImpression;
        		 var impressions = lowerImpressions.toString() + "-" + higherImpressions.toString();

        		 var lowerecpm = data.content[i].searchFilters.lowerCPM; ;
        		 var higherecpm = data.content[i].searchFilters.higherCPM; ;
        		 var ecpm = lowerecpm.toString() + "-" + higherecpm.toString();
        		 var geos = '';
        		 for(var index = 0 ; index < data.content[i].searchFilters.geoIds.length ; index++) {
        		 	var geoId = data.content[i].searchFilters.geoIds[index];
        		 	geos = geos + ',';
        		 }
        		 geos.toString().substring(0,geos.length-2);
        		 
        		 var platforms = '';
        		 for(var index = 0 ; index < data.content[i].searchFilters.platformIds.length ; index++) {
        		 	var platformId = data.content[i].searchFilters.platformIds[index];
        		 	platforms = platforms + ',';
        		 }
        		 platforms.toString().substring(0,platforms.length-2);
        		 
        		 var adSizes = 'Not Available in Response';
        		 /*for(var index = 0 ; index < platformIds.length ; index++) {
        		 	
        		 }*/
        		 var preapproved = data.content[i].searchFilters.preApproved; ;
        		 var searchTag = 'Not Available in Response';
        		 $('#data-table-summary').show();
        		
        		 /*$('#data_table').append( '<tbody><tr><th class="data-table-th">Name :</th><td class="data-table-td">' + nam + '</td>' +
        		 '<th class="data-table-th">Start date :</th><td class="data-table-td">' + startDate + '</td>' +
        		 '<th class="data-table-th">End date :</th><td class="data-table-td">' + endDate + '</td>' +
        		 '</tr>' +
        		 '<tr><th class="data-table-th">Requested By :</th><td class="data-table-td">' + requestedById + '</td>' +
        		 '<th class="data-table-th">Competition Count :</th><td class="data-table-td">' + compCount + '</td>' +
        		 '</tr></tbody>' ); */
			
				  //$('#data_table').append('<div id='+);
        		 
        		 
    }
    }
});

    		
});

});