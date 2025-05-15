const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");

    toggle.addEventListener("click", () =>{
        sidebar.classList.toggle("close");

    });

    modeSwitch.addEventListener("click", () =>{
        body.classList.toggle("dark");
        
        if (body.classList.contains("dark")){
            modeText.innerText = "Modo Claro"
        }
        else{
            modeText.innerText = "Modo Oscuro"
        }
    });

    
    // Seleccion de todos los enlaces del menú y las secciones
const navLinks = document.querySelectorAll('.menu-links a');
const sections = document.querySelectorAll('section');

function hideAllSections() {
    sections.forEach(section => {
        section.style.display = 'none';
    });
}

function showSection(id) {
    const targetSection = document.getElementById(id);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

// Oculta todas las secciones excepto la de inicio al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    hideAllSections();
    showSection('inicio'); 
});

// Agrega un event listener a cada enlace
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
        const sectionId = link.getAttribute('data-section');
        hideAllSections();
        showSection(sectionId);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const carouselImages = document.querySelectorAll('#inicio .carousel img');
  let currentIndex = 0;
  
  // Aseguramos que se muestre la primera imagen
  if (carouselImages.length > 0) {
    carouselImages[currentIndex].classList.add('active');
  }

  // Función que cambia la imagen activa
  setInterval(() => {
    if (carouselImages.length > 0) {
      // Quita la clase 'active' de la imagen actual
      carouselImages[currentIndex].classList.remove('active');
      // Calcula el siguiente índice
      currentIndex = (currentIndex + 1) % carouselImages.length;
      // Agrega la clase 'active' a la siguiente imagen
      carouselImages[currentIndex].classList.add('active');
    }
  }, 5000);
});

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    const carouselContainer = document.querySelector(".carousel-container");
    
    // Cantidad de imágenes originales
    const totalImages = 5;
    // Contamos las imágenes clonadas (en este caso 2)
    const clonesCount = 2;
    // Número total de items en el carrusel (originales + clones)
    const totalItems = totalImages + clonesCount;  // 7 en este ejemplo
  
    let currentIndex = 0; // Empezamos en la posición 0
  
    // Obtiene el ancho de una imagen (1/3 del ancho del contenedor visible)
    function getImageWidth() {
      return carouselContainer.offsetWidth / 3;
    }
  
    function moveSlide() {
      currentIndex++;
      carousel.style.transition = "transform 1s ease-in-out";
      carousel.style.transform = `translateX(-${currentIndex * getImageWidth()}px)`;
    }
  
    // Cuando termina la transición, si llegamos al final (después de slide 4) reseteamos al inicio
    carousel.addEventListener("transitionend", () => {
      // Para que se vea el ciclo completo:
      // Slide 0: visible [0,1,2]
      // Slide 1: visible [1,2,3]
      // Slide 2: visible [2,3,4]
      // Slide 3: visible [3,4,5]  -> 5 es clone(img1)
      // Slide 4: visible [4,5,6]  -> 5 = clone(img1), 6 = clone(img2)
      // Cuando currentIndex llega a 5 no podemos mostrar 3 elementos, por eso reiniciamos cuando currentIndex es igual al número de imágenes originales (5).
      if (currentIndex >= totalImages) { // Es decir, cuando currentIndex === 5
        carousel.style.transition = "none";
        currentIndex = 0;
        carousel.style.transform = `translateX(0px)`;
        // Forzamos un reflow y volvemos a poner la transición para la siguiente animación
        setTimeout(() => {
          carousel.style.transition = "transform 1s ease-in-out";
        }, 20);
      }
    });
  
    // Ejecuta el cambio cada 5 segundos
    setInterval(moveSlide, 5000);
  });

  document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');
  const modal = document.getElementById('menu-modal');
  const modalImg = document.querySelector('.menu-modal-img');
  const modalTitle = document.querySelector('.menu-modal-title');
  const modalDescription = document.querySelector('.menu-modal-description');
  const modalPrice = document.querySelector('.menu-modal-price');
  const modalClose = document.querySelector('.menu-modal-close');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      // Extraer la información almacenada en los atributos data-*
      const title = item.getAttribute('data-title') || '';
      const description = item.getAttribute('data-description') || '';
      const price = item.getAttribute('data-price') || '';
      const image = item.getAttribute('data-image') || '';

      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modalPrice.textContent = price;
      modalImg.src = image;

      modal.style.display = 'flex';
    });
  });

  // Cerrar modal al hacer clic en la "X"
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Habilitar/deshabilitar el campo "Número de Niños"
  const checkboxNinos = document.getElementById('asistiranNinos');
  const inputNinos = document.getElementById('numeroNinos');
  checkboxNinos.addEventListener('change', () => {
    inputNinos.disabled = !checkboxNinos.checked;
    if (!checkboxNinos.checked) {
      inputNinos.value = '';
    }
  });

  // Botón de Reservación
  const btnReservacion = document.getElementById('btnReservacion');
  btnReservacion.addEventListener('click', () => {
    // Obtener valores para el cálculo de factura
    const numPersonas = Number(document.getElementById('numeroPersonas').value) || 0;
    const numMesas = Number(document.getElementById('numeroMesas').value) || 0;
    
    // Por defecto: costo por persona = 10 USD, por mesa = 30 USD.
    const costoPersonas = numPersonas * 10;
    const costoMesas = numMesas * 30;

    // Determinar costo de ambiente (se asume que se selecciona solo uno)
    let costoAmbiente = 0;
    const ambienteSeleccionado = document.querySelector("input[name='ambiente']:checked");
    if (ambienteSeleccionado) {
      if (ambienteSeleccionado.value === 'Balcon') {
        costoAmbiente = 20;
      } else if (ambienteSeleccionado.value === 'Bruf') {
        costoAmbiente = 40;
      } 
      // Para Interior, se suma 0.
    }
    
    const total = costoPersonas + costoMesas + costoAmbiente;
    
    // Actualiza la factura
    document.getElementById('costoPersonas').textContent = "$" + costoPersonas.toFixed(2);
    document.getElementById('costoMesas').textContent = "$" + costoMesas.toFixed(2);
    document.getElementById('costoAmbiente').textContent = "$" + costoAmbiente.toFixed(2);
    document.getElementById('totalCosto').textContent = "$" + total.toFixed(2);
    
    // Mostrar ventana emergente (puedes reemplazarla con un modal si lo prefieres)
    alert("¡Reservación realizada! En aproximadamente 5 minutos recibirá un correo con la confirmación.");
  });
});
