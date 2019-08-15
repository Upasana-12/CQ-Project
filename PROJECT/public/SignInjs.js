var username= document.getElementById("u_name");
var pswd = document.getElementById("pswd");
var loginbtn= document.getElementById("login");
var loginbox = document.getElementById("loginBox");
//var github_btn = document.getElementById("github");




loginbtn.addEventListener("click" , function()
{
	if(username.value=="")
		alert("Enter Username");
	else if(pswd.value=="")
		alert("Enter Password");
	else
	{
		var ob = new Object();
		ob.username = username.value;
		ob.password = pswd.value;
		
		var request = new XMLHttpRequest();
		//var filename = "/login" ;
		request.open('POST','/login');
		request.setRequestHeader("Content-Type","application/JSON");
        request.send(JSON.stringify(ob));
		//console.log("login sent");
		 request.onload=function()
          {
			 // var data = JSON.parse(request.responseText);
			 console.log("*************************")
              console.log(request.responseText);
			  console.log("*************************")
		
				if(request.responseText=="Invalid User")
				{
					alert("wrong user");
				}
				else
				{
					//var data = JSON.parse(request.responseText);
					if(request.responseText=="notActive")
						alert("Sorry! You are deactivated!!!")
					if(request.responseText=="Admin")
						window.location="/home";
					if(request.responseText=="User")
						window.location= "/uhome";
					if(request.responseText=="Community Builder")
						window.location = "/chome";
					if(request.responseText=="Pending")
						window.location = "/pending"
				}
				 
              
          }
	}
		
});