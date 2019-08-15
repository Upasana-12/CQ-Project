/*
  var sidebar_div = document.getElementById("sidebar")
  var li = document.getElementById("main-sidebar")
  li.onclick= ()=>
  {
    if(div.style.width == '50px')
    {
      sidebar_div.style.width = '250px'
    }
    else
    {
      sidebar_div.style.width = '50px'
    }
  }
  
  var superadmin = document.getElementById("sa")
  superadmin.onclick= ()=>
  {
    window.location = '/superadmin'
  }
  
  var communities = document.getElementById("communities")
  communities.onclick= ()=>
  {
    window.location = '/groups'
  }
  

  
  var changepassword = document.getElementById("changepassword")
  changepassword.onclick= ()=>
  {
    window.location = '/usercp'
  }
  
   var yes_btn = document.getElementById("yes");
   yes_btn.onclick= ()=>
  {
    window.location = '/home'
  } 
  */
  
  function openbar()
{
    /*var k = document.getElementById("sidebar");
    if(k.style.width == "250px")
    k.style.width ="50px";
    else {
        k.style.width="250px";
    }*/
    var element = document.getElementById("viewscreen");
    element.classList.toggle("toggle-pc");

    var element = document.getElementById("sidebar");
    element.classList.toggle("sidebar-width");


    var element = document.getElementById("rightview");
    element.classList.toggle("set-rightview");
}

function updateprofilepage()
{
	window.location = '/superadmin'
}

function openCommpage()
{
	window.location = '/userComP'
}

function changepswd()
{
	window.location = '/usercp'
}

function gotologinpage()
{
	window.location = '/out'
}

function switchToadmin()
{
	window.location = '/home'
}