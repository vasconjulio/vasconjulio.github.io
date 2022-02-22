const btnMobile = document.getElementById('btn-mobile');

function toggleMenu() {
	const nav = document.getElementById('nav');
	nav.classList.toggle('active');
	const active = nav.classList.contains('active');
	}


btnMobile.addEventListener('click', toggleMenu);



// Topo Scroll

window.addEventListener("scroll", function(){
	const header = document.querySelector("#header");
	header.classList.toggle("topo-scroll", window.scrollY > 148);
})

