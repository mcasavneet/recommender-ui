$(document).ready(function(){
	   var selectedDataBlockId ;
	   
	 function createOffer() {
      var valid = true;
      name = document.getElementById('name').value;
		ecpm = document.getElementById('ecpm').value;
 		jsonObj = [];
		item={};
		item["name"]=name;
		item["ecpm"]=ecpm;
		var savedSearchData = selectedDataBlockId.split(',');
		item["name"]=name;
		item["ecpm"]=ecpm;
		item["startDate"]=savedSearchData[1];
		item["endDate"]=savedSearchData[2];
		item["accountId"]=savedSearchData[3];
		item["accountType"]=savedSearchData[4];
		jsonObj.push(item);
      console.log(jsonObj);
      var jsonString = JSON.stringify(jsonObj);
      console.log(jsonString);
      
		var url = 'http://172.16.4.177:1788/offers/create';
		$.post(url,jsonString,function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}
		
		
		
		
	   dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      modal: true,
      buttons: {
        "Create Offer": createOffer,
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
    		dialog.dialog( "close" );
      }
    });
 
    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      addUser();
    });
 
    $( "#createOfferButton" ).button().on( "click", function() {
		if(selectedDataBlockId === undefined){
			alert('Please select any saved search');  
			return;
		}    
      dialog.dialog( "open" );
    });
    
    
	$(function() {
    $( "#tabs" ).tabs();
 	 });
function split( val ) {
      return val.split( /,\s*/ );
    }
function extractLast( term ) {
      return split( term ).pop();
    }

$.ajax({ 
    type: 'GET', 
    url: 'http://172.16.4.177:1788/common/buyer?pageSize=20&pageNumber=1&pmpEnabled=1&filters=loggedInOwnerId%20eq%2031445&filters=loggedInOwnerTypeId%20eq%201', 
    data: { PubToken: 'adminuser' }, 
    dataType: 'json',
    success: function (data) { 
        /*for (var i = 0, len = data.items.length; i < len; i++) {
        		 $('#buyerFilter').append($('<option/>', { 
       				 value: data.items[i].id,
     					 text : data.items[i].name
    	}));
    }*/
    var buyersList = [] ;
    for (var index = 0;index < data.items.length;index++) {
    	buyersList[index] = data.items[index].name + '[' + data.items[index].id + ']';
    }
    $( "#buyerFilter" )
      // don't navigate away from the field on tab when selecting an item
      .bind( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function( request, response ) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            buyersList, extractLast( request.term ) ) );
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var terms = split( this.value );
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( "" );
          this.value = terms.join( ", " );
          return false;
        }
      }); 
	    
    
 }
    
});

$.ajax({ 
    type: 'GET', 
    url: 'http://172.16.4.177:1788/common/advertiser?pageSize=20&pageNumber=1&pmpEnabled=1&filters=loggedInOwnerId%20eq%2031445&filters=loggedInOwnerTypeId%20eq%201', 
    data: { PubToken: 'adminuser' }, 
    dataType: 'json',
    success: function (data) { 
    var dspList = [] ;
    for (var index = 0;index < data.items.length;index++) {
    	dspList[index] = data.items[index].name + '[' + data.items[index].id + ']';
    }
    $( "#dspFilter" )
      // don't navigate away from the field on tab when selecting an item
      .bind( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function( request, response ) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            dspList, extractLast( request.term ) ) );
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var terms = split( this.value );
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( "" );
          this.value = terms.join( ", " );
          return false;
        }
      }); 
	    
    
 }
    
});

$.ajax({ 
    type: 'GET', 
    url: 'http://172.16.4.177:1788/common/platform?pageSize=20&pageNumber=1&pmpEnabled=1', 
    data: { PubToken: 'adminuser' }, 
    dataType: 'json',
    success: function (data) { 
       var platformList = [] ;
    for (var index = 0;index < data.items.length;index++) {
    	platformList[index] = data.items[index].name + '[' + data.items[index].id + ']';
    }
    $( "#platformFilter" )
      // don't navigate away from the field on tab when selecting an item
      .bind( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function( request, response ) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            platformList, extractLast( request.term ) ) );
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var terms = split( this.value );
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( "" );
          this.value = terms.join( ", " );
          return false;
        }
      }); 
	    
    
 }
    
});


