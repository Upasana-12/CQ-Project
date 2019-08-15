/*var div = document.getElementById("sidebar")
var p = document.getElementById("main-header")
p.onclick= ()=>
{
  if(div.style.width == '50px')
  {
    div.style.width = '250px'
  }
  else
  {
    div.style.width = '50px'
  }
}

var img = document.getElementById("image")
img.onclick = ()=>
{
	window.location="/userEdit"
}*/

var img = document.getElementById("dpimage");
img.onclick = ()=>
{
	window.location="/userEdit"
}

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