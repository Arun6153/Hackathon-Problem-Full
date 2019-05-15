"use strict";

//api route
var express = require("express");
var router = express.Router();

//database
var db = require("./../scripts/database");
var qry = require("./../.config/database.query");

//token
var tokenService = require("./../token/tokenService");

//questionId
router.param("questionId", function (req, res, next, questionId) {

  var stoken = req.headers.token;

  tokenService.verifyUserToken(stoken, function (err) {
    if (err) res.end("error has occured");
    else {
      db.query(qry.getQuestionsById,[questionId], function (err, result) {
        if (err) throw err;
        req.question = result[0];
        return next();
      });
    }
  });
});

//login
router.post('/login',function(req,res) {
  db.query(qry.login,
    [req.body.studentId,req.body.password,req.body.type],
    function(err,result) {
      if(err) throw err;

      if (result.length == 0) {
        res.json({
          error: "Incorrect details"
        });
      } else {
        if(result[0].verified == "0")
        res.json({
          error: "verification pending"
        });
        else {
        tokenService.createUserToken(result[0].studentId, result[0].studentName,result[0].type, function (newtoken) {
          res.json({
            token: newtoken
          });
      })
    }
    }
    });
});

//signup
router.post('/signUp',function(req,res) {
  console.log(req.body);
  db.query(qry.signUp,
    [req.body.studentName,req.body.email,req.body.password,req.body.studentId,req.body.stream,req.body.year,req.body.type,req.body.workingIn,parseInt(0)],
    function(err){
      if(err) throw err;
      db.query(qry.verify,[req.body.studentId],
        function(err,result){
          if(err) throw err;
          res.json(result);
        })
    })
});

//By admin
router.get('/pending',function(req,res) {
  db.query(qry.pending,
    function(err,result) {
      if(err) throw err;
      res.json(result);
    });
});

router.post('/confirm',function(req,res) {
  db.query(qry.confirm,
    [req.body.studentId],
    function(err) {
      if(err) throw err;
      db.query(qry.remove,
        [req.body.studentId],
        function(err,result) {
          if(err) throw err;
          res.json(result);
        });
    });
});

router.post('/reject',function(req,res) {
  db.query(qry.reject,
    [req.body.studentId],
    function(err) {
      if(err) throw err;
      db.query(qry.remove,
        [req.body.studentId],
        function(err,result) {
          if(err) throw err;
          res.json(result);
        });
    });
});

router.get('/student',function(req,res){
  var stoken = req.headers.token;

  if (!stoken) res.end("no token");

  tokenService.verifyUserToken(stoken, function (err,decode) {
    if (err) res.end("error has occured");
    else {
      db.query(qry.getStudentInfo,
        [decode.studentId],
         function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    }
  });
});

//question
router.get('/questions',function(req,res) {
  var stoken = req.headers.token;

  if (!stoken) res.end("no token");

  tokenService.verifyUserToken(stoken, function (err) {
    if (err) res.end("error has occured");
    else {
      db.query(qry.getQuestions, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    }
  });
});

//question
router.post('/questions',function(req,res) {
  var stoken = req.headers.token;

  if (!stoken) res.end("no token");

  tokenService.verifyUserToken(stoken, function (err,decode) {
    if (err) res.end("error has occured");
    else {
      db.query(qry.submitQuestion,[req.body.question,decode.studentId],function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    }
  });
})

router.get('/questions/:questionId',function(req,res) {
    res.json(req.question);
});


router.get('/questions/:questionId/answers',function(req,res) {
  var stoken = req.headers.token;

  if (!stoken) res.end("no token");

  tokenService.verifyUserToken(stoken, function (err) {
    if (err) res.end("error has occured");
    else {
      db.query(qry.getAnswers,[req.question.questionId],function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    }
  });
});


router.post('/questions/:questionId/answers',function(req,res) {
  var stoken = req.headers.token;

  if (!stoken) res.end("no token");

  tokenService.verifyUserToken(stoken, function (err,decode) {
    if (err) res.end("error has occured");
    else {
      db.query(qry.submitAnswer,[req.body.answer,parseInt(0),req.question.questionId,decode.studentId],function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    }
  });
});

router.get('/jobs',function(req,res) {
  var stoken = req.headers.token;

  if (!stoken) res.end("no token");

  tokenService.verifyUserToken(stoken, function (err) {
    if (err) res.end("error has occured");
    else {
      db.query(qry.getJobs, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    }
  });
});

router.post('/jobs', function(req,res) {
  var stoken = req.headers.token;

  if (!stoken) res.end("no token");

  tokenService.verifyUserToken(stoken, function (err,decode) {
    if (err) res.end("error has occured");
    else {

      if(decode.type != "Alumni")
        res.end("you are not a alumni");
      else {
      db.query(qry.submitJobs,[req.body.jobDesignation,req.body.jobPlace,req.body.jobType,decode.studentId], function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    }
    }
  });
});

module.exports = router;