$.ajax({ 
    type: 'GET', 
    url: 'http://172.16.4.177:1788/common/geo?pageSize=100&pageNumber=1&pmpEnabled=1&filters=loggedInOwnerId%20eq%2031445&filters=loggedInOwnerTypeId%20eq%201', 
    data: { PubToken: 'adminuser' }, 
    dataType: 'json',
    success: function (data) {  
    var geoList = [] ;
    for (var index = 0;index < data.items.length;index++) {
    	geoList[index] = data.items[index].name + '[' + data.items[index].id + ']';
    }
    $( "#geoFilter" )
      // don't navigate away from the field on tab when selecting an item
      .bind( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function( request, response ) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            geoList, extractLast( request.term ) ) );
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var terms = split( this.value );
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( "" );
          this.value = terms.join( ", " );
          return false;
        }
      }); 
	    
    
 }
    
});



$.ajax({ 
    type: 'GET', 
    url: 'http://172.16.4.177:1788/common/adSize?pageSize=20&pageNumber=1', 
    data: { PubToken: 'adminuser' }, 
    dataType: 'json',
    success: function (data) { 
    var adSizeList = [] ;
    for (var index = 0;index < data.items.length;index++) {
    	adSizeList[index] = data.items[index].name + '[' + data.items[index].id + ']';
    }
    $( "#adSizeFilter" )
      // don't navigate away from the field on tab when selecting an item
      .bind( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function( request, response ) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            adSizeList, extractLast( request.term ) ) );
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var terms = split( this.value );
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( "" );
          this.value = terms.join( ", " );
          return false;
        }
      }); 
	    
    
 }
    
});

$("#data_table").on('click', 'tr', function () {
	if(document.getElementById(selectedDataBlockId) != null) {
			document.getElementById(selectedDataBlockId).style.color="black";
			document.getElementById(selectedDataBlockId).style.fontWeight ="normal";
	}
	document.getElementById(this.id).style.color = "blue";
	document.getElementById(this.id).style.fontWeight ="bold";
   selectedDataBlockId = this.id;
    
});

