var machine = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
var apiMachine = window.location.protocol + "//" + window.location.hostname;

function getQues(id) {
  localStorage.setItem("ques",id);
}

$(function () {

    $.ajax({
      type: "GET",
      url: apiMachine + ":3000/api/quara/questions",
      async: true,
      headers: {
        token: localStorage.getItem("auth")
      },
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {  
        console.log(data);
          for(var i = 0; i<data.length;i++) {
              $("#ques").append(
                '<div class="card-body" style="height:233px; margin-bottom:-25vh"><ul class="list-group">' +
                '<li class="list-group-item" style="margin-bottom:6px;"><div class="media">'+
                '<div></div><div class="media-body"><div class="media" style="overflow:visible;">' +
                '<div></div>'+
                '<div class="media-body" style="overflow:visible;"><div class="row"><div class="col-md-12">'+
                '<p><a href="#">' + data[i].studentName + ':</a><a href="common.html" onclick=getQues('+data[i].questionId+')>' + data[i].question + '</a><br></p>'+
                '</div></div></div></div></div></div></li></ul></div>'
              )
          }
      }
    });
});

$(function () {

  $("#postques").click(function () {
    
    var ques = document.getElementById("question").value;
    var json = {
    };
    json["question"] = ques;

   $.ajax({
      type: "POST",
      data: JSON.stringify(json),
      url: apiMachine + ":3000/api/quara/questions/",
      headers: {
          token: localStorage.getItem("auth")
      },
      async: true,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {  
       console.log(data);
      }
    });

  });
});