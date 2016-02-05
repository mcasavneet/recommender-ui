$(document).ready(function(){
	$(function() {
    $( "#tabs" ).tabs();
 	 });
 	 
$.ajax({ 
    type: 'GET', 
    url: 'http://172.16.4.177:1789/common/buyer?pageSize=20&pageNumber=1&pmpEnabled=1&filters=loggedInOwnerId%20eq%2031445&filters=loggedInOwnerTypeId%20eq%201', 
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
    url: 'http://172.16.4.177:1789/common/advertiser?pageSize=20&pageNumber=1&pmpEnabled=1&filters=loggedInOwnerId%20eq%2031445&filters=loggedInOwnerTypeId%20eq%201', 
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
    url: 'http://172.16.4.177:1789/common/platform?pageSize=20&pageNumber=1&pmpEnabled=1', 
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
    url: 'http://172.16.4.177:1789/common/geo?pageSize=100&pageNumber=1&pmpEnabled=1&filters=loggedInOwnerId%20eq%2031445&filters=loggedInOwnerTypeId%20eq%201', 
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
    url: 'http://172.16.4.177:1789/common/adSize?pageSize=20&pageNumber=1', 
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
        
    var buyer = $('#buyerFilter :selected').val();
    if(buyer == 'Select a Buyer')
    		buyer='';
    		
    var dsp = $('#dspFilter :selected').val();
    if(dsp == 'Select a DSP')
    		dsp='';
    		
    var plat = $('#platformFilter :selected').val();
    if(plat == 'Select a Platform')
    		plat='';
    		
    var geo = $('#geoFilter :selected').val();
    if(geo == 'Select a Geo')
    		geo='';
    		
    var adSize = $('#adSizeFilter :selected').val();
    if(adSize == 'Select a AdSize')
    		adSize='';
    		
    var comp = $('input[name=competition]:checked', '#filtersForm').val()		
    		
});

});