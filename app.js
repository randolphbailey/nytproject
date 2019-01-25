var title = "";
var records= 1;
var beginning = "";
var ending = "";
var limitdate = "";
var eightdigits = new RegExp(/^\d{8}$/);
var fourdigits = new RegExp(/^\d{4}$/);

function getCurrentDate (){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(mm<10){
  mm=0+""+mm;
}
return (yyyy+""+mm+""+dd);
}

function isvalidNumber(date){
  if (typeof date === "number" && eightdigits.test(date.toString())&& date <= parseInt(limitdate)){
    return true;
  }
}

function convertStart(date){
  if (fourdigits.test(date)){
    return parseInt(date+"0101");
  }
  else return parseInt(date);
};

function convertEnd(date){
  if (fourdigits.test(date)){
    return parseInt(date+"1231");
  }
  else return parseInt(date);
};

function addPost (){

  beginning = convertStart(beginning);
  ending = convertEnd(ending);

  limitdate = getCurrentDate();

  if(isvalidNumber(beginning)){
    beginning ="&begin_date="+ beginning;
  }
  else{
    beginning = "";
  };
  if(isvalidNumber(ending)){
    ending = "&end_date="+ending;
  }
  else{
    ending = "";
  };

  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+
  title+beginning+ending+
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
  beginning=$("#yearStart").val();
  ending=$("#yearEnd").val();
  addPost();
});

$("#clear").on("click",function(){
  event.preventDefault();
  $(".main-text").empty();
});