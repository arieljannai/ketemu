<<<<<<< HEAD
let {PythonShell} = require('python-shell')


const express = require("express"); 
const bodyParser = require("body-parser"); 
const fs = require('fs')
const file = 'userdata.json'
// configuration for json file with user input
const jsonfile = require('jsonfile');   
=======
let {PythonShell} = require('python-shell');
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
>>>>>>> e70af87b12339d025244e0435bcd544d11be84a0

var app = express();
var isTime = false;
let cachedUser = {};

<<<<<<< HEAD
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
})); 
 
=======
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// configuration for json file with user input
var jsonfile = require("jsonfile");
var file = "./userdata.json";
>>>>>>> e70af87b12339d025244e0435bcd544d11be84a0

// what happens when the web page is opened
app.get("/", function (req, res) {
    res.set({
        "Access-control-Allow-Origin": "*",
    });
    return res.redirect("index.html");
});


// after the user signed in, save data
app.post("/sign_up", function (req, res) {
    if (!isTime) {
        var name = req.body.name;
        var email = req.body.email;

        var data = {
            name: name,
            email: email,
        };
        cachedUser["sign_up"] = data;

        // postit(data, '/questions.html');
        return res.redirect("/questions.html");
    }
});

app.get("/sign_up", function (req, res) {
    res.send(JSON.stringify(cachedUser["sign_up"]));
});


// after the user answered questions, save answers
<<<<<<< HEAD
app.post('/details', function(req,res){ 
	if (!isTime){
		var name = req.body.name; 
		var degree_1 = req.body.degree_1; 
		var degree_2 = (req.body.degree_2 == "") ? null :  req.body.degree_2;
		var year = req.body.year;
		var courses = (req.body.courses == "") ? [] : req.body.courses;
		var hobbies = (req.body.hobbies == "") ? [] : req.body.hobbies;
		var any = req.body.any;
		var id = makeid();

		fields = [degree_1, degree_2]
	
		// create student object
		var data = { 
			"id": id,
			"given-name": name, 
			"studies": {"fields":fields, "year":year},
			"courses":courses,
			"hobbies":hobbies,
			"extra-info": any
		} 

		// add to JSON file 
		jsonfile.writeFileSync(file, data, {flag: 'a'});
		
		//call to python function
		InitUsersPython();
		getMeetingsPython()

		// wait for the json file from getMeetingsPython to be created
		// then use the file to create meetings
		const checkTime = 1000;
		function check() {
			setTimeout(() => {
				fs.readFile('groups.json', 'utf8', function(err, data) {
					if (err) {
						// got error reading the file, call check() again
						check();
					} else {
						// we have the file contents here, so do something with it
						var meetingsData = JSON.parse(fs.readFileSync('groups.json', 'utf-8'));
						//console.log(meetingsData);
					}
				});
			}, checkTime)
		}

		check();

		// var meetingsData = jsonfile.readFileSync('groups.json', 'utf-8');
		//console.log(meetingsData);

		//var meetingsData = JSON.parse(fs.readFileSync('groups.json', 'utf-8'));
		
		// console.log(res);
		//recieve url of the meeting
		//send user to meeting

		res.redirect('/meeting.html');
		return res.end('bye!');
	}
=======
app.post("/details", function (req, res) {
    if (!isTime) {
        var name = req.body.name;
        var degree_1 = req.body.degree_1;
        var degree_2 = req.body.degree_2 == "" ? null : req.body.degree_2;
        var year = req.body.year;
        var courses = req.body.courses == "" ? [] : req.body.courses;
        var hobbies = req.body.hobbies == "" ? [] : req.body.hobbies;
        var any = req.body.any;
        var id = makeid();

        fields = [degree_1, degree_2];

        // create student object
        var data = {
            user_id: id,
            name: name,
            degree_1: degree_1,
            degree_2: degree_2,
            year: year,
            courses: courses,
            hobbies: hobbies,
            any: any,
        };

        cachedUser["details"] = data;
        // add to JSON file
        jsonfile.writeFileSync(file, data, { flag: "a" });
        var jsonObj = JSON.stringify(data);
        //call to python function
        InitUsersPython();
        var res = getMeetingsPython();
        console.log(res);
        //recieve url of the meeting
        //send user to meeting

        res.redirect("/meeting.html");
        return res.end("bye!");
    }
>>>>>>> e70af87b12339d025244e0435bcd544d11be84a0
});

app.get("/details", function (req, res) {
    res.send(JSON.stringify(cachedUser["details"]));
});

// the app will listen to port 3000
app.listen(3000, (err) => {
    if (err) {
        console.log("there was a problem", err);
        return;
    }
    console.log("listening on port 3000");
});

//create random ID per user, each ID is 12 characters
function makeid() {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    // add 12 characters - letters or digits
    for (var i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
    // 		r = JSON.stringify(data2);
    // 		console.log('success', r);
    // 	} catch(e) {
    // 		console.log('fail', e);
}

// 	var data = r;

function createMeetings() {
    if (isTime) {
        InitUsersPython();
        isTime = false;
    }
    var counter = 1;
    // call the getMeetingsPython before each meeting
    var timerID = setInterval(function () {
        var meetings = getMeetingsPython();
        counter += 1;
        if (counter > 3) {
            clearInterval(timerID);
        }
    }, 60 * 1000 * 20); //call the function every 20 minutes
}

<<<<<<< HEAD

/**************************************************************PYTHON******************************************************************/


function InitUsersPython(){
	let options = {
		mode: 'json',
		pythonPath: 'python',
		// pythonOptions: ['-u'], // get print results in real-time
		scriptPath: '.',
		args: ['init', 'userdata.json']
	  };
	   
	PythonShell.run('script.py', options, function (err) {
		if (err) throw err;
	});
}


function getMeetingsPython(){
	let options = {
		mode: 'json',
		pythonPath: 'python',
		pythonOptions: ['-u'], // get print results in real-time
		scriptPath: '.',
		args: ['get_groups']
	  };
	   
	PythonShell.run('script.py', options, function (err, results) {
		if (err) throw err;
	});
=======
function InitUsersPython() {
    let options = {
        mode: "json",
        pythonPath: "python",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: ".",
        args: ["init", "/userdata.json"],
    };
    PythonShell.run("script.py", options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log("results: %j", results);
    });
}

function getMeetingsPython() {
    let options = {
        mode: "json",
        pythonPath: "python",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: ".",
        args: ["get_groups"],
    };
    PythonShell.run("script.py", options, function (err, results) {
        if (err) throw err;
        return results;
        //json object - array of objects with meetingID and userID of users for that meeting
    });
>>>>>>> e70af87b12339d025244e0435bcd544d11be84a0
}
