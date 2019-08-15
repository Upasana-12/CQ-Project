var communityName = document.getElementById("communityName");
var description = document.getElementById("description");
var rule = document.getElementById("rule");
var create_btn = document.getElementById("create");

$.trumbowyg.svgPath="trumbowyg.svg";
$("#description").trumbowyg();

create_btn.onclick = function()
{
	if(communityName.value == "")
	alert("Fill commmunity name");
	else if(description.value == "")
	alert("Fill description");
	else if(rule.value == "")
	alert("Choose Rule");
	else
	{
	var ob = new Object();
	ob.cName = communityName.value;
	ob.cDesc = description.value;
	ob.cRule = rule.value;
	
	var today = new Date();
	var dat = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = dat+' ('+time+')';
	ob.cDate = dateTime;
	
	var request = new XMLHttpRequest();
	request.open('POST','/createComm');
		request.setRequestHeader("Content-Type","application/JSON");
        request.send(JSON.stringify(ob));
	request.onload=function()
	{
			console.log("created in database");
			//alert("User added");
			//window.location="/home";
			if(request.responseText == "Created")
				document.getElementById("success").style.display = "block";
	}
}
}