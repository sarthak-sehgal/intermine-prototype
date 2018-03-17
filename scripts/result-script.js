function inti()
{
	beanmine_check = localStorage.getItem("beanmine_check");
	chomine_check = localStorage.getItem("chomine_check");
	queries = JSON.parse(localStorage.getItem("queries"));

	if(beanmine_check=="false")
	{
		document.getElementById("beanmine_tab").style.display = "none";
		document.getElementsByClassName("beanmine_section")[0].style.display = "none";
		document.getElementById("chomine_tab").classList += " is-active";
		document.getElementsByClassName("chomine_section")[0].classList += " is-active";
	}
	else
	{
		$.getJSON( "https://mines.legumeinfo.org/beanmine/service/search?q="+queries[queries.length-1], function( data ) {
			render("beanmine", data);
		});
	}
	if(chomine_check=="false")
	{
		document.getElementById("chomine_tab").style.display = "none";
		document.getElementsByClassName("chomine_section")[0].style.display = "none";
		document.getElementById("beanmine_tab").classList += " is-active";
		document.getElementsByClassName("beanmine_section")[0].classList += " is-active";
	}
	else
	{
		$.getJSON( "https://chomine.boku.ac.at/chomine/service/search?q="+queries[queries.length-1], function( data ) {
			render("chomine", data);
		});
	}
	
	function render(mine, data)
	{
		document.getElementById(mine+"_title").innerHTML+=queries[queries.length-1] + ' (' + data.totalHits + ')';
		document.getElementById(mine+"_tab").innerHTML+=' ('+data.totalHits+')';
		var results = data.results;
		$.each(results, function (k, v) {
			
			if(v.relevance==undefined)
				v.relevance="";

			if(v.fields['organism.name'] == undefined)
			{
				name = v.fields["gene.symbol"];
				if(v.fields["gene.symbol"]==undefined)
				{
					name = v.fields.title;
					if(v.fields.title==undefined)
					{
						name = v.fields.name;
						if(v.fields.name==undefined)
						{
							name = v.fields.experimentTraitName;
							if(name==undefined)
								name="";
						}
					}
				}
			}
			else
				name = v.fields['organism.name'];
			
			var details ="";
			for(var key in v.fields) {
				details += '<ul style="padding: 0; margin: 0">';
				if(v.fields[key]!=name)
				{
					details += '<li style="padding: 0; margin: 0">'+key+': '+v.fields[key]+'</li>';
				}
				details += '</ul>';
			}

			document.getElementById(mine+"_table").innerHTML+= '<tr><td class="mdl-data-table__cell--non-numeric">'+v.type+'</td><td class="mdl-data-table__cell--non-numeric">'+name+'</td><td class="mdl-data-table__cell--non-numeric">'+details+'</td><td class="mdl-data-table__cell--non-numeric">'+v.relevance+'</td></tr>';
		});
	}
}
inti();