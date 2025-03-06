"use strict"
// =============Меню Бургер======================
const iconMenu = document.querySelector('.icon__menu');
const menuBody = document.querySelector('.menu__body');
const menulink = document.querySelector('.menu__link');
const logo = document.querySelector('.logo');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
        menulink.classList.toggle('_active');
        logo.classList.toggle('_active');
	});
}

 
// ====================================================================================
// Форма
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);
		formData.append('image', formImage.files[0]);

		if (error === 0) {
			form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		} else {
			alert('Заполните обязательные поля');
		}

	}


	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	//Функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	//Получаем инпут file в переменную
	const formImage = document.getElementById('formImage');
	//Получаем див для превью в переменную
	const formPreview = document.getElementById('formPreview');

	//Слушаем изменения в инпуте file
	formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0]);
	});
});
// =================================================АНИМАЦІЯ ПРИ СКРОЛІ===========================================
 
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 3;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_activate');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_activate');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}
// ===================================================================
// window.onload = function () {
//     const paralax = document.querySelector('.main')
//     if (paralax) {
//         const content = document.querySelector('.main__content');
//         const item1 = document.querySelector('.__item1');
//         const item2 = document.querySelector('.__item2');
//         const item3 = document.querySelector('.__item3');
//         const item4 = document.querySelector('.__item4');
//         const item5 = document.querySelector('.__item5');
//         const item6 = document.querySelector('.__item6');

//         const foritem1 = 40;
//         const foritem3 = 40;
//         const foritem5 = 40;

//         const speed = 0.05;

//         const foritem2 = 20;
//         const foritem4 = 20;
//         const foritem6 = 20;
    
//         let positionX = 0, positionY = 0;
//         let coordXprocent = 0, coordYprocent = 0;

//         function setMouseParallaxStyle() {
//             const distX = coordXprocent - positionX
//             const distY = coordYprocent - positionY

//             positionX = positionX + (distX * speed);
//             positionY = positionY + (distY * speed);

//             item1.style.cssText = `transform: translate(${positionX / foritem1}%,${positionY / foritem1}%);`;
//             item3.style.cssText = `transform: translate(${positionX / foritem3}%,${positionY / foritem3}%);`;
//             item5.style.cssText = `transform: translate(${positionX / foritem5}%,${positionY / foritem5}%);`;


//             item2.style.cssText = `transform: translate(${positionX / foritem2}%,${positionY / foritem2}%);`;
//             item4.style.cssText = `transform: translate(${positionX / foritem4}%,${positionY / foritem4}%);`;
//             item6.style.cssText = `transform: translate(${positionX / foritem6}%,${positionY / foritem6}%);`;

//             requestAnimationFrame(setMouseParallaxStyle);
//         }
//         requestAnimationFrame();

//         paralax.addEventListener("mousemove", function (e) {
            
//             const parallaxWidth = paralax.offsetWidth;
//             const parallaxHeight = paralax.offsetHeight;


//             const coordX = e.pageX - parallaxWidth / 2;
//             const coordY = e.pageY - parallaxHeight / 2;

//             coordXprocent = coordX / parallaxWidth * 100;
//             coordYprocent = coordY / parallaxHeight * 100;
//         });
//     }
// }

function paralax(event) {
    this.querySelectorAll('.icons-main-block').forEach(iconsmainblock => {
       let speed = iconsmainblock.getAttribute('data-speed');
        iconsmainblock.style.transform = `translateX(${event.clientX*speed/2000}px) translateY(${event.clientY*speed/2000}px)`
    });
 
}

document.addEventListener('mousemove', paralax);
// =======================================================================



// const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
// if (menuLinks.length > 0) {
//     menuLinks.forEach(menuLink => {
//         menuLink.addEventListener("click", onMenuLinkClick );
//     });

//     function onMenuLinkClick(e) {
//         const menuLink = e.target;
//         if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
//             const gotoBlock = document.querySelector(menuLink.dataset.goto);
//             const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYoffset - document.querySelector('header').offsetHeight;

//             window.scrollTo({
//                 top: gotoBlockValue,
//                 behavior: "smooth"
                 
//             });
//             e.preventDefault();
//         }
//     }
// }






// // ===========================================================
// const anchors = document.querySelectorAll('a[href*="#"]')

// for (let anchor of anchors) {
//   anchor.addEventListener('click', function (e) {
//     e.preventDefault()
    
//     //==============
// 	if (iconMenu.classList.contains('_active')) {
//         document.body.classList.remove('_lock');
// 		iconMenu.classList.remove('_active');
// 		menuBody.classList.remove('_active');
//         menulink.classList.remove('_active');
//         logo.classList.remove('_active');
//     }
//     //===========
//     const blockID = anchor.getAttribute('href').substr(1)
 
//     document.getElementById(blockID).scrollIntoView({
        
//       behavior: 'smooth',
//       block: 'start'
//     })
//   })
// }
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}