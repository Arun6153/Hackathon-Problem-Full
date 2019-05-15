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
  var form = $("form#regForm");

  $(form).submit(function (event) {
    event.preventDefault();

    var userdata = JSON.stringify(ConvertFormToJSON(form));

    $.ajax({
      type: "POST",
      data: userdata,
      url: apiMachine + ":3000/api/quara/signUp",
      async: true,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {  
        if(data.error) {
        } else {    
        window.location = machine + "/index.html";
        }
      }
    });
  });
});