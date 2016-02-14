$(document).ready(function() {
	$(".linkpop").fancybox({
		'margin'		: 0,
		'padding'		: 0,
		'width'			: '80%',
		'height'		: '80%',
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'elastic',
		'autoScale'		: false,
		'overlayShow'	: false,
		'type'			: 'iframe'
	});
});

$(function(){
	$("#header").delay(2200).animate({"top": "+=87px"}, 600);
});

function poplash(){
	$("a#popup").trigger("click");
}
function popup(site){ 
	$("#popup").fancybox({
		'margin'		: 0,
		'padding'		: 0,
		'width'			: '80%',
		'height'		: '80%',
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'elastic',
		'type'			: 'iframe',
		'href'			: ''+site+'',
		'autoScale'		: false,
		'overlayShow'	: false,
		'onStart'		: function(){$("body").css({'overflow':'hidden'});},
		'onClosed'		: function(){$("body").css({"overflow":"visible"});}
	});
	poplash();
}

var infowindow;
var map;

function initialize() {
  var myLatlng = new google.maps.LatLng(4.3464112753331925, 107.81982421875);
  var myOptions = {
	zoom: 6,
	center: myLatlng,
	mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  downloadUrl("portfolios.xml", function(data) {
	var markers = data.documentElement.getElementsByTagName("marker");	
	for (var i = 0; i < markers.length; i++) {
	var markeritem = data.documentElement.getElementsByTagName("markeritem");
	  var latlng = new google.maps.LatLng(parseFloat(markers[i].getAttribute("lat")),
								  parseFloat(markers[i].getAttribute("lng")));
	  var name = markers[i].getAttribute("name");
	  var desc = markers[i].getAttribute("desc");	
	  var url = markers[i].getAttribute("url");	
	  var icon = markers[i].getAttribute("icon");		
	  var marker = createMarker(name, desc, url, icon, latlng);
	 }
   });
}

function createMarker(name, desc, url, icon, latlng) {	
	var marker = setMarker(icon, latlng)
	var url = 'http://'+url;
  google.maps.event.addListener(marker, "click", function() {
	if (infowindow) infowindow.close();
	infowindow = new google.maps.InfoWindow({
	  content: [
		'<div class="info"><strong>Client/ Project Name:</strong><p>'+name+'</p>',
		'<strong>Role:</strong>',
		'<p>'+desc+'</p>',
		'<strong>View site:</strong>',
		'<p><ul><li><a onClick="parent.popup(\''+url+'\')\;" href="#">this window</a></li><li><a href="'+url+'" target="_blank">new window</a></li></ul></p>',
		'<p class="pardon">*pardon me, some link might not work<br/>properly due to the nature of having the<br/>entire site archived, removed, being removed,<br/>change of business, etc. by the owner.</p>',
		'<p class="flush_right"><a href="http://www.addthis.com/bookmark.php?v=20" onmouseover="return addthis_open(this, \'\', \''+url+'\', \''+name+'\');" onmouseout="addthis_close();" onclick="return addthis_sendto();"><img src="http://s7.addthis.com/static/btn/sm-plus.gif" width="16" height="16" border="0" alt="Share" /></a></p></div>',
	  ].join('')		  
	  });
	infowindow.open(map, marker);
  });
  return marker;
}

function setMarker(icon,latlng) {	
	switch(icon){
		case 'yellow':
			var image_path = 'images/marker_yellow.png';
		break;
		case 'pink':
			var image_path = 'images/marker_pink.png';
		break;
		case 'green':
			var image_path = 'images/marker_green.png';
		break;
		default:
			var image_path = 'images/marker_sprite.png';
	}	
	var image = new google.maps.MarkerImage(image_path,
		new google.maps.Size(57, 34),
		new google.maps.Point(0,0),
		new google.maps.Point(0, 34));
	var shape = {
		coord: [1, 1, 1, 20, 18, 20, 18 , 1],
		type: 'poly'  
	};		
	var marker = new google.maps.Marker({
		position: latlng, 
		map: map,
		icon: image,
		shape: shape
	});
	return marker;

} 
