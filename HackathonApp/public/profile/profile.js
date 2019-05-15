var machine = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
var apiMachine = window.location.protocol + "//" + window.location.hostname;

$(function () {
    $.ajax({
      type: "GET",
      headers: {
          token: localStorage.getItem("auth")
      },
      url: apiMachine + ":3000/api/quara/student",
      async: true,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) { 
        $("#sname").html(data[0].studentName);
       $("#sid").html(data[0].studentId);
       $("#semail").html(data[0].email);
       $("#batch").html(data[0].year);
       $("#stream").html(data[0].stream);
       if(data[0].workingIn)
       $("#workingat").html(data[0].workingIn );
       else
       $("#workingat").html("nill");
      }
    });
});