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

 var home = document.getElementById("sidebar-home")
  home.onclick= ()=>
  {
    window.location = '/home'
  }

  var adduser = document.getElementById("sidebar-add")
  adduser.onclick= ()=>
  {
    window.location = '/adduser'
  }

  var userslist = document.getElementById("sidebar-list")
  userslist.onclick= ()=>
  {
    window.location = '/userslist'
  }

  var changepassword = document.getElementById("sidebar-password")
  changepassword.onclick= ()=>
  {
    window.location = '/changepassword'
  }
  
  var tagpanel = document.getElementById("sidebar-tag")
  tagpanel.onclick= ()=>
  {
    window.location = '/tag'
  }
  
  var communitylist = document.getElementById("sidebar-comm")
  communitylist.onclick= ()=>
  {
    window.location = '/clist'
  }
  
  var yes_btn = document.getElementById("yes");
   yes_btn.onclick= ()=>
  {
    window.location = '/superadmin'
  } 