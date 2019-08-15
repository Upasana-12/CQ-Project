var table= document.getElementById("data");
var status = document.getElementById("stat");
var role = document.getElementById("urole");
var update_username_field = document.getElementById("username");
var update_phone_field = document.getElementById("phone");
var update_city_field = document.getElementById("city");
var update_status_field = document.getElementById("status");
var update_role_field = document.getElementById("role");
var update_btn = document.getElementById("editsubmit");
var yes_btn = document.getElementById("btnss");
var to = document.getElementById("emailPop");
var mail_body = document.getElementById("body");
var mailbutton = document.getElementById("mailbutton");
var old_name, old_phone,mail,_id;


function getdata() {
$.fn.dataTable.ext.errMode = 'none';
//$(document).ready(function() {
   var table =  $('#data-table').DataTable({        // users-table   table ki id hai naa ki tbody ki
      processing : true,
      serverSide : true,
   
      "ajax": {
        "url":"/ul",
        "type":"POST",
          "data" : function(d){
              //d.status=setstatus;
            //  d.role=setrole;
			d.role   = $('#urole').val();
            d.status = $('#stat').val();
            }

      },
      "columns": [{
        "data" : "email"
      },
      {
        "data" : "phone",
		"sorting" : "false"
      },
      {
        "data" : "city"
      },
      {
        "data" : "status",
		"sorting" : "false",
      },
      {
        "data" : "role",
		"sorting" : "false",
      },
      {
        "data" : null,
		"orderable" : "false"
      },
    ],
	"columnDefs": [{
                "targets": -1,

                "render": function (data, type, row, meta) {
                    var r = row.flag;
					data = '<center><a id="open-mail" data-toggle="modal" data-target="#Mail-modal" class="btn btn-primary btn-sm emailbtn actionbtns" style="background:#000"><span class="fa fa-envelope" style="color:#fff"></span></a><a id="open-edit" onclick=updateUser("'+row._id+'","'+row.username+'","'+row.phone+'","'+row.city+'","'+row.status+'","'+row.role+'") class="btn btn-primary btn-sm editbtn actionbtns" data-toggle="modal" data-target="#myModal"><span class="fa fa-edit"></span></a>';
				if(r==1)
				{
					data = data + '<i id="deact" onclick=changestate("'+row._id+'","'+row.email+'","'+row.flag+'",event) class="btn btn-warning btn-sm fa fa-times-circle" data-toggle="modal" data-target="#yellowModal"></i>'
				}
				else if(r==0)
				{
					data = data + '<i id="acti" onclick=changestate("'+row._id+'","'+row.email+'","'+row.flag+'",event) class="btn btn-success btn-sm fa fa-check-circle" data-toggle="modal" data-target="#yellowModal"></i>'
				}
				data = data+'</center>'
				   return data;
				 
                }
            }],
    })
	
    $('#urole').on('change', function () {
        table.ajax.reload(null, false);
    });

    $('#stat').on('change', function () {
        table.ajax.reload(null, false);
    });
	
   
  // })
}
//getdata("All","All")
  $(document).ready(function() {

    console.log("1");
    getdata()

  })


   $(document).on("click", "#open-edit", function() {
		d = $(this).parent().parent().parent()[0].children;
		console.log(d[0]);
		$('#username').val(d[0].innerHTML);
		$('#phone').val(d[1].innerHTML);
		$('#city').val(d[2].innerHTML);
		$('#status').val(d[3].innerHTML);
		$('#role').val(d[4].innerHTML);
		old_name = d[0].innerHTML;
		old_phone = d[1].innerHTML;
	})
	
	$(document).on("click", "#open-mail", function() {
		d = $(this).parent().parent().parent()[0].children;
		console.log(d[0]);
		$('#emailPop').val(d[0].innerHTML);
		$('#subject').val("CQ");
		
	
	})
	
	function changestate(_id,email,flag,event)
   {
	   console.log("in change state");
       var ele = event.target;
       var obj;
       if(flag==1)
       {
          $('#title').html("Deactivate User?")
          $('#deluser').html("Are you sure you want to Deactivate " + email)
          obj = {
            _id : _id,
            flag : 0
          }
       }
       else {
         $('#title').html("Activate User?")
         $('#deluser').html("Are you sure you want to activate " + email)
         obj = {
           _id : _id,
           flag : 1
         }
       }
       $('#yellowyes').click(function()
       {
         // $.ajax({
         //   url : '/updateuser',
         //   type : 'post',
         //   dataType : 'json',
         //   contentType : 'application/json',
         //   success : function (err,data) {
         //     if(err)
         //     throw err;
         //     else {
         //       console.log(data.msg);
         //     }
         //   },
         //   data : JSON.stringify(obj)
         // })
          //console.log(obj);
		  console.log("in fn");
          var request = new XMLHttpRequest()
          request.open('POST','/updateuser')
          request.setRequestHeader("Content-type","application/json")
          request.send(JSON.stringify(obj))
          request.onload = ()=>
          {
            if(ele.classList.contains('fa-times-circle'))
            {
              ele.classList.remove('fa-times-circle')
              ele.classList.add('fa-check-circle')
              ele.classList.remove('btn-warning')
              ele.classList.add('btn-success')

            }
            else {
              ele.classList.remove('fa-check-circle')
              ele.classList.add('fa-times-circle')
              ele.classList.remove('btn-success')
              ele.classList.add('btn-warning')
            }
          }
       })
   }
	
	
	
	/*
	$(document).on("click", "#deact", function() {
		d = $(this).parent().parent().parent()[0].children;
		console.log(d[0]);
		mail = d[0].innerHTML;
		var del_user = document.getElementById("del-user");
			del_user.innerHTML = "Are you sure you want to delete "+d[0].innerHTML+" ?"
	
	})	
	
	$(document).on("click", "#acti", function() {
		d = $(this).parent().parent().parent()[0].children;
		console.log(d[0]);
		mail = d[0].innerHTML;
		var greenParaContent = document.getElementById("activate-user");
        greenParaContent.innerHTML = "Are you sure you want to activate "+ d[0].innerHTML;
	
	})
	
	
			var yellowyes = document.getElementById("yellowyes");
            yellowyes.onclick = function()
            {
				/*
                var stateobj = new Object();
                stateobj.id = ob._id;
                var request = new XMLHttpRequest();
                var filename = '/deactivate';
                request.open('PUT',filename);
                request.setRequestHeader("content-Type","application/JSON");
                request.send(JSON.stringify(stateobj));
                request.onload = function()
                {
                    console.log(request.responseText);
                }
				
				
						var xhttp = new XMLHttpRequest();
						xhttp.open('PUT', '/deactivateUser');
						xhttp.setRequestHeader("Content-Type", "application/json");
						xhttp.send(JSON.stringify({'flagNew':mail}));
					xhttp.onload = function()
					{
						console.log(request.responseText);
		
								$("#deact").toggleClass("btn btn-success btn-sm activebtn actionbtns");
							
					
					}
					
				
                //target.removeChild(b3);
                //insertGreenBtn(target,ob);
            }
	
	
	var greenyes = document.getElementById("greenyes");
        greenyes.onclick = function()
        {
			/*
            var actobj = new Object();
            actobj.id = ob._id;
            var request = new XMLHttpRequest();
            var filename = '/activate';
            request.open('POST',filename);
            request.setRequestHeader("content-Type","application/JSON");
            request.send(JSON.stringify(actobj));
            request.onload = function()
            {
                console.log(request.responseText);
            }
			
			
				var xhttp = new XMLHttpRequest();
				xhttp.open('PUT', '/activateUser');
				xhttp.setRequestHeader("Content-Type", "application/json");
				xhttp.send(JSON.stringify({'flagNew':mail}));
				xhttp.onload = function()
				{
						console.log(request.responseText);
				}
			
            //target.removeChild(b4);
			//target.appendChild(b4);
            //insertYellowBtn(target,ob);
        }
	*/

