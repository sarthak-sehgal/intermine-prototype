function init()
{
	searchBar = document.getElementById("searchbar");
	searchButton = document.getElementById("searchButton");
	flymine_check = document.getElementsByClassName("flymine")[0];
	modmine_check = document.getElementsByClassName("modmine")[0];
	searchButton.addEventListener("click", search);
	searchBar.addEventListener("keyup", search);

	/*function isTouchDevice() {
	    return 'ontouchstart' in document.documentElement;
	}
	if (isTouchDevice()) {
    	document.getElementsByClassName("searchButton")[0].style.display = 'inline-block';
	}*/

	function search(e) {
		if(e.keyCode==13)
		{
			doSearch();
		}
		else if(this.id=="searchButton")
		{
			doSearch();
		}
		function doSearch()
		{
			if(searchBar.value != null && searchBar.value!=undefined && searchBar.value!="" && !isEmpty(searchBar.value))
			{
				queries = localStorage.getItem("queries");
				if (queries) {
				    queries = JSON.parse(queries);
				    if(queries.length<3)
				    {
				    	queries.push(searchBar.value);
				    }
				    else
				    {
				    	queries.push(searchBar.value);
				    	queries.splice(0,1);
				    }
					localStorage.setItem("queries", JSON.stringify(queries));
				}
				else
				{
					queries = new Array();
					queries.push(searchBar.value);
					localStorage.setItem("queries", JSON.stringify(queries));
					queries = localStorage.getItem("queries");
				}
				localStorage.setItem("flymine_check", flymine_check.checked);
				localStorage.setItem("modmine_check", modmine_check.checked);
			}
		}
		function isEmpty(str){
		    return !str.replace(/^\s+/g, '').length; // boolean (`true` if field is empty)
		}
	}
}
init();