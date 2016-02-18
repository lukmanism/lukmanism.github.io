$("#burger-menus").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $(this).toggleClass("fa-rotate-90");
});

// Dashboard Widget height reset
var widget_height = function(full){
  var h1 = $(window).height();
  // Site Notifications = - 140px
  // Dashboard = - 170px
  // Full = - 70px
  if(full){
    var h2 = h1-70;
  } else {
    var h2 = (h1-170)/2;
  }
  $('.widget').height(h2);
  return h2;
  // console.log('widget_height', full, h2)
}
// Dashboard menu on widget hover
$('.widget_container').hover(function(){
  $('.widget-menus', this).toggleClass('show').toggleClass('hide');
});


// Full height reset
var win_height; //shared with resize_list() & full_height()
var full_height = function(){
  var target = $('.full-height');
  var h1 = ($(window).height());
  win_height = (h1-44);
  $.each(target, function(x,y){
    var offset = $(target[x]).data('offset');
    if (typeof offset != 'undefined'){
      $(target[x]).height(win_height-offset);
    } else {
      $(target[x]).height(win_height);
    }
  })
}

//Dropdown Menus
// extend feature
$('.dropdown-custom .dropdown-menu').prepend('<span class="handle"/>');
//Hold menus from closing
$('.dropdown-menu').on({"click":function(e){
    e.stopPropagation();
  }
});


// Advance Search, Filter Search
$('.search-menus').on('click', function(e){
  // To Do: Hide menu(if display) on button click event
  var target = $(this).attr('data-target');
  $(this).toggleClass('active');
  $('.'+target).toggleClass('show');
  //resize list height
  resize_list();
  e.preventDefault();
});

// Initiate Toggle Button(On/Off)
$('.toggle').toggles();
// Initiate Show All    
$('.toggle-master').on('click', function(e){
  if($('.toggle-master').data('toggles').active){
    $('.toggle-slave').toggles(true)
  }
  e.preventDefault();
});
$('.toggle-slave').on('click', function(e){
  if($('.toggle-master').data('toggles').active){
    $('.toggle-master').toggles(false)
  }
  e.preventDefault();
});


// Maps
// Show List Menus
$('.list-item .list-properties').on('click', function(e){
  $(this).parent().find($('.list-menus')).toggleClass('show');
  e.preventDefault();
});
// Hide List Menus
$('.list-menus').on('click', function(e){
  $(this).toggleClass('show');
  e.preventDefault();
});
// Show list details
$('.list-item .list').on('click', function(e){
  if(!$(this).parent().hasClass('active')){
    // reset opened list
    var reset = $('.list-item').find($('li.active'));
    reset.removeClass('active');

    if($('.list-menus').hasClass('show')) $('.list-menus', reset).toggleClass('show');
    $('.list-details', reset).toggleClass('show');
    $('.list-properties', reset).toggleClass('show').toggleClass('active');
  }
  // assign opened list
  $(this).parent().toggleClass('active');
  $('.list-details', this).toggleClass('show');
  $('.list-properties', $(this).parent()).toggleClass('show').toggleClass('active');

  // open marker info from map OR report view after this line
  e.preventDefault();



});

// Show list popup
var list_popup = function(e){
  e.preventDefault();
}
$('.list-item .list').on('click', list_popup);

// Toggle List View
$('.toggle-list-button').on('click', function(e){
  $('.toggle-list-container .list-y-scroll').toggleClass('hide');
  $('.toggle-list-container').toggleClass('active');
  $(this).toggleClass('fa-tachometer').toggleClass('fa-list-ul');
  e.preventDefault();
});

// Toggle .short-desc
$('.short-desc').on('click', function(e){
  $(this).toggleClass('').toggleClass('short-desc');
  e.preventDefault();
});

function resize_list(){      
  var search_height = $('.search').height();
  var resize = (win_height-search_height-40);
  $('.list-y-scroll .box-container').height(resize)
}

function getUrlParameter(sParam){
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++){
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam){
      return sParameterName[1];
    }
  }
}

function renderWidget(type){
  $(".widget .canvas").html(''); // reset canvas
  $('.page_container').html($('#widget_'+getUrlParameter('id'))); // insert widget to page_container
  switch(type){
    case "chart-bar":
      renderBarChart('body');
    break;
    case "chart-area":
      renderAreaChart('body');
    break;
    case "map":
      renderMap('map', '#widget_3');
    break;
    case "gauge":
      renderGauge('#widget_4', ["speed", "fuel", "rpm", "memory1", "cpu1", "network1"]);
    break;
    default:
      renderBarChart('body');
      renderAreaChart('body');
      // do nothing for now
    break;
  }
  $('.page_container').removeClass('opaque-0').addClass('opaque-100'); // display page view transition 
}

function renderDashboardFull(){
  setTimeout(function(){
    renderWidget(getUrlParameter('type'));
  }, 500);
}

$(document).ready(function(){
  $('.new_window').on('click', function(e){
    window.open('?type='+$(this).attr('data-type')+'&id='+$(this).attr('data-id'));
    e.preventDefault();
  });

  if (null!=opener){ // new window
    renderDashboardFull();
    widget_height(true);
  } else { // original window
    $('.page_container').removeClass('opaque-0').addClass('opaque-100'); // display page view transition
    full_height();
    widget_height(false);
    resize_list();
  }
});

$(window).resize(function(){
  if (null!=opener){ // new window
    renderDashboardFull();
    widget_height(true);
  } else { // original window
    // renderDashboardFull();
    full_height();
    widget_height(false);
    resize_list();
    renderBarChart('#widget_2');
    renderAreaChart('#widget_1');
    renderMap('map');
    // renderGauge();
  }
});

