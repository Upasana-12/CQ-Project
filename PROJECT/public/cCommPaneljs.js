/*
var create_btn = document.getElementById("createBtn")
create_btn.onclick = ()=>
{
	window.location = "/cAddCommunity"
}

var sbtn = document.getElementById("search-btn");
sbtn.onclick = function()
{
    console.log("--------------------++++++++++++++++++++")
    window.location = '/cUserSearch';
}
*/
/*
var commArr = [];
var panelBody = document.getElementById("panelBody");
loadFromServer();
function loadFromServer()
{
    var getuserId = document.getElementById("getuserId").innerHTML;
    console.log(getuserId);
   // var filename = '/getCommunityforUser';
   var filename = '/cl';
    var request = new XMLHttpRequest();
    request.open('GET',filename);
    request.send();
    request.onload = function()
    {
        commArr = JSON.parse(request.responseText);
        console.log(commArr);

        for(var i in commArr)
        {
			/*
            console.log(commArr[i].cOwner);
            console.log(getuserId);
            var n = (commArr[i].cOwner).localeCompare(getuserId);
            console.log(n);
             if(n==0);
             {
                 console.log("********");
                 console.log(n);
                 addDom(commArr[i]);
            }
            // if(commArr[i].ownerid.parseInt;
			///
             addDom(commArr[i]);
        }
    }
}
function addhr(target)
{
    var hr = document.createElement("hr");
    hr.setAttribute("style","color:black;border-width: 1px;")
    target.appendChild(hr);
}
function addDom(ob)
{
    console.log(ob);
    var parentDiv = document.createElement("div");
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    //var div4 = document.createElement("div");
    parentDiv.setAttribute("class","col-sm-12 col-xs-12");
    parentDiv.setAttribute("style","margin-top:5px");

    addhr(parentDiv);

    div1.setAttribute("class","col-sm-1 col-xs-3");
    div1.setAttribute("style","padding:10px");
    var img = document.createElement("img");
    img.setAttribute("src","cpic.png");
    img.setAttribute("style","height: 50px;width: 50px;border: 3px solid #fff;background: rgb(255, 255, 255) !important;box-shadow: 0 0 10px rgba(0,0,0,0.5);")
    div1.appendChild(img);
    parentDiv.appendChild(div1);


    div2.setAttribute("class","col-sm-10 col-xs-7");
    div2.setAttribute("style","padding-top:25px;padding-bottom:5px;");
    var para = document.createElement("p");
    var a1 = document.createElement("a");
    a1.innerHTML = ob.cOwner;
    var a2 = document.createElement("a");
    a2.innerHTML = "Request";
    para.appendChild(a1);
    para.appendChild(a2);
    div2.appendChild(para);
    parentDiv.appendChild(div2);

    div3.setAttribute("class","col-sm-1 col-xs-2");
    div3.setAttribute("style","padding-top:0px");
    var a3 = document.createElement("a");
    //a3.setAttribute("class","community-short-btn");
    a3.setAttribute("style","float:right");
    var label = document.createElement("label");
    label.setAttribute("class","label label-success");
    var i1 = document.createElement("i");
    i1.setAttribute("class","fa fa-cogs");
    label.appendChild(i1);
    a3.appendChild(label);
    div3.appendChild(a3);
    parentDiv.appendChild(div3);


    addhr(parentDiv);

    panelBody.appendChild(parentDiv);

}

*/

// ------------  Pardeep code ------------------

