var data = {};
var display = {};

function FetchData()
{
	data.str = parseFloat( document.getElementById( "str" ).value );
	data.pg = parseFloat( document.getElementById( "pg" ).value );
	data.vg = parseFloat( document.getElementById( "vg" ).value );
	data.flvr1 = parseFloat( document.getElementById( "flvr1" ).value );
	data.flvr2 = parseFloat( document.getElementById( "flvr2" ).value );
	data.amt = parseFloat( document.getElementById( "amt" ).value );
}

function Display()
{
	document.getElementById( "nicml" ).innerHTML = display.nicml;
	document.getElementById( "pgml" ).innerHTML = display.pgml;
	document.getElementById( "vgml" ).innerHTML = display.vgml;
	document.getElementById( "baseml" ).innerHTML = display.baseml;
	document.getElementById( "flvr1ml" ).innerHTML = display.flvr1;
	document.getElementById( "flvr2ml" ).innerHTML = display.flvr2;

	document.getElementById( "nicp" ).innerHTML = display.nicp;
	document.getElementById( "pgp" ).innerHTML = display.pgp;
	document.getElementById( "vgp" ).innerHTML = display.vgp;
	document.getElementById( "basep" ).innerHTML = display.basep;
	document.getElementById( "flvr1p" ).innerHTML = display.flvr1p;
	document.getElementById( "flvr2p" ).innerHTML = display.flvr2p;

	document.getElementById( "nicmg" ).innerHTML = "Strength: " + data.str + "mg";
	document.getElementById( "ratio" ).innerHTML = "PG/VG Ratio: " + data.pg + "/" + data.vg;
	document.getElementById( "flvrtotal" ).innerHTML = " Flavor total: " + ( display.flvr1 + display.flvr2 ) + "ml";
}

function Calculate()
{
	display.flvr1 = data.flvr1 / 100 * data.amt;
	display.flvr2 = data.flvr2 / 100 * data.amt;
	display.nicml = data.str * data.amt / 100;
	display.pgml = data.pg / 100 * data.amt - display.flvr1 - display.flvr2 - display.nicml;
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
