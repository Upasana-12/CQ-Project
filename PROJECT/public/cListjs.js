/*
var table= document.getElementById("cdata");
var update_name = document.getElementById("CommuityName");
var update_status = document.getElementById("communityStatus");
var p = document.getElementById("CommunityAdminPop");
var h = document.getElementById("CommunityNamePop");
var img_id = document.getElementById("CommunityProfilePic");
var desc_id = document.getElementById("communityDesc");
var side = document.getElementById("CommunityInfoPop");
var update_btn = document.getElementById("editsubmit");
var old_name, old_status;


window.onload = ()=>
{
	var request = new XMLHttpRequest()
	request.open('GET','cl')
	request.send()
	request.onload = function()
	{
		var coms = JSON.parse(request.responseText)
       console.log(coms);
	
		for(var i in coms)
		{
			addtoDOM(coms[i])
		}
		update()
	}
}

function addtoDOM(obj)
{
	var tr= document.createElement("tr")
	tr.setAttribute("id",obj._id)
	
	var cname = document.createElement("td")
	cname.innerHTML=obj.cName
	tr.appendChild(cname)

	var crule = document.createElement("td")
	crule.innerHTML=obj.cRule
	tr.appendChild(crule)	
	
	var cloc = document.createElement("td")
	cloc.innerHTML=obj.cLoc
	tr.appendChild(cloc)

	var co = document.createElement("td")
	co.innerHTML=obj.cOwner
	tr.appendChild(co)	
	
	var cd = document.createElement("td")
	cd.innerHTML=obj.cDate
	tr.appendChild(cd)	
	
	var actions = document.createElement("td")
	
	var a1 = document.createElement("a")
	a1.setAttribute("href","#updateCommunity")
	a1.setAttribute("data-toggle","modal")
	var span = document.createElement("span")
	span.setAttribute("class","fa fa-edit");
	span.setAttribute("id","dynam")
	a1.appendChild(span)
	actions.appendChild(a1)	
	
	var a2 = document.createElement("a")
	a2.setAttribute("href","#CommunityInfo")
	a2.setAttribute("data-toggle","modal")
	var span2 = document.createElement("span")
	span2.setAttribute("class","fa fa-info");
	span2.setAttribute("id","dynam")
	a2.appendChild(span2)	
	actions.appendChild(a2)	
	
	tr.appendChild(actions)

	a1.addEventListener('click',function(event)	
	{
		//alert("edit clicked")
		update_name.value = obj.cName;
		old_name = obj.cName;
		update_status.value = obj.cStatus;
		old_status = obj.cStatus;
		var l1 =  document.createElement("label")
		//l1.innerHTML = "Update " +obj.cName;
		//h.appendChild(l1);
		//var l2 = document.createElement("l");
	//	l2.innerHTML = "Created by "+obj.cOwner+", "+obj.cDate;
	//	p.appendChild(l2);
	h.innerHTML = "Update " +obj.cName;
	p.innerHTML = "Created by "+obj.cOwner+", "+obj.cDate;
		$(document).ready(function(){
		$("#updateCommunity").modal();
		});		
	});
	
	a2.addEventListener('click',function(event)	
	{
		//alert("info clicked")
	//	var p = document.createElement("p");
	//	p.innerHTML = obj.cDesc;
	//	desc_id.appendChild(p);
		desc_id.innerHTML = obj.cDesc;
		img_id.setAttribute("src","cpic.png");
		side.innerHTML = "COMMUNITY: "+ obj.cName;
	$(document).ready(function(){
		$("#CommunityInfo").modal();
	});		
	});	
	
	var cpic = document.createElement("td")
	var img = document.createElement("img")
	img.setAttribute("src","cpic.png")
	//img.setAttribute("class","img-thumbnail")
	img.setAttribute("width","100%")
	img.setAttribute("height","50%")
	cpic.appendChild(img)
	tr.appendChild(cpic)	
	
	table.appendChild(tr)
}

function update()
{
	$(document).ready(function()
	{
		$('#c-table').DataTable();
	});
}

update_btn.addEventListener('click',function()
{
	h.innerHTML = "";
	p.innerHTML = "";
	var ob = new Object();
	ob.old_n = old_name;
	ob.old_s = old_status;
	ob.cName = update_name.value;
	ob.cStatus = update_status.value;
	var request = new XMLHttpRequest();
	request.open('PUT','/updateCom');
	request.setRequestHeader("Content-Type","application/JSON");
    request.send(JSON.stringify(ob));
	
	console.log(request.responseText);
	
	request.onload=function()
	{
			//alert("Com updated");
			//window.location="/home";
	}	
});

//------------------------------------------------------------

/*
function getdata()
{
	$.fn.dataTable.ext.errMode = 'none';
	var table = $('#c-table').DataTable({
      processing : true,
      serverSide : true,
      "ajax": {
        "url":"/cl",
        "type":"POST",
          "data" : function(d){
			d.cRule   = $('#crule').val();
            }
		},
		 "columns": [{
        "data" : "cName"
      },
      {
        "data" : "cRule",
		"sorting" : "false"
      },
      {
        "data" : "cLoc"
      },
      {
        "data" : "cOwner",
		//"sorting" : "false",
      },
      {
        "data" : "cDate",
		//"sorting" : "false",
      },
      {
        "data" : null,
		"sorting" : "false"
      },
	  {
		"data" : null,
		"sorting" : "false" 
	  },
    ],
	"columnDefs": [{
                "targets": 6,

                "render": function (data, type, row, meta) {
				data ='<img src="'+row.photoname+'" style="width:80px; height:80px; border:4px solid red;"></img>'
               return data;
				 
                }
			},{
	          "targets" : 5,

          "render" : function (data,type,row,meta) {
          //  data = '<center><a class="btn btn-sm editbtn actionbtns" data-target="#updateCommunity" data-toggle="modal" onclick=editCommunity("'+row.cDate+'","'+row.cOwner+'","' + encodeURIComponent(row.cName) + '","' + encodeURIComponent(row.cStatus) + '","'+row._id+'") style="margin-top:35px;background-color: #2D312C;color: #fff"><span class="fa fa-edit"></span></a><a class="btn btn-sm infobtn actionbtns" onlcick=showComminfo("' + encodeURIComponent(row.cName) + '", "' + row.cName + '" ,"' + encodeURIComponent(row.cDesc) + '")  data-toggle="modal" data-target="#CommunityInfo" style="margin-top:35px;background-color: #2D312C;color: #fff"><span class="fa fa-info"></span></a></center>'
		    data = '<center><a class="btn btn-sm editbtn actionbtns" data-target="#updateCommunity" data-toggle="modal" onclick=editCommunity("'+row.cDate+'","'+row.cOwner+'","'+row.cName+'","' +row.cStatus+ '","'+row._id+'") style="margin-top:35px;background-color: #2D312C;color: #fff"><span class="fa fa-edit"></span></a><a class="btn btn-sm infobtn actionbtns" onlcick=showComminfo("' + encodeURIComponent(row.cName) + '", "' + row.cName + '" ,"' + encodeURIComponent(row.cDesc) + '")  data-toggle="modal" data-target="#CommunityInfo" style="margin-top:35px;background-color: #2D312C;color: #fff"><span class="fa fa-info"></span></a></center>'
            
			return data;			
			}
            }],	
	})
	
	$('#crule').on('change', function () {
        table.ajax.reload(null, false);
    });
}

  $(document).ready(function() {

    //console.log("1");
    getdata();

  })
  
 function editCommunity(obj,commo,commn,comms,_id)
  {
    //  commn = decodeURIComponent(commn)
    //  comms = decodeURIComponent(comms)
      $('#CommunityNamePop').html("Update " + commn);
      $('#CommunityAdminPop').html("Created by " + commo + "," + obj);
      $('#CommuityName').val(commn);
      $('#communityStatus').val(comms);
      $('#editsubmit').off('click').on('click', function() {
        var obj = Object();
        obj._id = _id;
        obj.cName = $('#CommuityName').val();
        obj.cStatus = $('#communityStatus').val();
        var request = new XMLHttpRequest()
        request.open('PUT','/updateCom')
        request.setRequestHeader("Content-Type","application/json");
        request.send(JSON.stringify(obj));
        request.onload = function ()
        {
          alert('UPDATED');
          // $('#'+id+'').html(obj.communityname);
        }
      });
  }

  function showComminfo(commn,i,commd)
  {
    console.log("32");
    commn = decodeURIComponent(commn)
    commd = decodeURIComponent(commd)
    // $('#CommunityProfilePic').attr("src",image);
  }

	*/



	var table;
	function getdata() {
	 $.fn.dataTable.ext.errMode = 'none';
	 table = $('#community-table').DataTable({
	   "processing" : true,
	   "serverSide" : true,
	   "rowId" : "_id",
	   "ajax": {
		 "url":"/cl",
		 "type":"POST",
		 "data" : function(d) {
		   d.cRule= $('#membership-select').val();
		 }
	   },
	   "columns": [
	   {
		 "data" : "cName",
		 // id : "_id",
	   },
	   {
		 "data" : "cRule",
		  "sorting" : "false"
	   },
	   {
		 "data" : "cLoc"
	   },
	   {
		 "data" : "cOwner",
		 // "sorting" : "false",
	   },
	   {
		 "data" : "cDate",
		 // "sorting" : "false",
	   },
	   {
		 "data" : null,
		 "sorting" : "false"
	   },
	   {
		 "data" : null,
		 "sorting" : "false"
	   },
	 ],
	 "columnDefs": [{
			 "targets": 6,
 
			 "render": function (data, type, row, meta) {
			   // console.log("0");
				 data ='<img src="'+row.photoname+'" style="width:80px; height:80px;'
				 if(row.cStatus === 'Active')
				 data = data + 'border:4px solid green;"></img>'
				 else {
				   data = data + 'border:4px solid red;"></img>'
				 }
				return data;
			 }
 
		 },{
		   "targets" : 5,
 
		   "render" : function (data,type,row,meta) {
			 // console.log(data);
			 data = '<center><a class="btn btn-sm editbtn actionbtns" data-target="#updateCommunity" data-toggle="modal" onclick=editCommunity("'+encodeURIComponent(row.cOwner)+'","' + encodeURIComponent(row.cName) + '","' + encodeURIComponent(row.cStatus) + '","'+row._id+'") style="margin-top:35px;background-color: #2D312C;color: #fff"><span class="fa fa-edit"></span></a><a class="btn btn-sm infobtn actionbtns" onclick=showComminfo("'+ encodeURIComponent(row.cName)+'","'+encodeURIComponent(row.photoname)+'","'+encodeURIComponent(row.cDesc)+'") data-toggle="modal" data-target="#CommunityInfo" style="margin-top:35px; background-color: #2D312C; color: #fff"><span class="fa fa-info"></span></a></center>'
			 return data;
		   }
		 }],
	 })
 
	 $('#membership-select').on('change', function () {
		 table.ajax.reload(null, false);
	   });
 
	 $('#refresh').on('click', function () {
	   console.log("sdkj");
		 table.ajax.reload(null, false);
	   });
 
	   }
 
   $(document).ready(function() {
	 console.log("1");
	 getdata()
   })
 
   function editCommunity(commo,commn,comms,_id)
   {
	   console.log("in edit------------")
	   commn = decodeURIComponent(commn)
	   comms = decodeURIComponent(comms)
	   commo = decodeURIComponent(commo)
	   console.log(commn,comms,commo);
	   $('#CommunityNamePop').html("Update " + commn);
	   $('#CommunityAdminPop').html("Created by " + commo + "." );
	   $('#CommuityName').val(commn);
	   $('#communityStatus').val(comms);
	   $('#editsubmit').off('click').on('click', function() {
		 var obj = Object();
		 obj._id = _id;
		 obj.cName = $('#CommuityName').val();
		 obj.cStatus = $('#communityStatus').val();
		 console.log(obj);
		 var request = new XMLHttpRequest()
		 request.open('PUT','/updateCom')
		 request.setRequestHeader("Content-Type","application/json");
		 request.send(JSON.stringify(obj));
		 request.onload = function ()
		 {
		   alert('UPDATED');
		   table.ajax.reload(null,false);
		 }
	   });
   }
 
   function showComminfo(commn,image,commd)
   {
	 // console.log("sdhgcdsj");
	 commn = decodeURIComponent(commn)
	 commd = decodeURIComponent(commd)
	 image = decodeURIComponent(image)
	 console.log(commd,commn,image);
	 $('#CommunityProfilePic').attr("src",image);
	 $('#CommunityInfoPop').html('Commuity '+commn);
	 $('#communityDesc').html(commd);
   }
 