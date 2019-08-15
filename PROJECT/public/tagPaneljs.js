var tagname=document.getElementById("tagname");
var sub_btn = document.getElementById("submit");
var list_btn= document.getElementById("list");

sub_btn.addEventListener('click',function(event)
{
	var tag_obj = new Object();
	tag_obj.tag = tagname.value;
	
	var today = new Date();
	var dat = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = dat+' ('+time+')';
	tag_obj.date = dateTime;
	
	var request = new XMLHttpRequest();
	request.open('POST','/addtag');
	request.setRequestHeader("Content-Type","application/JSON");
    request.send(JSON.stringify(tag_obj));
	
	request.onload=function()
	{
			console.log("created tag in database");
			alert("Tag Created");
			//window.location="/home";
	}
});

list_btn.addEventListener('click',function(event)
{
	window.location="/tagslist";
});