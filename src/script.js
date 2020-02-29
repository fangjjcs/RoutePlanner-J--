// add class : animation-play-state: paused

/*********************************************/
var respond = {
  "location":{
    "start":{
      "top_right":{
        "lat":[40.725362, 40.742862,40.744125 ],
        "lng":[-74.002692, -74.000311, -73.983645 ]
      },
      "top_left":{
        "lat":[40.725362, 40.742862,40.744125 ],
        "lng":[-74.002692, -74.000311, -73.983645 ]
      },
      "bottom_right":{
        "lat":[40.725362, 40.742862,40.744125 ],
        "lng":[-74.002692, -74.000311, -73.983645 ]
      },
      "bottom_left":{
        "lat":[40.725362, 40.742862,40.744125 ],
        "lng":[-74.002692, -74.000311, -73.983645 ]
      }
    },
    "end":{
      "top_right":{
        "lat":[40.725362, 40.742862,40.744125 ],
        "lng":[-74.002692, -74.000311, -73.983645 ]
      },
      "top_left":{
        "lat":[40.725362, 40.742862,40.744125 ],
        "lng":[-74.002692, -74.000311, -73.983645 ]
      },
      "bottom_right":{
        "lat":[40.725362, 40.742862,40.744125 ],
        "lng":[-74.002692, -74.000311, -73.983645 ]
      },
      "bottom_left":{
        "lat":[40.725362, 40.742862,40.744125 ],
        "lng":[-74.002692, -74.000311, -73.983645 ]
      }
    },
    "indicators":[0.775,0.56,0.85]
  }
  
};   


/*********************************************/

/**************** 載入頁 進度條 ****************/
var percentage = 0;
var timer = setInterval(function(){
  $(".bar").css("width",percentage+"%")
  percentage+=1
  if(percentage>100){
    //透過跑完bar之後新增一個class給pageloading
    //目標是讓此載入頁消失
    $(".pageLoading").addClass("complete")
    $(".taxi").css("animation-play-state","paused")

    $(".stop img").css("opacity",1)
    $(".billborad").css("opacity",1)
    clearInterval(timer)
  }
},30);

setTimeout(function(){ 
  $(".pageLoading").remove() 
}, 5000);
/**************** 載入頁 進度條 ****************/




/**********************************************/
/****************** 地圖相關 *******************/

var map;
var marker;
var now_lat;
var now_lng;

var placeholder_txt;
var driver_position;
var reserved_position;
var driver_position_point;
var reserved_position_point;

var rec_list_s = [];
var rec_list_e = [];