update_btn.onclick = function()
{
	var ob = new Object();
	ob.old_e = old_name;
	ob.old_p = old_phone;
	ob.nemail = update_username_field.value;
	ob.nphone = update_phone_field.value;
	ob.ncity = update_city_field.value;
	ob.nstatus = update_status_field.value;
	ob.nrole = update_role_field.value;
	
	var request = new XMLHttpRequest();
	request.open('PUT','/updateUserInUL');
	request.setRequestHeader("Content-Type","application/JSON");
    request.send(JSON.stringify(ob));
	console.log(request.responseText);
	request.onload=function()
	{
		//console.log(request.responseText);
			alert("User updated");
			//window.location="/home";
	}	
}

/* ----------------------------------------------------------
function updateUser(_id,username,phone,city,status,role)
   {
    // $('#eheading').html("Update " + username);
 		 $('#username').val(username);
 		 $('#phone').val(phone);
 		 $('#city').val(city);
     $('#status').val(status);
     $('#role').val(role);
     $('#editsubmit').click(function()
     {
         var obj = {
            _id :  _id,
           email : $("#username").val(),
           phone : $("#phone").val(),
           city : $("#city").val(),
           status : $("#status").val(),
           role : $("#role").val()
         }
          console.log(obj);
         // request.open('POST','/updateuser')
         $.ajax({
           url : '/updateuser',
           type : 'post',
           dataType : 'json',
           contentType : 'application/json',
           success : function (err,data) {
             if(err)
             throw err;
             else {
               console.log(data.msg);
             }
           },
           data : JSON.stringify(obj)
         })
     })
   }
*/
mailbutton.onclick = function()
{
	var ob = new Object();
	ob.receiver = to.value;
	ob.mbody = mail_body.value;
	var request = new XMLHttpRequest();
	request.open('POST','/sendMail');
	request.setRequestHeader("Content-Type","application/JSON");
    request.send(JSON.stringify(ob));
	request.onload=function()
	{
			//console.log("created in database");
			//alert("Mail sent");
			mail_body.value="";
			//window.location="/home";
	}
}
$.trumbowyg.svgPath="trumbowyg.svg";
$("#body").trumbowyg();
	

