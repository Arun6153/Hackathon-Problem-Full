var machine = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
var apiMachine = window.location.protocol + "//" + window.location.hostname;

$(function () {
    $.ajax({
      type: "GET",
      headers: {
          token: localStorage.getItem("auth")
      },
      url: apiMachine + ":3000/api/quara/jobs",
      async: true,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) { 
          console.log(data);
          for(var i = 0; i<data.length;i++) {
            $("#jobdata").append(
            '<tr>' +
                '<td>' + (i + 1) +'</td>' +
                '<td>' + data[i].jobDesignation + '</td>' +
                '<td>' + data[i].jobPlace + '</td>' +
                '<td>' + data[i].jobType  +'</td>' +
                '<td><button>Apply</button></td></tr>'
            );
          }
      }
    });
});