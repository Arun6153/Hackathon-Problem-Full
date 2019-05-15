var machine = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
var apiMachine = window.location.protocol + "//" + window.location.hostname;


$(function(){

    $.ajax({
        type: "GET",
        url: apiMachine + ":3000/api/quara/pending",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data);
            for(var i=0; i<=data.length; i++) {
                $("#admin").append('<div class="col-1"><h2>Student/Alumni</h2><div class="panel panel-default">'+
                '<div class="panel-body">University id = ' + data[i].student_studentId + '</a></div>'+
                '<button style="padding: 3px;border-radius: 4px;background-color:grey;border:1px solid grey;color:white;" onclick="accept(' + data[i].student_studentId + ')">Accept</button>'+
                '<button style="padding: 3px;border-radius: 4px;background-color:grey;border:1px solid grey;color:white;" onclick="reject(' + data[i].student_studentId + ')">Reject</button></div></div>'
                )}  
        }
      });
});

function accept(id){
    var json = {
        studentId: id
    };
    $.ajax({
        type: "POST",
        data:JSON.stringify(json),
        url: apiMachine + ":3000/api/quara/confirm",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            alert("accepted"); 
        }
      });
}

function reject(id){
    var json = {
        studentId: id
    };
    $.ajax({
        type: "POST",
        data:JSON.stringify(json),
        url: apiMachine + ":3000/api/quara/reject",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            alert("rejected");  
        }
      });
}