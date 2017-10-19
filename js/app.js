/*
profit
2016, goldfischclub, pw@goldfischclub.de
2016 - 11 - 10 - responsive
2017 - 07 - 22
*/




var _visualH;
var _ankerYAry;
var _ankerNameAry;
var _scrollToBaustein = 0;
var _bausteinDockSubheadline

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
        return 0;
    }
    else{
        return results[1] || 0;
    }
}


function isTouchDevice()
{
    return (('ontouchstart' in window)
      || (navigator.MaxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0));
}


		




function tabNav()
{
	$(".tab-navigation li a").click(function() 
	{
		var href = $(this).attr("href");	
		if (href == "#") return;
	
		var st = $(href).offset();
		var ty = Math.round( st.top )-100;
	
		$("html, body").animate({ scrollTop: ty }, "slow", "easeOutExpo");
		
		return false;
	});
}

function goArtikelAnker(art, anker)
{

	var url = window.location.href;
	url = url.replace(domain, ""); //domain definiert in head template
	

	var p = url.indexOf('#');
	if (p > 0) url = url.substring(0,p);
	

	if (art == artikel) 
	{
		// scroll im artikel zu anker
		$("#sidr-menu .close").trigger('click');
		
		var st = $("#"+anker).offset();
		var ty = Math.round( st.top )-100;
		$("html, body").animate({ scrollTop: ty }, "slow", "easeOutExpo");
		
	}else{
		window.location = art+"#"+anker;
	}
	
	return;
	
}

function bindCloseSidr(){
	
	$("#sidr-menu .close").click(function() 
	{
		$.sidr('close', 'sidr-menu');
		return false;
	});
	
	$("#sidr-login .close").click(function() 
	{
		$.sidr('close', 'sidr-login');
		return false;
	});
	
}

function triggerSidrOpenLogin()
{
	$( "#right-login" ).trigger( "click" );
}


function bindSidrNav()
{
	
	$('#right-menu').sidr({
      name: 'sidr-menu',
      side: 'right' // By default
    });
    
    $('#right-menu-tab').sidr({
      name: 'sidr-menu',
      side: 'right' // By default
    });
    
    $('#right-login').sidr({
      name: 'sidr-login',
      side: 'right'
    });
    
}


function bindBausteinAddToCart()
{

}

function setScrollTop(st)
{
	$(document).scrollTop(st);
}

function checkBaustein(t,key)
{
	var st = $(document).scrollTop();
	var ob = "."+key+" .st";
	$(ob).val(st);
	t.form.submit();
}


function bindSuche()
{
	$("a.suche-trigger").click(function() 
	{
		$('.search-wrap').show();
		bindSearchSubmit();
		return false;
	});
}
function bindSearchSubmit()
{
	$("a.suche-trigger").click(function() 
	{
		$('#rexsearch_form').submit();
		return false;
	});
}


function trackYScroll()
{

	if ($('.visual').length > 0) _visualH = $('.visual').height()-40;
	else _visualH = 50; //no visual
	_visualH = _visualH - 43;
	
	
	 	
	var yoffset = 260;
	if ($("body").hasClass( "a-33" )){
		yoffset = 760;
	}
	
	
	_ankerYAry = new Array();
	_ankerNameAry = new Array();
	
	/*
	durch alle element mit klasse anker loopen
	- id in _ankerNameAry sammlen
	- y-position in _ankerYAry sammeln
	*/
	$(".anker").each(function() 
	{
   		var id = $(this).attr('id');
   		var y = parseInt(Math.round($(this).position().top) - yoffset);
   		_ankerYAry.push(y);
   		_ankerNameAry.push(id);
	});
	
	
	
	
	//_ankerYAry.reverse();
	
	if($('.subheadline-sticky').length > 0) {
		_bausteinDockSubheadline = $('.subheadline-sticky').offset().top ;
	}

	
	$(document).scroll(function () 
	{
		var y = $(this).scrollTop();
		
		if (y >= _visualH)
		{
			if ($(window).width() > 700) $('html').addClass('visual-fixed');
		}else{
			$('html').removeClass('visual-fixed');
		}
		
		if (y >= _bausteinDockSubheadline)
		{
			$('html').addClass('subheadline-sticky-fixed');
		}else{
			$('html').removeClass('subheadline-sticky-fixed');
		}
		
		// anker index ermitteln
		var index = returnCurrentAnker(y);
		console.log(y +"|"+ index);
		console.log(_ankerYAry.toString());
		console.log(_ankerNameAry.toString());
		updateTabStatus(index);
	});

}

/*
aktuelle scroll-position mit _ankerYAry position prüfen, an welcher position ist der aktuellen y-wert > als array-wert
*/
function returnCurrentAnker(y)
{
	var r = 0;
	$.each( _ankerYAry, function( index, value )
	{
    	if (y > value) {
			r = index;    		
    		return r ;
    	}
	});
	
	return r;
}