var flag = false;
/******************  初始化地圖以及地圖相關功能 ******************/
function initMap() {
  
  var directionsService = new google.maps.DirectionsService();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 40.758293, lng: -73.975274 },
    styles: [
      {elementType: 'geometry', stylers: [{color: '#dddddd'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#dddddd'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#666666'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#444444'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#444444'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#bbbbbb'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#aaaaaa'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#c2d7c6'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#4c664c'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#888888'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#777777'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#666666'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#555555'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#444444'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#adcddb'}]
      }
    ]
  });
  
  
  
  
  
  //在地圖上點按顯示標記 // 並且只顯示一個
  marker  = new google.maps.Marker();
  map.addListener('click', function(e) {
    marker.setMap(null); //只顯示一個
    placeMarkerAndPanTo(e.latLng, map);
  });
  
  
  // 路徑規劃
  var directionsRenderer = new google.maps.DirectionsRenderer();
  var route_renderlist = [];
  function requestDirections(start,waypts, end,flag) 
  {
  	directionsService.route({
    origin: start,
    destination: end,
    waypoints: waypts,
    travelMode: 'DRIVING',
  }, function(response, status) {
    if (status === 'OK') {
      if(flag == true){
        directionsRenderer.setMap(null);
        /* for(i=0;i<route_renderlist.length;i++){
          route_renderlist[i].setMap(null);
        }
        route_renderlist = []; */
      }
      //directionsRenderer.setMap(null);
      directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: false,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: '#0e4276',
          strokeOpacity: 0.7,
          strokeWeight: 2
        },
        map: map
      });
      directionsRenderer.setDirections(response);
      /* route_renderlist.push(directionsRenderer);
      for(i=0;i<route_renderlist.length;i++){
        directionsRenderer.setDirections(response);
      } */
      
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  })
  
  }

    
  // 更新輸入座標
  document.getElementById('addbtn1').addEventListener('click', function(){

    $(".pnt1").attr('placeholder',placeholder_txt);
    driver_position = [now_lat,now_lng];
    console.log(driver_position);
    driver_position_point = new google.maps.LatLng({lat: driver_position[0], lng: driver_position[1]});

  }) 
  document.getElementById('addbtn2').addEventListener('click', function(){
    $(".pnt2").attr('placeholder',placeholder_txt) ;
    reserved_position = [now_lat,now_lng];
    console.log(reserved_position);
    reserved_position_point = new google.maps.LatLng({lat: reserved_position[0], lng: reserved_position[1]});

  }) ;
  
  // 抓一組一組的 pair objects 並且顯示在地圖上
  var vm = new Vue({
    el: "#toggle", //el:要監聽的東西
    data:{      //data: 虛擬機要參照的資料
      routes: [],//respond.location//放路徑資料
      pickprob: [],
      time: [],
      transit: [],
      remainD: [],
      CurrentTime:'',
      ReservedTime:''
    },
    methods:{
      action: function(event){
        show_pair(parseInt(event.currentTarget.textContent));
        //滑回去
        $(".note").css("bottom","-205px");
        $(".note").css("opacity","0");
        $(".indicators").css("opacity","0");
        $(".note").css("bottom","15%");
        $(".note").css("opacity","1");
        $(".info").css("opacity","1");
        
      },
      show: function(){
        show_all_route();
        //讓 indicatots 滑上來
        $(".note").css("bottom","-205px");
        $(".note").css("bottom","15%");
        $(".note").css("opacity","0");
        $(".info").css("opacity","0");
        $(".note").css("bottom","15%");
        $(".note").css("opacity","1");
        $(".indicators").css("opacity","1");
      },
      showProb: function(event){
        show_prob(event);
        //滑回去
        $(".note").css("bottom","-205px");
        $(".note").css("bottom","15%");
        $(".note").css("opacity","0");
      }
    }
  });
  var grid_s = new google.maps.Polygon();
  var grid_e = new google.maps.Polygon();
  var all_grid_s = new google.maps.Polygon();
  var all_grid_e = new google.maps.Polygon();
  var direct_route = [];
  var all_grid_prob = new google.maps.Polygon();
  var probArr = [];
  function show_pair(index){
    flag = true;
    index = index-1;
    grid_s.setMap(null);
    grid_e.setMap(null);
    rec_list_s = [];
    rec_list_e = [];
    all_grid_s.setMap(null);
    all_grid_e.setMap(null);
    for(i=0;i<probArr.length;i++){
      probArr[i].setMap(null);
    }
    
            
    // transit time & remain dist
    var dist = "" + respond.location.remainDist[index]*100;
    dist = dist.substr(0,3)+" m";
    var transit = Math.ceil(parseFloat(respond.location.transitTime[index]))+" min"; 
    $(".transit_text").text("at least "+transit);
    $(".remainD_text").text("about "+dist);

    
    // route direction
    var mean_s_lat = (respond.location.start.top_right.lat[index] + respond.location.start.top_left.lat[index] +respond.location.start.bottom_left.lat[index] + respond.location.start.bottom_right.lat[index])/4 ;
    var mean_s_lng = (respond.location.start.top_right.lng[index] + respond.location.start.top_left.lng[index] +respond.location.start.bottom_left.lng[index] + respond.location.start.bottom_right.lng[index])/4 ;
    var mean_e_lat = (respond.location.end.top_right.lat[index] + respond.location.end.top_left.lat[index] +respond.location.end.bottom_left.lat[index] + respond.location.end.bottom_right.lat[index])/4 ;
    var mean_e_lng = (respond.location.end.top_right.lng[index] + respond.location.end.top_left.lng[index] +respond.location.end.bottom_left.lng[index] + respond.location.end.bottom_right.lng[index])/4 ;
    var LatLng_start = new google.maps.LatLng({lat: mean_s_lat, lng: mean_s_lng});
    var LatLng_end = new google.maps.LatLng({lat: mean_e_lat, lng: mean_e_lng});
    requestDirections(LatLng_start,[], LatLng_end,flag);

    var rectangleCoords_s = [
      {lat: respond.location.start.top_right.lat[index], lng: respond.location.start.top_right.lng[index]},
      {lat: respond.location.start.top_left.lat[index], lng: respond.location.start.top_left.lng[index]},
      {lat: respond.location.start.bottom_left.lat[index], lng: respond.location.start.bottom_left.lng[index]},
      {lat: respond.location.start.bottom_right.lat[index], lng: respond.location.start.bottom_right.lng[index]},
      {lat: respond.location.start.top_right.lat[index], lng: respond.location.start.top_right.lng[index]}
    ];
    var rectangleCoords_e = [
      {lat: respond.location.end.top_right.lat[index], lng: respond.location.end.top_right.lng[index]},
      {lat: respond.location.end.top_left.lat[index], lng: respond.location.end.top_left.lng[index]},
      {lat: respond.location.end.bottom_left.lat[index], lng: respond.location.end.bottom_left.lng[index]},
      {lat: respond.location.end.bottom_right.lat[index], lng: respond.location.end.bottom_right.lng[index]},
      {lat: respond.location.end.top_right.lat[index], lng: respond.location.end.top_right.lng[index]}
    ];
    grid_s = new google.maps.Polygon({
      paths: rectangleCoords_s,
      strokeColor: '#f76d17',
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: '#f76d17',
      fillOpacity: 0.7
    });
    grid_e = new google.maps.Polygon({
      paths: rectangleCoords_e,
      strokeColor: '#0e4276',
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: '#0e4276',
      fillOpacity: 0.7
    });

    grid_s.setMap(map);
    grid_e.setMap(map);
    
  }
  
  function show_all_route(){
    flag = true;
    grid_s.setMap(null);
    grid_e.setMap(null);
    all_grid_s.setMap(map);
    all_grid_e.setMap(map);
    for(i=0;i<probArr.length;i++){
      probArr[i].setMap(null);
    }
    
    var waypts = [];
    for (var i = 1 ; i<direct_route.length-1;i++){
      waypts.push({
        location: direct_route[i],
        stopover: true
      });
    }
    requestDirections(direct_route[0],waypts, direct_route[direct_route.length-1],flag);
  }
  
  function show_prob(index){

    grid_s.setMap(null);
    grid_e.setMap(null);
    rec_list_s = [];
    rec_list_e = [];
    all_grid_s.setMap(null);
    all_grid_e.setMap(null);
    directionsRenderer.setMap(null);
    
    for(i=0;i<probArr.length;i++){
      probArr[i].setMap(null);
    }
    probArr = [];
    
    for(i=0;i< respond.pickupProb.coor.top_right.lat.length;i++){
      var rectangleCoords = [
        {lat: respond.pickupProb.coor.top_right.lat[i], lng:
         respond.pickupProb.coor.top_right.lng[i]},
        {lat: respond.pickupProb.coor.top_left.lat[i], lng:
         respond.pickupProb.coor.top_left.lng[i]},
        {lat: respond.pickupProb.coor.bottom_left.lat[i], lng:
         respond.pickupProb.coor.bottom_left.lng[i]},
        {lat: respond.pickupProb.coor.bottom_right.lat[i], lng:
         respond.pickupProb.coor.bottom_right.lng[i]},
        {lat: respond.pickupProb.coor.top_right.lat[i], lng:
         respond.pickupProb.coor.top_right.lng[i]}
      ];
      all_grid_prob = new google.maps.Polygon({
        paths: rectangleCoords,
        strokeColor: '#ff7519',
        strokeOpacity: 0,
        strokeWeight: 1,
        fillColor: '#ff5c1c',
        fillOpacity: respond.pickupProb.value[index][i]*4
      });
      probArr.push(all_grid_prob);
      
    }
    for(i=0;i<probArr.length;i++){
      probArr[i].setMap(map);
    }
    
  }
  
  
  
  
  
  // 送出之後要做的事
  var start_time;
  var end_time;
  document.getElementById('send').addEventListener('click', function(){
    var current_time_h = document.getElementById("pnt1_hour").value;
    var current_time_m = document.getElementById("pnt1_min").value;
    var reserved_time_h = document.getElementById("pnt2_hour").value;
    var reserved_time_m = document.getElementById("pnt2_min").value;
    
    vm.CurrentTime = ''+current_time_h+' : '+current_time_m;
    vm.ReservedTime = ''+reserved_time_h+' : '+reserved_time_m;
    
    start_time = parseInt(current_time_h)*60 + parseInt(current_time_m);
    end_time = parseInt(reserved_time_h)*60 + parseInt(reserved_time_m);

    var qurl="http://127.0.0.1:5000";
    $.ajax({
      type: "POST",
      crossDomain: true,
      cache: false,
      data:{
        driver_position_lat: driver_position[0],
        driver_position_lng: driver_position[1],
        start_time: start_time,
        reserved_position_lat: reserved_position[0],
        reserved_position_lng: reserved_position[1],
        final_time: end_time
      },
      url: qurl,
      dataType: "json",
      success: function(data) {
        console.log("send");
        respond = data;
        vm.routes = data['location'];
        vm.pickprob = data['pickupProb']['value'];
        vm.time = data['pickupProb']['time'];
        vm.transit = data['location']['transitTime'];
        vm.remainD = data['location']['remainDist'];
        
        for(i=0;i< data['location']['start']['top_right']['lat'].length;i++){
          var rectangleCoords_s = [
            {lat: data['location']['start']['top_right']['lat'][i], lng: data['location']['start']['top_right']['lng'][i]},
            {lat: data['location']['start']['top_left']['lat'][i], lng: data['location']['start']['top_left']['lng'][i]},
            {lat: data['location']['start']['bottom_left']['lat'][i], lng: data['location']['start']['bottom_left']['lng'][i]},
            {lat: data['location']['start']['bottom_right']['lat'][i], lng: data['location']['start']['bottom_right']['lng'][i]},
            {lat: data['location']['start']['top_right']['lat'][i], lng: data['location']['start']['top_right']['lng'][i]}
          ];
          var rectangleCoords_e = [
            {lat: data['location']['end']['top_right']['lat'][i], lng: data['location']['end']['top_right']['lng'][i]},
            {lat: data['location']['end']['top_left']['lat'][i], lng: data['location']['end']['top_left']['lng'][i]},
            {lat: data['location']['end']['bottom_left']['lat'][i], lng: data['location']['end']['bottom_left']['lng'][i]},
            {lat: data['location']['end']['bottom_right']['lat'][i], lng: data['location']['end']['bottom_right']['lng'][i]},
            {lat: data['location']['end']['top_right']['lat'][i], lng: data['location']['end']['top_right']['lng'][i]}
          ];
          rec_list_s.push(rectangleCoords_s);
          rec_list_e.push(rectangleCoords_e);
          
          var mean_s_lat = (data['location']['start']['top_right']['lat'][i] + data['location']['start']['top_left']['lat'][i] +data['location']['start']['bottom_left']['lat'][i] + data['location']['start']['bottom_right']['lat'][i])/4 ;
          var mean_s_lng = (data['location']['start']['top_right']['lng'][i] + data['location']['start']['top_left']['lng'][i] +data['location']['start']['bottom_left']['lng'][i] + data['location']['start']['bottom_right']['lng'][i])/4 ;
          var mean_e_lat = (data['location']['end']['top_right']['lat'][i] + data['location']['end']['top_left']['lat'][i] +data['location']['end']['bottom_left']['lat'][i] + data['location']['end']['bottom_right']['lat'][i])/4 ;
          var mean_e_lng = (data['location']['end']['top_right']['lng'][i] + data['location']['end']['top_left']['lng'][i] +data['location']['end']['bottom_left']['lng'][i] + data['location']['end']['bottom_right']['lng'][i])/4 ;
          var LatLng_start = new google.maps.LatLng({lat: mean_s_lat, lng: mean_s_lng});
          var LatLng_end = new google.maps.LatLng({lat: mean_e_lat, lng: mean_e_lng});
          direct_route.push(LatLng_start);
          direct_route.push(LatLng_end);
          flag = false;
          
        }
        all_grid_s = new google.maps.Polygon({
          paths: rec_list_s,
          strokeColor: '#ff7519',
          strokeOpacity: 1,
          strokeWeight: 1,
          fillColor: '#ff7519',
          fillOpacity: 0.6
        });
        all_grid_e = new google.maps.Polygon({
          paths: rec_list_e,
          strokeColor: '#ff7519',
          strokeOpacity: 1,
          strokeWeight: 1,
          fillColor: '#ff7519',
          fillOpacity: 0.6
        });
        
        var waypts = [];
        for (var i = 1 ; i<direct_route.length-1;i++){
          waypts.push({
            location: direct_route[i],
            stopover: true
          });
        }
        requestDirections(direct_route[0],waypts, direct_route[direct_route.length-1],flag);
        //requestDirections(direct_route.slice(0,3),[], direct_route.slice(3, 6),flag);
        
        /* for(j=0;j<direct_route.length/2;j++){
          requestDirections(direct_route[j*2],[], direct_route[j*1+1],flag);
        } */

        
        
        all_grid_s.setMap(map);
        all_grid_e.setMap(map);
        
        // indicators
        var ortext = "" + (data['indicators']['or'])*100;
        var ortrim = ortext.substr(0,5)+"%";
        var hrtext = "" + (data['indicators']['hr'])*100;
        var hrtrim = hrtext.substr(0,5)+"%";
        var srtext = "" + (data['indicators']['sr'])*100;
        var srtrim = srtext.substr(0,5)+"%";
        $(".or_text").text(ortrim);
        $(".hr_text").text(hrtrim);
        $(".sr_text").text(srtrim);
        
        // transit time & remain dist
        
        
      },
      error: function(jqXHR) {
        console.log("ajax doesn't work.")

      }
    })
 
    //讓第二頁滑進來
    $(".display").css("transform","translateX(0px)");
    $(".display2").css("transform","translateX(100%)");
    
    //讓 indicatots 滑上來
    $(".note").css("bottom","15%");
    $(".note").css("opacity","1");
    
    // operation 比例少一點
    $(".operation").css("width","20%");
    $(".map").css("width","80%");
     
    placeMarkerStartandEnd([driver_position_point,reserved_position_point], map);

    
  });
  
  

}

