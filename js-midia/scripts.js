$(function(){
	/*:::::::::::::::::::  Menu MOBILE (inicio)  :::::::::::::::::*/
	if($(".menu-principal").length){
		$("body").prepend("<div class=\"menu-mobile\"><span></span>"+$(".logo-mobile").eq(0).parent().html()+$(".menu-principal ul").eq(0).parent().html()+"</div><div class=\"clear\"></div>").find(".menu-mobile ul").hide();
		$(".menu-mobile ul").data("status","fechado");
		var itensMenu;
		var corBack = new Array();
		corBack=$(".menu-mobile").css("background-color").replace("rgb(","").replace(")","").split(",");
		var espacoAlinhamentoSubMenu=parseInt($(".menu-mobile ul li").css("text-indent").replace("px",""));
		/*Cor submenu mobile*/
		var menuCorSub=$(".menu-mobile>ul");
		for(i=1; i<=$(".menu-mobile li>ul").length; i++){
			filhosMobile="";
			for(fm=0; fm<i; fm++){
				filhosMobile+=">li>ul";
			}
			menuCorSub.find(filhosMobile).css({"background-color":"rgb("+(parseInt(corBack[0])+((i+1)*5))+","+(parseInt(corBack[1])+((i+1)*5))+","+(parseInt(corBack[2])+((i+1)*5))+")"}).parent("li").prepend("<span>+</span>").find("ul li").css({"text-indent":(espacoAlinhamentoSubMenu*(i+2))});
			if(!menuCorSub.find(filhosMobile).length){
				break;
			}
		}
		function abrirEFecharMenu(seletor,qtdItens,origem){
			itensMenu=qtdItens;
			if(origem=="menuTotal")
			{
				if(seletor.data("status")=="fechado")
				{
					seletor.stop(true,true).slideDown((itensMenu*100)).data("status","aberto").find('ul').slideUp().data("status","fechado").parent("li").find("span").eq(0).html("+");
					tamanho_div = $(window).outerHeight();
					tamanho_ul = tamanho_div - 60;
					$('.menu-mobile > ul').css({
						'max-height': tamanho_ul+'px'
					});
				}
				else if(seletor.data("status")=="aberto")
				{
					seletor.stop(true,true).slideUp((itensMenu*100)).data("status","fechado").find('ul').slideUp().data("status","fechado").parent("li").find("span").eq(0).html("+");
				}
			}
			else if(origem=="subMenu")
			{
				if(seletor.data("status")=="fechado")
				{
					seletor.stop(true,true).slideDown((itensMenu*100)).data("status","aberto").parent("li").find("span").eq(0).html("-");
					// $('.menu-mobile').addClass('menu-rolagem');
				}
				else if(seletor.data("status")=="aberto")
				{
					seletor.stop(true,true).slideUp((itensMenu*100)).data("status","fechado").parent("li").find("span").eq(0).html("+");
					// $('.menu-mobile').removeClass('menu-rolagem');
				}
			}
		}
		$(".menu-mobile>span").click(function(){
			abrirEFecharMenu($(".menu-mobile>ul"),$(".menu-mobile>ul>li").length,"menuTotal");
		});
		$(".menu-mobile li span").click(function(){
			abrirEFecharMenu($(this).parent("li").find("ul").eq(0),$(this).parent("li").find("ul>li").eq(0).length,"subMenu");
		});
	}
	/*:::::::::::::::::::  SUB MENU(>2) DESKTOP  :::::::::::::::::*/
	if($(".menu-principal").length){
		var direcaoSubMenu;
		var larguraTela;
		var atual;
		var atualFilho;
		var cont=0;
		var direcaoArr= new Array();
		$(".menu-principal>ul>li").data("menu","true");
		$(".menu-principal li>ul").parent("li").hover(function(){
			cont++;
			larguraTela=$(window).width();
			atual=$(this);
			atualFilho=$(this).find("ul");
			if(atual.data("menu")!="true"){
				if(direcaoSubMenu=="right"){
					posicaoSubMenu=atual.offset().left+atual.outerWidth(true)+atualFilho.outerWidth(true);
					if(posicaoSubMenu>=larguraTela){
						atualFilho.css({"left":"-100%"});
						direcaoSubMenu="left";
					}else{
						atualFilho.css({"left":"100%"});
					}
				}else if(direcaoSubMenu="left"){
					posicaoSubMenu=atual.offset().left-atualFilho.outerWidth(true);
					if(posicaoSubMenu<=0){
						direcaoSubMenu="right";
						atualFilho.css({"left":"100%"});
					}else{
						atualFilho.css({"left":"-100%"});
					}
				}
			}else{
				direcaoSubMenu=direcao;
			}
			direcaoArr[cont]=direcaoSubMenu;
		},function(){
			direcaoArr.splice(cont,1);
			cont--;
			if(cont==0){
				direcaoSubMenu="right";
			}else{
				direcaoSubMenu=direcaoArr[cont];
			}
		});
	}
	/*:::::::::::::::::::  REGIÕES (inicio)  :::::::::::::::::*/
	if($(".regioes-aba-titulo").length && $(".regioes-conteudo").length){
		var botaoRegiao=$(".regioes-aba-titulo span");
		var conteudoRegiao=$(".regioes-conteudo ul");
		var indiceRegiao=0;
		var indiceRegiaoAnterior=0;
		var tempoRegiao=500;
		$(".regioes-conteudo ul:gt(0)").hide();
		botaoRegiao.eq(indiceRegiao).addClass("regioes-aba-titulo-selecionada");
		botaoRegiao.click(function(){
			indiceRegiao=$(this).index();
			if(indiceRegiao!=indiceRegiaoAnterior)
			{
				conteudoRegiao.eq(indiceRegiaoAnterior).stop(true,true).slideUp(tempoRegiao);
				conteudoRegiao.eq(indiceRegiao).stop(true,true).slideDown(tempoRegiao);
				botaoRegiao.eq(indiceRegiaoAnterior).removeClass("regioes-aba-titulo-selecionada");
				botaoRegiao.eq(indiceRegiao).addClass("regioes-aba-titulo-selecionada");
			}
			indiceRegiaoAnterior=indiceRegiao;
		});
	}
	function mapaGoogleMouseBloqueio(){
		$(".mapa-do-google").css("pointer-events", "none");
	}
	mapaGoogleMouseBloqueio();
	$(".mapa-overlay").click(function(){
		$(this).find("iframe").css("pointer-events", "auto");
	});
	$(".mapa-overlay iframe").mouseout(function(){
		mapaGoogleMouseBloqueio();
	});
    // Voltar ao topo
    $(window).scroll(function() {
    	if ($(this).scrollTop() > 200) {
    		$('.voltar-para-o-topo').fadeIn(200);
    	} else {
    		$('.voltar-para-o-topo').fadeOut(200);
    	}
    });
    $('.voltar-para-o-topo').click(function(event) {
    	event.preventDefault();
    	$('html, body').animate({scrollTop: 0}, 300);
    });
    $('.imagens-palavras-chave').magnificPopup({
    	delegate: 'a',
    	gallery: {
    		enabled: true
    	},
    	type: 'image'
    });
    $('.banner').slick({
    	dots: true,
    	arrows: true,
    	infinite: true,
    	speed: 500,
    	autoplay: true,
    	autoplaySpeed: 5000,
    	slidesToShow: 1,
    	slidesToScroll: 1
    });
    if(popup=='sim')
    {
    	$.magnificPopup.open({
    		items: {
    			src: url+'inc-midia/popup-aviso.php'
    		},
    		type: 'ajax'
    	}, 0);
    }
    $('.produtos-relacionados').slick({
    	arrows: true,
    	dots: false,
    	infinite: true,
    	centerMode: true,
    	centerPadding: '10px',
    	speed: 300,
    	autoplay: false,
    	autoplaySpeed: 5000,
    	slidesToShow: 4,
    	slidesToScroll: 1,
    	responsive: [
    	{
    		breakpoint: 981,
    		settings: {
    			slidesToShow: 4,
    		}
    	},
    	{
    		breakpoint: 781,
    		settings: {
    			slidesToShow: 3,
    		}
    	},
    	{
    		breakpoint: 601,
    		settings: {
    			slidesToShow: 2,
    		}
    	},
    	{
    		breakpoint: 401,
    		settings: {
    			slidesToShow: 1,
    			arrows: false,
    		}
    	}
    	]
    });
    $('.mais').mouseenter(function(){
    	if($(".popup-redes-sociais-animado").length==0 && $(".popup-redes-sociais-carregado").length==0){
    		$(this).parent("div").append("<div class=\"fundo-popup-redes-sociais\"></div>");
    		$.ajax({
    			type:"POST",
    			url:url+"inc-midia/redes-sociais.php",
    			data:{ajax:true}
    		}).done(function(conteudo){
    			$('.popup-redes-sociais').addClass("popup-redes-sociais-animado").addClass("popup-redes-sociais-carregado").html(conteudo).stop(true,true).fadeIn();
    		}).fail(function(){
    		});
    	}else if($(".popup-redes-sociais-animado").length==0 && $(".popup-redes-sociais-carregado").length>0){
    		$(this).parent("div").append("<div class=\"fundo-popup-redes-sociais\"></div>");
    		$('.popup-redes-sociais').addClass("popup-redes-sociais-animado").stop().fadeIn();
    	}
    });
    $("html").on("mousemove",".fundo-popup-redes-sociais",function(){
    	if($(".popup-redes-sociais-animado").length && $(".fundo-popup-redes-sociais").length){
    		$('.popup-redes-sociais').removeClass("popup-redes-sociais-animado").stop(true,true).fadeOut();
    		$(".fundo-popup-redes-sociais").remove();
    	}
    });
});
 // Topo Fixo
$(document).ready(function(){
	if($("header").length)
	{
		var topo=$("header");
		var janela=$(window);
		function scroll()
		{
			topoAltura=$("header").outerHeight();
			scrollTopAtual=janela.scrollTop();
			tempotopo=3000;
			janelaLargura=janela.width();
			if(scrollTopAtual>topoAltura && janelaLargura>460)
			{
				topo.addClass("topo-scroll");
			}
			else
			{
				topo.removeClass("topo-scroll");
			}
		}
		janela.scroll(function(){
			scroll();
		});
		janela.resize(function(){
			scroll();
		});
		janela.on('load', function(){
			scroll();
		});
	}
});