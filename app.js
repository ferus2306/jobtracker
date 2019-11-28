
function displayData() {
	fetch("https://tranquil-taiga-97294.herokuapp.com/jobs", {
		credentials: "include"
	}).then(function (response) {

		if (response.status == 401) {
			document.getElementById("id2").style.display = "none";
			return
		} else {

			document.getElementById("id1").style.display = "none";
			response.json().then(function (data) {
				console.log("data received from the server: ", data);
				var jobsList = document.querySelector("#jobs");
				jobsList.innerHTML = " ";

				data.forEach(function (job) {

					// li tag contains everything about the job
					var newListItem = document.createElement("li");

					// h3 contains the name of each job
					var titleHeading = document.createElement("h3");
					titleHeading.innerHTML = job.name;
					newListItem.appendChild(titleHeading);

					// div contains the date of the application
					var dateDiv = document.createElement("div");
					dateDiv.innerHTML = job.date;
					newListItem.appendChild(dateDiv);

					var commentDiv = document.createElement("div");
					commentDiv.innerHTML = job.comment;
					newListItem.appendChild(commentDiv);

					var statusDiv = document.createElement("div");
					statusDiv.innerHTML = job.status;
					newListItem.appendChild(statusDiv);

					var deleteButton = document.createElement("button");
					deleteButton.setAttribute("id", "deleteButton");
					deleteButton.innerHTML = "Delete";
					deleteButton.onclick = function () {
						console.log("delete clicked:", job.id);
						if (confirm("Are you sure you want to delete? " + job.name + "?")) {
							deleteJob(job.id);
						}
					}

					var editButton = document.createElement("button");
					editButton.setAttribute("id", "editButton");
					editButton.innerHTML = "Edit";
					editButton.onclick = function () {

						var newNameLabel = document.createElement("input");
						var newDateLabel = document.createElement("input");
						var newCommentLabel = document.createElement("input");
						var newStatusLabel = document.createElement("input");

						newNameLabel.setAttribute("id", "editBox1");
						newDateLabel.setAttribute("id", "editBox2");
						newCommentLabel.setAttribute("id", "editBox3");
						newStatusLabel.setAttribute("id", "editBox4");

						newNameLabel.setAttribute("class", "box");
						newDateLabel.setAttribute("class", "box");
						newCommentLabel.setAttribute("class", "box");
						newStatusLabel.setAttribute("class", "box");

						newNameLabel.value = job.name;
						newDateLabel.value = job.date;
						newCommentLabel.value = job.comment;
						newStatusLabel.value = job.status;

						newListItem.appendChild(newNameLabel);
						newListItem.appendChild(newDateLabel);
						newListItem.appendChild(newCommentLabel);
						newListItem.appendChild(newStatusLabel);

						deleteButton.style.display = "none";
						// document.getElementById("mainList").style.display = "none";
						editButton.style.display = "none"
						newListItem.appendChild(saveButton2);
						console.log("edit clicked:", job.id);

						titleHeading.style.display = "none";
						dateDiv.style.display = "none";
						commentDiv.style.display = "none";
						statusDiv.style.display = "none";

					}

					var saveButton2 = document.createElement("button");
					saveButton2.setAttribute("id", "saveButton2");
					saveButton2.innerHTML = "Save";
					saveButton2.onclick = function () {

						var newJobName = document.querySelector("#editBox1").value
						var newJobDate = document.querySelector("#editBox2").value
						var newJobComment = document.querySelector("#editBox3").value
						var newJobStatus = document.querySelector("#editBox4").value

						if (newJobName && newJobDate && newJobComment && newJobStatus != "") {
							var bodyStr = "name=" + encodeURIComponent(newJobName);
							bodyStr += "&date=" + encodeURIComponent(newJobDate);
							bodyStr += "&comment=" + encodeURIComponent(newJobComment);
							bodyStr += "&status=" + encodeURIComponent(newJobStatus);

							fetch("https://tranquil-taiga-97294.herokuapp.com/jobs/" + job.id, {
								// requests parameters:
								method: "PUT",
								credentials: "include",
								body: bodyStr,
								headers: {
									"Content-Type": "application/x-www-form-urlencoded"
								}
							}).then(function (response) {
								// reload the page
								displayData();
							})

						} else {
							window.alert("Please, fill the form completely!");
						}
					}

					newListItem.appendChild(deleteButton);
					newListItem.appendChild(editButton);
					jobsList.appendChild(newListItem);

				});
			});
		}
	});
};


var deleteJob = function (jobId) {
	fetch("https://tranquil-taiga-97294.herokuapp.com/jobs/" + jobId, {
		method: "DELETE",
		credentials: "include"
	}).then(function (response) {
		// reload the page
		displayData();
	})
}

var clearInputs = function () {
	document.getElementById('box1').value = '';
	document.getElementById('box2').value = '';
	document.getElementById('box3').value = '';
	document.getElementById('box4').value = '';
}

var clearLogInInputs = function () {
	document.getElementById('logInBox1').value = '';
	document.getElementById('logInBox2').value = '';
}



var submitButton = document.querySelector("#save");
submitButton.onclick = function () {

	var newJobName = document.querySelector("#box1").value
	var newJobDate = document.querySelector("#box2").value
	var newJobComment = document.querySelector("#box3").value
	var newJobStatus = document.querySelector("#box4").value

	clearInputs()

	if (newJobName && newJobDate && newJobComment && newJobStatus != "") {
		var bodyStr = "name=" + encodeURIComponent(newJobName);
		bodyStr += "&date=" + encodeURIComponent(newJobDate);
		bodyStr += "&comment=" + encodeURIComponent(newJobComment);
		bodyStr += "&status=" + encodeURIComponent(newJobStatus);

		fetch("https://tranquil-taiga-97294.herokuapp.com/jobs", {
			method: "POST",
			credentials: "include",
			body: bodyStr,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"

			}
		}).then(function (response) {
			// reload the page
			displayData()
		})

	} else {
		window.alert("Please, fill the form completely!");
	}
};

