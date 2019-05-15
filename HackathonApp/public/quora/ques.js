var machine = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
var apiMachine = window.location.protocol + "//" + window.location.hostname;


function ConvertFormToJSON(form) {
    var array = jQuery(form).serializeArray();
    var json = {};
  
    jQuery.each(array, function () {
      json[this.name] = this.value || "";
    });
  
    return json;
  }
  

$(function () {

    $.ajax({
      type: "GET",
      url: apiMachine + ":3000/api/quara/questions/" + localStorage.getItem("ques"),
      async: true,
      headers: {
        token: localStorage.getItem("auth")
      },
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {  
        console.log(data);
        $("#myques").append(data.question);
      }
    });
});

$(function () {
      $.ajax({
        type: "GET",
        headers: {
            token: localStorage.getItem("auth")
        },
        url: apiMachine + ":3000/api/quara/questions/" + localStorage.getItem("ques") + "/answers",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {  
         for(var i=0;i<data.length;i++) {
             $("#dans").append(
                '<div class="col-1"><h3>Answer</h3></div><div class="col-2"><h2 id="myques">'+ data[i].answer+'</h2></div>'
             );
         }
        }
      });
});

$(function () {
    var form = $("form#answer");

    $(form).submit(function (event) {
      event.preventDefault();
  
      $.ajax({
        type: "POST",
        data: JSON.stringify(ConvertFormToJSON(form)),
        headers: {
            token: localStorage.getItem("auth")
        },
        url: apiMachine + ":3000/api/quara/questions/" + localStorage.getItem("ques") + "/answers",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {  
         console.log(data);
        }
      });
    });
});