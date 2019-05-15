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
  var form = $("form#loginForm");

  $(form).submit(function (event) {
    event.preventDefault();

    var json  =  ConvertFormToJSON(form);

    if(json.studentId == "0" && json.password == "root")
    {
      window.location.href = machine + "/Admin/admin.html";
    }

    $.ajax({
      type: "POST",
      data: JSON.stringify(ConvertFormToJSON(form)),
      url: apiMachine + ":3000/api/quara/login",
      async: true,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {  
        if(data.error) {
          $("#error").html(data.error);
        } else {    
        localStorage.setItem("auth", data.token);
        window.location = machine + "/home.html";
        }
      }
    });
  });
});