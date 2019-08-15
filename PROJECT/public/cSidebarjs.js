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
	window.location = '/chome'
}

function openCommpage()
{
	window.location = '/cgroups'
}

function changepswd()
{
	window.location = '/cchangepassword'
}

function gotologinpage()
{
	window.location = '/out'
}