$( "#applyFilterButton" ).on( "click", function() {
    var savedSearchUrl =  'http://172.16.4.177:1788/SavedOfferAlerts/filter?'   
    var buyerList= document.getElementById("buyerFilter").value;
    var buyers = buyerList.split(","); 
    for(var index = 0 ; index < buyers.length - 1 ; index++) {
	 				//alert(buyers[index]);
  					if(index == 0)
  						savedSearchUrl = savedSearchUrl + 'buyerIds='+buyers[index].substr(buyers[index].length-2,1);
  					else {
  						savedSearchUrl = savedSearchUrl + ',' + buyers[index].substr(buyers[index].length-2,1);
  					}
  	 }
  	 
  	 var dspList= document.getElementById("dspFilter").value;
    var dsps = dspList.split(","); 
    for(var index = 0 ; index < dsps.length - 1 ; index++) {
	 				//alert(buyers[index]);
  					if(index == 0)
  						savedSearchUrl = savedSearchUrl + '&dspIds='+dsps[index].substr(dsps[index].length-2,1);
  					else {
  						savedSearchUrl = savedSearchUrl + ',' + dsps[index].substr(dsps[index].length-2,1);
  					}
  	 }
  	 
  	 var platformList= document.getElementById("platformFilter").value;
    var platforms = platformList.split(","); 
    for(var index = 0 ; index < platforms.length - 1 ; index++) {
	 				//alert(buyers[index]);
  					if(index == 0)
  						savedSearchUrl = savedSearchUrl + '&platformIds='+ platforms[index].substr(platforms[index].length-2,1);
  					else {
  						savedSearchUrl = savedSearchUrl + ',' + platforms[index].substr(platforms[index].length-2,1);
  					}
  	 }
  	 
  	 var geoList= document.getElementById("geoFilter").value;
    var geos = geoList.split(","); 
    for(var index = 0 ; index < geos.length - 1 ; index++) {
	 				//alert(buyers[index]);
  					if(index == 0)
  						savedSearchUrl = savedSearchUrl + '&geoIds='+geos[index].substr(geos[index].length-2,1);
  					else {
  						savedSearchUrl = savedSearchUrl + ',' + geos[index].substr(geos[index].length-2,1);
  					}
  	 }
  	 
  	 var adsizeList= document.getElementById("adSizeFilter").value;
    var adsizes = adsizeList.split(","); 
    for(var index = 0 ; index < adsizes.length - 1 ; index++) {
	 				//alert(buyers[index]);
  					if(index == 0)
  						savedSearchUrl = savedSearchUrl + '&adsizeIds='+adsizes[index].substr(adsizes[index].length-2,1);
  					else {
  						savedSearchUrl = savedSearchUrl + ',' + adsizes[index].substr(adsizes[index].length-2,1);
  					}
  	 }
 	 alert(savedSearchUrl);
   $.ajax({ 
    type: 'GET', 
    url: savedSearchUrl, 
    data: { PubToken: 'adminuser' }, 
    dataType: 'json',
    success: function (data) {
    	  $('#data_table').empty(); 
    	  $('#dataBlock').show();
        for (var i = 0, len = data.content.length; i < len; i++) {
        		 var nam = data.content[i].uijson.name;
        		 var startDate = data.content[i].uijson.startDate
        		 var endDate = data.content[i].uijson.endDate
        		 var requestedById = data.content[i].uijson.requestedBy;
        		 var compCount = data.content[i].uijson.competitionValue;
        		 var impressions = data.content[i].uijson.formattedImpressions;
				 var ecpm = data.content[i].uijson.formattedCPM;
        		 var geos = data.content[i].uijson.geoList;
        		 var platforms = data.content[i].uijson.platformList;
        		 var adSizes = data.content[i].uijson.adSizeList;
        		 var preapproved = data.content[i].uijson.preApproved;
        		 var searchTag = data.content[i].uijson.searchTags;
        		 var tbodyId = nam + ',' + data.content[i].startDate + ',' + data.content[i].endDate + ',' + data.content[i].accountId + ',' + data.content[i].accountType;  
        		 $('#savedSearchfieldset').show();
        		 $('#createOfferButtonDiv').show();

        		 $('#data_table').append( '<tbody id=\'' + tbodyId + '\'class=\'dataBlockTbody\'><tr id=\'' + tbodyId + '\'>' +
        		 '<td>Name :</td><td>' + nam + '</td>' +
        		 '<td>Start date :</td><td>' + startDate + '</td>' +
        		 '<td>End date :</td><td>' + endDate + '</td>' +
        		 '</tr><tr id=\'' + tbodyId + '\'>' +
        		 '<td>Requested By :</td><td>' + requestedById + '</td>' +
        		 '<td>Impressions :</td><td>' + impressions + '</td>' +
        		 '</tr><tr id=\'' + tbodyId + '\'>' +
        		 '<td>Ecpm :</td><td>' + ecpm + '</td>' +
        		 '<td>Geos :</td><td>' + geos + '</td>' +
        		 '</tr><tr id=\'' + tbodyId + '\'>' +
        		 '<td>Platforms :</td><td>' + platforms + '</td>' +
				 '<td>AdSizes :</td><td>' + adSizes + '</td>' +
				 '</tr><tr id=\'' + tbodyId + '\'>' +
				 '<td>Pre Approved :</td><td>' + preapproved + '</td>' +
				 '<td>Search Tag :</td><td>' + searchTag + '</td>' +
				 '<tr id=\'' + tbodyId + '\'><td colspan="10"><hr></td></tr>' +
        		 '</tr></tbody>'); 
			
				  //$('#data_table').append('<div id='+);
        		 
        		 
    }
    }
});
});
	
});