/*
window.onload = ()=>
{
	var request = new XMLHttpRequest()
	request.open('GET','list')
	request.send()
	request.onload = function()
	{
		var users = JSON.parse(request.responseText)
       console.log(users);
	
		for(var i in users)
		{
			addtoDOM(users[i])
		}
		update()
	}
}
/*
stat.addEventListener('click',function()
{
	var request = new XMLHttpRequest()
	request.open('GET','list')
	request.send()
	request.onload = function()
	{
		var users = JSON.parse(request.responseText)
       console.log(users);
	
		if(stat.value === "All" && urole.value === "All")
		{
			for(var i in users)
			{
				addtoDOM(users[i])
			}				
		}
		else
		{
		for(var i in users)
		{
			if(users[i].status == stat.value && users[i].role == urole.value)
				addtoDOM(users[i])
			 if(stat.value === "All" && users[i].role === urole.value)
				addtoDOM(users[i])
			if(urole.value ==="All" && users[i].status === stat.value)
				addtoDOM(users[i])
		
		}
		}
		update()
	}
});

urole.addEventListener('click',function()
{
	var request = new XMLHttpRequest()
	request.open('GET','list')
	request.send()
	request.onload = function()
	{
		var users = JSON.parse(request.responseText)
       console.log(users);
	
		if(stat.value === "All" && urole.value === "All")
		{
			for(var i in users)
			{
				addtoDOM(users[i])
			}				
		}
		else
		{
		for(var i in users)
		{
			if(users[i].status == stat.value && users[i].role == urole.value)
				addtoDOM(users[i])
			 if(stat.value === "All" && users[i].role === urole.value)
				addtoDOM(users[i])
			if(urole.value ==="All" && users[i].status === stat.value)
				addtoDOM(users[i])
		
		}
		}
		update()
	}
});
//

function addtoDOM(obj)
{
	var tr= document.createElement("tr")
	tr.setAttribute("id",obj.email)
	
	var username = document.createElement("td")
	username.innerHTML=obj.email
	tr.appendChild(username)
	
	var phone = document.createElement("td")
	phone.innerHTML=obj.phone
	tr.appendChild(phone)
	
	var city = document.createElement("td")
	city.innerHTML=obj.city
	tr.appendChild(city)
	
	var status = document.createElement("td")
	status.innerHTML=obj.status
	tr.appendChild(status)
	
	var role = document.createElement("td")
    role.innerHTML = obj.role;
    tr.appendChild(role)
	
	var actions = document.createElement("td")
	
	var a1 = document.createElement("a")
	a1.setAttribute("href","#")
	a1.style.background="#000"
	var mail = document.createElement("span")
	mail.setAttribute("class","fa fa-envelope")
	mail.setAttribute("id","dynamic")
	a1.appendChild(mail)
	actions.appendChild(a1)
	
	var a2 = document.createElement("a")
	a2.setAttribute("href","#myModal")
	//a2.style.background="#000"
	a2.setAttribute("data-toggle","modal")
	a2.setAttribute("class","btn btn-primary btn-sm")
	//a2.setAttribute("data-target","#myModal")
	var update = document.createElement("span")
	update.setAttribute("class","fa fa-edit")
	//update.setAttribute("id","dynamic")
	a2.appendChild(update)
	actions.appendChild(a2)
	
	if(obj.flag==1)
	{
		insertYellowBtn(actions,obj);
	}
	else if(obj.flag==0)
	{
		insertGreenBtn(actions,obj);
	}
	/*
	var a3 = document.createElement("a")
	a3.setAttribute("href","#deleteUser")
	//a3.style.background="#000"
	a3.setAttribute("data-toggle","modal")
	a3.setAttribute("data-backdrop","static")
	a3.setAttribute("data-keyboard","false")
	a3.setAttribute("class","btn btn-warning btn-sm")
	var deactivate = document.createElement("span")
	deactivate.setAttribute("class","fa fa-times-circle")
	//deactivate.setAttribute("id","dynamic")
	a3.appendChild(deactivate)
	actions.appendChild(a3)
	//
	tr.appendChild(actions)
	
	a1.addEventListener('click',function(event)	
	{
		alert("mail clicked")
	});

	a2.addEventListener('click',function(event)	
	{
		update_username_field.value = obj.email;
		old_name = obj.email;
		update_phone_field.value = obj.phone;
		old_phone = obj.phone;
		update_city_field.value = obj.city;
		update_status_field.value = obj.status;
		update_role_field.value = obj.role;
		//alert("edit clicked")
		$(document).ready(function(){
	//	$("#myBtn").click(function(){
		$("#myModal").modal(
		{
				backdrop: 'static',
				keyboard: false
		});
	//	});
		});
	});

	function insertYellowBtn(target,ob)
	{
        var b3 = document.createElement("button");
        b3.setAttribute("class","btn btn-warning btn-sm action-btn");
        b3.setAttribute("data-toggle","modal");
        b3.setAttribute("data-target","#yellowModal");
        b3.setAttribute("id","yellowbttn");
        var span3 = document.createElement("span");
        span3.setAttribute("class","fa fa-times-circle")
        span3.setAttribute("style","color:#fff");
        b3.appendChild(span3);

        b3.onclick = function()
        {
            var del_user = document.getElementById("del-user");
			del_user.innerHTML = "Are you sure you want to delete "+obj.email+" ?";
            // 0 is activated state that is yellow btn and grren is deactivate i.e 1
			//yellowyes = document.getElementById("yellowyes");
            yellowyes.onclick = function()
            {
				/*
                var stateobj = new Object();
                stateobj.id = ob._id;
                var request = new XMLHttpRequest();
                var filename = '/deactivate';
                request.open('PUT',filename);
                request.setRequestHeader("content-Type","application/JSON");
                request.send(JSON.stringify(stateobj));
                request.onload = function()
                {
                    console.log(request.responseText);
                }
				//
				
						var xhttp = new XMLHttpRequest();
						xhttp.open('PUT', '/deactivateUser');
						xhttp.setRequestHeader("Content-Type", "application/json");
						xhttp.send(JSON.stringify({'flagNew':obj.email}));
					xhttp.onload = function()
					{
						console.log(request.responseText);
					}
				
                target.removeChild(b3);
                insertGreenBtn(target,ob);
            }
        }
        target.appendChild(b3);

	}
function insertGreenBtn(target,ob)
{
    var b4 = document.createElement("button");
    b4.setAttribute("class","btn btn-success btn-sm action-btn");
    b4.setAttribute("data-toggle","modal");
    b4.setAttribute("data-target","#greenModal");
    b4.setAttribute("id","greenbttn");
    var span4 = document.createElement("span");
    span4.setAttribute("class","fa fa-check-circle")
    span4.setAttribute("style","color:#fff");
    b4.appendChild(span4);

    b4.onclick=function()
    {
        //console.log("hgjkb");
        var greenParaContent = document.getElementById("activate-user");
        greenParaContent.innerHTML = "Are you sure you want to activate "+ ob.email;
		
		greenyes = document.getElementById("greenyes");
        greenyes.onclick = function()
        {
			/*
            var actobj = new Object();
            actobj.id = ob._id;
            var request = new XMLHttpRequest();
            var filename = '/activate';
            request.open('POST',filename);
            request.setRequestHeader("content-Type","application/JSON");
            request.send(JSON.stringify(actobj));
            request.onload = function()
            {
                console.log(request.responseText);
            }
			//
			
				var xhttp = new XMLHttpRequest();
				xhttp.open('PUT', '/activateUser');
				xhttp.setRequestHeader("Content-Type", "application/json");
				xhttp.send(JSON.stringify({'flagNew':obj.email}));
				xhttp.onload = function()
				{
						console.log(request.responseText);
				}
			
            target.removeChild(b4);
			//target.appendChild(b4);
            insertYellowBtn(target,ob);
        }
    }
    target.appendChild(b4);
}
	
	

/*
	a3.addEventListener('click',function(event)	
	{
	
	var query = event.target.parentNode.parentNode.parentNode.id;
	console.log(query);
	var xhttp = new XMLHttpRequest();
	xhttp.open('PUT', '/deactivateUser');
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify({'flagNew':obj.email}));
	xhttp.onload = function()
	{
		alert(obj.email+" Deactivated");
		deactivate.setAttribute("class","fa fa-check-circle");
	}
	
	
	var del_user = document.getElementById("del-user");
	del_user.innerHTML = "Are you sure you want to delete "+obj.email+" ?";
	
	$(document).ready(function(){
		$("#deleteUser").modal(
		{
			    backdrop: 'static',
				keyboard: false
		});
	});
	
	
	});	

	btnss.onclick = ()=>
	{
		var xhttp = new XMLHttpRequest();
		xhttp.open('PUT', '/deactivateUser');
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.send(JSON.stringify({'flagNew':obj.email}));
		xhttp.onload = function()
		{
			alert(obj.email+" Deactivated");
			a3.setAttribute("class","btn btn-success btn-sm")
			deactivate.setAttribute("class","fa fa-check-circle");
		}
	}
	
	
//
	table.appendChild(tr)
	
}

function update()
{
	$(document).ready(function()
	{
		$('#data-table').DataTable();
	});
}

update_btn.addEventListener('click',function()
{
	var ob = new Object();
	ob.old_e = old_name;
	ob.old_p = old_phone;
	ob.email = update_username_field.value;
	ob.phone = update_phone_field.value;
	ob.city = update_city_field.value;
	ob.status = update_status_field.value;
	ob.role = update_role_field.value;
	
	var request = new XMLHttpRequest();
	request.open('PUT','/updateUser');
	request.setRequestHeader("Content-Type","application/JSON");
    request.send(JSON.stringify(ob));

	request.onload=function()
	{
			alert("User updated");
			//window.location="/home";
	}	
});
*/