/******************  初始化地圖以及地圖相關功能 ******************/


/************* 當使用者點選地標之後 在html響應顯示資料 ***********/
// add+ 這個才能正常顯示標記：https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js

function placeMarkerAndPanTo(latLng, map) {
  marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
  
  // 在平板顯示經緯度
  now_lat = latLng.lat();
  now_lng = latLng.lng();
  lat = ""+now_lat;
  lng = ""+now_lng;
  placeholder_txt = lat.substr(0,7)+", "+lng.substr(0,7);
  $(".txtshow").text(placeholder_txt);
}
/************* 當使用者點選地標之後 在html響應顯示資料 ***********/




// 標記起終點
var new_marker_s;
var new_marker_e;
function placeMarkerStartandEnd(pointarr, map) {
  marker.setMap(null);
  new_marker_s = new google.maps.Marker({
    position: pointarr[0],
    label: "S",
    map: map
  });
  new_marker_e = new google.maps.Marker({
    position: pointarr[1],
    label: "R",
    map: map
  });
}


function refresh(){
  //document.location.href = document.location.href;
  $(".display").css("transform","translateX(100%)");
  $(".display2").css("transform","translateX(100%)");
  
  //滑回去
  $(".note").css("bottom","-205px");
    
  // operation 比例少一點
  $(".operation").css("width","40%");
  $(".map").css("width","60%");
  
  // 清空輸入
  $(".pnt1").attr('placeholder',"新增司機位置...") ;
  $(".pnt2").attr('placeholder',"新增預約位置...") ;
  $(".txtshow").text("目前選擇地點");
  
  initMap();
}