// var parent-div = document.getElementById("community-lists")
  $(document).ready(function() {
      var p = document.getElementById("objectId")
      p = p.textContent;
      //console.log(p);
      var request1 = new XMLHttpRequest()
      request1.open('GET','/ownedCommunities');
      request1.send();
      request1.onload = function()
      {
        var data = JSON.parse(request1.responseText);
        //console.log(data);
        for(var i in data)
        {
          if(data[i].cOwnerId == p)
          addtoDOM1(data[i]);
          else if(data[i].cRule == "Direct")
          addtoDOM2(data[i]);
          else
          addtoDOM3(data[i]);
        }
      }
  })

  function addtoDOM1(obj)
  {
     console.log(obj + "..");
   // var div = '<div class="col-sm-12 col-xs-12 myCommunity community-div" style="margin-top:5px;" id=""><div class="col-sm-1 col-xs-3" style="padding:10px;z-index:1"><a href="#"><img src="'+obj.photoname+'" class="cpic"></a></div><div class="col-sm-10 col-xs-7" style="padding-top:25px;padding-bottom:5px;"><p style="margin:0"><a class="comnametxt" href="#">'+obj.cName+'</a>&nbsp;&nbsp;&nbsp;<a class="comnametxt-user" href="#">Request('+obj.requestedMembers.length+')</a></p></div><div class="col-sm-1 col-xs-2" style="padding:0"><a class="community-short-btn" href="#" style="float:rignt"><label class="label label-success" style="cursor:pointer !important;"><i class="fa fa-cogs"></i></label></a></div></div>'

   var div = '<div class="col-sm-12 col-xs-12 community-div" style="margin-top:5px;" id="">' +
   '<div class="col-sm-1 col-xs-3" style="padding:10px;z-index:1"><a href="/community/discussions/'+obj._id+'"><img src="'+obj.photoname+'" class="cpic"></a></div>' +
   '<div class="col-sm-10 col-xs-7" style="padding-top:25px;padding-bottom:5px;"><p style="margin:0"><a class="comnametxt" href="/community/discussions/'+obj._id+'">'+obj.cName+'</a>&nbsp;&nbsp;&nbsp;<a class="comnametxt-user" href="/community/manageCommunity/'+obj._id+'">Request('+obj.requestedMembers.length+')</a></p></div>' +
   '<div class="col-sm-1 col-xs-2" style="padding:0"><a class="community-short-btn" href="/community/manageCommunity/'+obj._id+'" style="float:rignt"><label class="label label-success" style="cursor:pointer !important;"><i class="fa fa-cogs"></i></label></a></div>'
'</div>'

     $("#owned-list").append(div);
  }

  function addtoDOM2(obj)
  {
     console.log(obj);
     var c=obj.joinedMembers.length+1;
    var div = '<div class="col-sm-12 col-xs-12 myCommunity community-div" style="margin-top:5px;" id=""><div class="col-sm-1 col-xs-3" style="padding:10px;z-index:1"><a href="#"><img src="'+obj.photoname+'" class="cpic"></a></div><div class="col-sm-10 col-xs-7" style="padding-top:25px;padding-bottom:5px;"><p style="margin:0"><a class="comnametxt" href="#">'+obj.cName+'</a>&nbsp;&nbsp;&nbsp;<a class="comnametxt-user" href="#">Members('+c+')</a></p></div></div>'

     $("#member-list").append(div);
  }
/*
  function addtoDOM3(obj)
  {
     console.log(obj);
    var div = '<div class="col-sm-12 col-xs-12 myCommunity community-div" style="margin-top:5px;" id=""><div class="col-sm-1 col-xs-3" style="padding:10px;z-index:1"><a href="#"><img src="'+obj.photoname+'" class="cpic"></a></div><div class="col-sm-10 col-xs-7" style="padding-top:25px;padding-bottom:5px;"><p style="margin:0"><a class="comnametxt" href="#">'+obj.cName+'</a>&nbsp;&nbsp;&nbsp;<a class="comnametxt-user" href="#">Members('+obj.joinedMembers.length+')</a></p></div><div class="col-sm-1 col-xs-2" style="padding:0"><a class="community-short-btn" href="#" style="float:rignt"><label class="label label-success" style="cursor:pointer !important;"><i class="fa fa-cogs"></i></label></a></div></div>'

     $("#request-list").append(div);
  }
*/
function addtoDOM3(obj)
  {
     // console.log(obj);
     var c=obj.joinedMembers.length+1;
    var div = '<div class="col-sm-12 col-xs-12 community-div" style="margin-top:5px;" id=""><div class="col-sm-1 col-xs-3" style="padding:10px;z-index:1"><a href="#"><img src="'+obj.photoname+'" class="cpic"></a></div><div class="col-sm-10 col-xs-7" style="padding-top:25px;padding-bottom:5px;"><p style="margin:0"><a style="text-decoration:none;" href="#"><label class="label label-danger">Pending</label>&nbsp;&nbsp;&nbsp;'+obj.cName+'</a>&nbsp;&nbsp;&nbsp;<a style="text-decoration:none;color:black;cursor:context-menu">Members('+c+')</a></p></div><div class="col-sm-1 col-xs-2" style="padding:0"><a class="community-short-btn" data-toggle="modal" href="#cancelRequest" onclick=cancelRequest("'+obj._id+'","'+div+'") style="float:right"><label class="label label-danger" style="cursor:pointer !important;"><i class="fa fa-times"></i></label></a></div></div>'

     $("#request-list").append(div);
  }
  
  function cancelRequest(_id,div)
  {
    // console.log(div);
    console.log(_id);
    $('#yes-cancel').click(function()
    {
        var obj = Object();
        obj._id = _id;
        var request = new XMLHttpRequest();
        request.open('POST','/cancelRequest')
        request.setRequestHeader("content-Type","application/JSON");
        request.send(JSON.stringify(obj));
        request.onload = function()
        {
          console.log("aaagya");
          // window.reload();
        }
    })
  }