// ASSIGNMENT 4 LOGIN
var registerButton = document.querySelector("#register");
registerButton.onclick = function () {

	document.getElementById("register").style.display = "none";
	document.getElementById("logIn").style.display = "none";


	var registerLabel = document.createElement("h3");
	registerLabel.textContent = "Register";
	var userNameLabel = document.createElement("input");
	var emailLabel = document.createElement("input");
	var phoneNumberLabel = document.createElement("input");
	var passwordLabel = document.createElement("input");
	var registerButton = document.createElement("button");

	var myBreak = document.createElement("br");

	userNameLabel.setAttribute("id", "registerBox1");
	userNameLabel.setAttribute("placeholder", "Name");
	emailLabel.setAttribute("id", "registerBox2");
	emailLabel.setAttribute("placeholder", "Email:");
	phoneNumberLabel.setAttribute("id", "registerBox3");
	phoneNumberLabel.setAttribute("placeholder", "Phone Number");
	passwordLabel.setAttribute("id", "registerBox4");
	passwordLabel.setAttribute("placeholder", "password");
	userNameLabel.setAttribute("class", "box");
	emailLabel.setAttribute("class", "box");
	phoneNumberLabel.setAttribute("class", "box");
	passwordLabel.setAttribute("class", "box");
	registerButton.setAttribute("id", "registerButton");
	registerButton.textContent = "Register"



	var registrationForm = document.querySelector("#registrationForm");
	registrationForm.innerHTML = " ";

	registrationForm.appendChild(registerLabel);
	registrationForm.appendChild(userNameLabel);
	registrationForm.appendChild(emailLabel);
	registrationForm.appendChild(phoneNumberLabel);
	registrationForm.appendChild(passwordLabel);
	registrationForm.appendChild(myBreak);
	registrationForm.appendChild(registerButton);

	registerButton.onclick = function () {


		var newUserName = document.querySelector("#registerBox1").value
		var newUserEmail = document.querySelector("#registerBox2").value
		var newUserPhoneNumber = document.querySelector("#registerBox3").value
		var newUserPassword = document.querySelector("#registerBox4").value

		var bodyStr = "name=" + encodeURIComponent(newUserName);
		bodyStr += "&email=" + encodeURIComponent(newUserEmail);
		bodyStr += "&phone_number=" + encodeURIComponent(newUserPhoneNumber);
		bodyStr += "&password=" + encodeURIComponent(newUserPassword);




		fetch("https://tranquil-taiga-97294.herokuapp.com/users", {
			// requests parameters:
			method: "POST",
			credentials: "include",
			body: bodyStr,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}).then(function (response) {

			if (response.status == 201) {

				displayData();

				document.getElementById("register").style.display = "block";
				document.getElementById("logIn").style.display = "block";
				// document.getElementsByTagName("ol").style.display = "none";	
				// document.getElementById("registrationForm").style.display	= "none";

				document.getElementById("registerBox1").style.display = "none";
				document.getElementById("registerBox2").style.display = "none";
				document.getElementById("registerBox3").style.display = "none";
				document.getElementById("registerBox4").style.display = "none";
				registerButton.style.display = "none";
				registerLabel.style.display = "none";
				myBreak.style.display = "none";


			} else {
				alert("Register Didn't work, your username already exists or you typed invalid password")
			}

		})
	};

}


var logInButton = document.querySelector("#logIn");
logInButton.onclick = function () {

	document.getElementById("register").style.display = "none";
	document.getElementById("logIn").style.display = "none";

	var logInLabel = document.createElement("h3");
	logInLabel.textContent = "Log in";
	var logInEmailLabel = document.createElement("input");
	var logInPasswordLabel = document.createElement("input");
	var logInButton = document.createElement("button");

	var myBreak = document.createElement("br");

	logInEmailLabel.setAttribute("id", "logInBox1");
	logInEmailLabel.setAttribute("placeholder", "email");
	logInPasswordLabel.setAttribute("id", "logInBox2");
	logInPasswordLabel.setAttribute("placeholder", "password");
	logInEmailLabel.setAttribute("class", "box");
	logInPasswordLabel.setAttribute("class", "box");
	logInButton.setAttribute("id", "logInButton");
	logInButton.setAttribute("class", "save");
	logInButton.textContent = 'Log In';

	var registrationForm = document.querySelector("#registrationForm");
	registrationForm.innerHTML = " ";

	registrationForm.appendChild(logInLabel);
	registrationForm.appendChild(logInEmailLabel);
	registrationForm.appendChild(logInPasswordLabel);
	registrationForm.appendChild(myBreak);
	registrationForm.appendChild(logInButton);

	logInButton.onclick = function () {
		var newLogInUserEmail = document.querySelector("#logInBox1").value
		var newLogInUserPassword = document.querySelector("#logInBox2").value

		var bodyStr = "email=" + encodeURIComponent(newLogInUserEmail);
		bodyStr += "&password=" + encodeURIComponent(newLogInUserPassword);

		fetch("https://tranquil-taiga-97294.herokuapp.com/sessions", {
			// requests parameters:
			method: "POST",
			credentials: "include",
			body: bodyStr,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}).then(function (response) {

			if (response.status == 201) {
				displayData();
				document.getElementById("id1").style.display = "none";
				document.getElementById("id2").style.display = "block";
			} else {
				alert("Your username or password is incorrect! Try Again.");
				clearLogInInputs();

			}

		})
	};

};

displayData();