var n_name = document.getElementById("fullname");
var n_dob = document.getElementById("date");
var n_phone = document.getElementById("phoneNo");
var n_city = document.getElementById("city");
var n_gender = document.getElementById("gender");
var cancel_btn = document.getElementById("cancel");
var submit_btn = document.getElementById("submit");

submit_btn.onclick = function()
{
	//alert("s clicked");
	var ob = new Object();
	ob.name = n_name.value;
	ob.dob = n_dob.value;
	ob.phone = n_phone.value;
	ob.city = n_city.value;
	ob.gender = n_gender.value;
	
	var request = new XMLHttpRequest();
	request.open('PUT','/pupdate');
	request.setRequestHeader("Content-Type","application/JSON");
    request.send(JSON.stringify(ob));
	request.onload=function()
	{
		if(request.responseText=="User")
			window.location='/uhome'
		else
			window.location='/chome'
	}
}

cancel_btn.onclick = function()
{
	//alert("c clicked")
	window.location='./project.html'
}

