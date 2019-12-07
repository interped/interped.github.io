var data = {};
data.flavors = {};

var display = {};
display.flavors = {};

function FetchData()
{
	data.str = parseFloat( document.getElementById( "str" ).value );
	data.pg = parseFloat( document.getElementById( "pg" ).value );
	data.vg = parseFloat( document.getElementById( "vg" ).value );

	Object.keys( data.flavors ).forEach( function( flavor ) {
		data.flavors[flavor] = parseFloat( document.getElementById( flavor ).value );
	} );

	data.amt = parseFloat( document.getElementById( "amt" ).value );
}

function AddFlavor( event )
{
	var prompt = document.getElementById( "prompt" );
	prompt.style.visibility = "visible";

	prompt.style.left = event.clientX;
	prompt.style.top = event.clientY;
}

function CancelFlavor()
{
	var prompt = document.getElementById( "prompt" );
	prompt.style.visibility = "hidden";
}

function ConfirmFlavor()
{
	var prompt = document.getElementById( "prompt" );

	data.flavorCount += 1;

	document.getElementById( "flavors" ).innerHTML += document.getElementById( "flavorname" ).value + "<input type=\"text\" id=\"" + document.getElementById( "flavorname" ).value + "\" value=\"0\"></input>%<br />";
	data.flavors[document.getElementById( "flavorname" ).value] = 0;

	document.getElementById( "display" ).innerHTML += "<tr><td>" + document.getElementById( "flavorname" ).value + "</td><td id=\"" + document.getElementById( "flavorname" ).value + "ml\""+">0</td><td id=\"" + document.getElementById( "flavorname" ).value + "p\""+">0</td></tr>";


	document.getElementById( "flavorname" ).value = "";
	prompt.style.visibility = "hidden";
}

function Display()
{
	document.getElementById( "nicml" ).innerHTML = display.nicml;
	document.getElementById( "pgml" ).innerHTML = display.pgml;
	document.getElementById( "vgml" ).innerHTML = display.vgml;
	document.getElementById( "baseml" ).innerHTML = display.baseml;

	Object.keys( display.flavors ).forEach( function( flavor ) {
		document.getElementById( flavor + "ml" ).innerHTML = display.flavors[flavor];
		document.getElementById( flavor + "p" ).innerHTML = display.flavors[flavor] / data.amt * 100;
	} );

	document.getElementById( "nicp" ).innerHTML = display.nicp;
	document.getElementById( "pgp" ).innerHTML = display.pgp;
	document.getElementById( "vgp" ).innerHTML = display.vgp;
	document.getElementById( "basep" ).innerHTML = display.basep;

	document.getElementById( "nicmg" ).innerHTML = "Strength: " + data.str + "mg";
	document.getElementById( "ratio" ).innerHTML = "PG/VG Ratio: " + data.pg + "/" + data.vg;

	var sum = 0;

	Object.keys( display.flavors ).forEach( function( flavor ){
		sum += display.flavors[flavor];
	} );

	document.getElementById( "flvrtotal" ).innerHTML = " Flavor total: " + sum;
}

function Calculate()
{
	display.nicml = data.str * data.amt / 100;

	display.pgml = data.pg / 100 * data.amt;

	Object.keys( data.flavors ).forEach( function( flavor ) {
		display.flavors[flavor] = data.flavors[flavor] / 100 * data.amt;

		display.pgml -= display.flavors[flavor];
	} );

	 display.pgml -= display.nicml;

	display.vgml = data.vg / 100 * data.amt;
	display.baseml = display.nicml + display.pgml + display.vgml;

	display.nicp = display.nicml / data.amt * 100;
	display.pgp = display.pgml / data.amt * 100;
	display.vgp = display.vgml / data.amt * 100;
	display.flvr1p = display.flvr1 / data.amt * 100;
	display.flvr2p = display.flvr2 / data.amt * 100;
	display.basep = display.baseml / data.amt * 100;
}

function Refresh()
{
	FetchData();
	Calculate();
	Display();
}

setInterval( Refresh, 100 );
