function inti()
{
	flymine_check = localStorage.getItem("flymine_check");
	chomine_check = localStorage.getItem("chomine_check");
	queries = JSON.parse(localStorage.getItem("queries"));
	console.log(queries[queries.length-1]);
	if(flymine_check=="false")
	{
		document.getElementById("flymine_tab").style.display = "none";
		document.getElementsByClassName("flymine_section")[0].style.display = "none";
		document.getElementById("chomine_tab").classList += " is-active";
		document.getElementsByClassName("chomine_section")[0].classList += " is-active";
	}
	else
	{
		$.getJSON( "http://www.flymine.org/flymine/service/search?q="+queries[queries.length-1], function( data ) {
			console.log(data);
		});
	}
	if(chomine_check=="false")
	{
		document.getElementById("chomine_tab").style.display = "none";
		document.getElementsByClassName("chomine_section")[0].style.display = "none";
		document.getElementById("flymine_tab").classList += " is-active";
		document.getElementsByClassName("flymine_section")[0].classList += " is-active";
	}
	else
	{
		$.getJSON( "https://chomine.boku.ac.at/chomine/service/search?q="+queries[queries.length-1], function( data ) {
			console.log(data);
		});
	}
}
inti();