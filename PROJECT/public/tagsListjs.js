/*
var tag_table = document.getElementById("tags_data");

window.onload = ()=>
{
	var request = new XMLHttpRequest()
	request.open('GET','listOfTag')
	request.send()
	request.onload = function()
	{
		var items = JSON.parse(request.responseText)
       console.log(items);
	
		for(var i in items)
		{
			addtoDOM(items[i])
		}
		update()
	}
}

function addtoDOM(obj)
{
	var tr= document.createElement("tr")
	tr.setAttribute("id",obj.createDate)
	
	var tagname = document.createElement("td")
	tagname.innerHTML = obj.tag
	tr.appendChild(tagname)
	
	var creator = document.createElement("td")
	creator.innerHTML = obj.creator
	tr.appendChild(creator)
	
	var cdate = document.createElement("td")
	cdate.innerHTML = obj.createDate
	tr.appendChild(cdate)
	
	var action = document.createElement("td")
	
	var a1 = document.createElement("a")
	a1.setAttribute("href","#")
	//a1.style.background="#000"
	a1.setAttribute("class","fa fa-trash");
	//var del = document.createElement("i")
	//del.setAttribute("class","fa fa-trash")
	//del.style.color="#fff"
	//a1.appendChild(del)
	action.appendChild(a1)
	tr.appendChild(action)
	
	a1.addEventListener('click',function(event)
	{
		var query = event.target.parentNode.parentNode.id;
	var xhttp = new XMLHttpRequest();
	xhttp.open('DELETE', '/deltag');
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify({'dateTag':query}));
	xhttp.onload = function()
	{
		alert("1 Tag Deleted");
	}
	tag_table.removeChild(event.target.parentNode.parentNode)	
	});
	
	tag_table.appendChild(tr)
	
}

function update()
{
	$(document).ready(function()
	{
		$('#tag-table').DataTable();
	});
}
*/

var tag_name;
var del_btn=document.getElementById("yellowyes");
function getdata() {
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#tag-table').DataTable({        // users-table   table ki id hai naa ki tbody ki
      "processing" : true,
      "serverSide" : true,
      "ajax": {
        "url":"/tl",
        "type":"POST",
      },
      "columns": [
      {
        "data" : "tag"
      },
      {
        "data" : "creator",
      },
      {
        "data" : "createDate"
      },
      {
        "data" : null,
        "sorting" : "false",
      }
    ],
    "columnDefs": [{
            "targets": 3,

            "render": function (data, type, row, meta) {
                data = '<center><a id="open-edit" class="btn btn-sm deleteTagbtn" style="background-color:black" onclick=deleteTag("'+row._id+'") data-toggle="modal" data-target="#del"><span class="fa fa-trash" style="color:white;"></span></a></center>'
                return data;
            }
        }],
    })

    $('#refresh').on('click', function () {
        table.ajax.reload(null, false);
    });

}

  $(document).ready(function() {
    console.log("1");
    getdata()
  })

  $(document).on("click", "#open-edit", function() {
	d = $(this).parent().parent().parent()[0].children;
	console.log(d[0]);
	tag_name = d[0].innerHTML;
	//old_phone = d[1].innerHTML;
})

del_btn.onclick=function()
{
	var xhttp = new XMLHttpRequest();
	xhttp.open('DELETE', '/deltag');
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify({'dateTag':tag_name}));
	xhttp.onload = function()
	{
		console.log("1 Tag Deleted");
	}

}
   function deleteTag()
   {
     // console.log("hellllllllllllllllllll");
     //  $.confirm({
     //     title: 'Delete Tag!',
     //     content: 'Are you sure you want to delete',
     //     draggable: true,
     //     buttons: {
     //         Yes: {
     //             btnClass: 'btn-success',
     //             action: function () {}
     //         },
     //         No: {
     //           btnClass: 'btn-danger',
     //           action : function() {},
     //       },
     //     }
     // });
   }


  