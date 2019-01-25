var title = "";
var records= 1;
var beginning = "";
var ending = "";
var begindate="";
var enddate="";

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();


  if(mm<10){
    mm=0+""+mm;
  }
  var limitdate = (yyyy+""+mm+""+dd);

function isvalidNumber(date){
  if (typeof date === "number" && date >= 19900101 && date <= parseInt(limitdate)){
    return true;
  }
}

function convertStart(date){
  if (date<=9999 && date>=1000 ){
    return parseInt(date+"0101");
  }
};

function convertEnd(date){
  if (date<=9999 && date>=1000 ){
    return parseInt(date+"1231");
  }
};

function addPost (){

  beginning = convertStart(beginning);
  ending = convertEnd(ending);

  if(isvalidNumber(beginning)){
    begindate ="&begin_date="+ beginning;
  }
  else{
    begindate = "";
  };
  if(isvalidNumber(ending)){
    enddate = "&end_date="+ending;
  }
  else{
    enddate = "";
  };

  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+
  title+begindate+enddate+
  "&api-key=1Vzz7MVAfAfsXkFzehZW1Db47kS84QNM";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(queryURL);
    console.log(response);
    $(".main-text").empty();
    for (i=0;i<=records-1;i++){
      var container = $("<div></div>");
      var title= $("<p></p>");
      var abstract =  $("<p></p>");
      var URL = $("<a></a>");
      var postDate = $("<p></p>");
      $(title).text(response.response.docs[i].headline.main);
      $(abstract).text(response.response.docs[i].snippet);
      $(URL).attr("href",response.response.docs[i].web_url).text(response.response.docs[i].web_url);
      $(postDate).text("Date: "+response.response.docs[i].pub_date.split('T')[0]);
      $(container).append(title).append(abstract).append(postDate).append(URL).append("<hr>");
      $(".main-text").append(container);
    }
  });
};

$("#search").on("click",function(){
  event.preventDefault();
  title = $("#term").val().trim();
  records = $("#numRecords").val();
  beginning=parseInt($("#yearStart").val());
  ending=parseInt($("#yearEnd").val());
  addPost();
});

$("#clear").on("click",function(){
  event.preventDefault();
  $(".main-text").empty();
});