/*
nach index in _ankerYAry die anker-id suchen
*/
function updateTabStatus(index){
	
	if (index > -1)
	{
		var myclass = _ankerNameAry[index];
		console.log("myclass: " + myclass);
		
		// tab-navigation in visual: anker id = klasse in tab-navigation, alle alpha 0.5, aktive klasse auf alpha 1
		$('.tab-navigation li a').css('opacity', '0.5');
		$('.'+myclass+' a').css('opacity', '1');
		
		//navigation
		$('.nav-wrap .level2 li').removeClass("aktiv");
		$('.nav-wrap .level2.current > li.tab-'+index).addClass("aktiv");
		
		
	}else{
		$('.tab-navigation li a').css('opacity', '1');
	}
	
}


function bindBildboxDown()
{
	$("a.next-down").click(function() 
	{
		var st = $(this).offset();
		var ty = Math.round( st.top );
		$("html, body").animate({ scrollTop: ty }, "slow", "easeOutExpo");
		return false;
	});
	

}


function bindBausteinAuswahl()
{
	$('.baustein-select li').click(function() 
	{
		var url = $(this).attr('data-link');
		window.location = url;
		return false;
	});

}

function setScrollToBaustein()
{
	_scrollToBaustein = 1;
}
function scrollToSelectedBaustein()
{
	if (_scrollToBaustein) 
	{
		if($('.baustein').length > 0) 
		{
			var st = $('.baustein').offset();
			var ty = Math.round( st.top );
			$("html, body").delay(700).animate({ scrollTop: ty }, "slow", "easeOutExpo");
		}
	}
}





function checkForms()
{
	var error = $.urlParam('error');
	var task  = $.urlParam('task');
	
	if (error == 'plz' || error == 'ast' || error == 'plz_ast') triggerSidrOpenLogin();
	if (task == 'anmeldung_ok') triggerSidrOpenLogin();
	
	if ($('body').hasClass('openform')) triggerSidrOpenLogin();
}


function bindLoginForm()
{
	$(".login-box input").keyup(function (e) 
	{
		var code = e.keyCode || e.which;
		if (code != 8) {
 
		var name = $(this).attr("name");
		var id = parseInt(name.replace("ast_", "")) + 1;
		$(".login-box input.ast"+id).focus();
		
		}
	});


}

function bindMyProfit()
{
	$('.myprofit-btn').click(function() 
	{
		$('.myprofit').toggle();
		return false;
	});
	$('.myprofit .close').click(function() 
	{
		$('.myprofit').toggle();
		return false;
	});
}

function bindDownload(){

	
	$('.hotnews a.download-not-active').click(function() 
	{
		$(".download-hinweis").hide();
		$(this).parent().parent().parent().parent().find(".download-hinweis").show();
		return false;
	});
	$('.hotnews .download-hinweis a.close-hinweis').click(function() 
	{
		$(this).parent().parent().hide();
		return false;
	});
	
	$('.c3n a.download-not-active').click(function() 
	{
		$(".download-hinweis").hide();
		$(this).parent().parent().find(".download-hinweis").show();
		return false;
	});
	$('.download-hinweis a.close-hinweis').click(function() 
	{
		$(this).parent().parent().hide();
		return false;
	});
	
	$('.tabellen-select li.archiv-jahr .c-1').click(function() 
	{
		var id = $(this).parent().attr('id');
		$('.'+id).slideToggle();
		return false;
	});
}

function bindCookieHinweis(){
	$('.close-cookie').click(function() 
	{
		$(this).parent().hide();
		return false;
	});
}

function showCookieMessage(){
	$('#cookie-message').delay(800).slideDown('slow');
}


function bindAcc(){
	$('.acc a.acc-opener').click(function() 
	{
		$acc = $(this).parent().parent();
		$acc.siblings('.acc').removeClass("acc-open");
		$acc.siblings('.acc').find('.acc-hidden-content').slideUp();
	
		$(this).parent().parent().toggleClass("acc-open");
		$(this).parent().parent().find('.acc-hidden-content').slideToggle();
		
		return false;
	});
}


function scrollToAnchor(anker){
	var st = $("#"+anker).offset();
	var ty = Math.round( st.top )-100;
	$("html, body").animate({ scrollTop: ty }, "slow", "easeOutExpo");
}





$(document).ready(function()
{

	bindSidrNav();
	bindCloseSidr();
	tabNav();
	bindBausteinAddToCart();
	bindSuche();
	trackYScroll();
	bindBildboxDown();
	bindBausteinAuswahl();
	bindLoginForm();
	checkForms();
	scrollToSelectedBaustein();
	bindMyProfit();
	bindDownload();
	bindCookieHinweis();
	bindAcc();
	
	//setScrollTop(300);
	
	//if (nextScrollTop != undefined && nextScrollTop > 0) setScrollTop(nextScrollTop);
	
});

