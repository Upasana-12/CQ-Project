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

  var home = document.getElementById("home")
  home.onclick= ()=>
  {
    window.location = '/home'
  }

  var adduser = document.getElementById("adduser")
  adduser.onclick= ()=>
  {
    window.location = '/adduser'
  }

  var userslist = document.getElementById("userslist")
  userslist.onclick= ()=>
  {
    window.location = '/userslist'
  }

  var changepassword = document.getElementById("changepassword")
  changepassword.onclick= ()=>
  {
    window.location = '/changepassword'
  }
  /*
  var logout = document.getElementById("logout")
  logout.onclick= ()=>
  {
    window.location = '/out'
  } //
  
  var tagpanel = document.getElementById("tagpanel")
  tagpanel.onclick= ()=>
  {
    window.location = '/tag'
  }
  
  var communitylist = document.getElementById("communitylist")
  communitylist.onclick= ()=>
  {
    window.location = '/clist'
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
  
  var yes_btn = document.getElementById("yes");
   yes_btn.onclick= ()=>
  {
    window.location = '/superadmin'
  } 
  
  function homepage()
  {
	  window.location= '/home'
  }
  
  function open_adduser_page()
  {
	  window.location = '/adduser'
  }
  
  function openuserlist()
  {
	  window.location = '/userslist'
  }
  
 function admincomm()
 {
	window.location = '/clist'
 }	 
  
  function opentagpage()
  {
	  window.location = '/tag'
  }
  
  function changepassword()
  {
	  window.location = '/changepassword'
  }
  
  function gotologinpage()
{
	window.location = '/out'
}