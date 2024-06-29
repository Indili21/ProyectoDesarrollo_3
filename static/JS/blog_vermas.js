document.addEventListener('DOMContentLoaded', function() {
    const verMasBtn = document.getElementById('verMas');
    const cargarMenosBtn = document.getElementById('cargarMenos');
    const blogsContainer = document.getElementById('blogsContainer');
    const blogsPerPage = 4; // Número de blogs por página
    let currentPage = 1;
    let loadedPages = []; // Array para almacenar las páginas cargadas

    // Array de blogs con información de ejemplo
    const blogs = [
        {
            imgSrc: '/IMG/pexels-amar1.jpg',
            title: 'Nuestro equipo de fotografía',
            content: 'En Esencia, nuestro equipo de fotografía está dedicado a capturar la esencia única de cada evento que diseñamos.',
            date: '10 de junio de 2024'
        },
        {
            imgSrc: '/IMG/pexels-cottonbro2.jpg',
            title: 'Reuniones con el equipo',
            content: 'En Esencia, nuestras reuniones de equipo son el corazón de nuestra colaboración creativa y planificación meticulosa.',
            date: '8 de junio de 2024'
        },
        {
            imgSrc: '/IMG/pexels-3.jpg',
            title: 'Arreglo de mesas',
            content: 'En Esencia, consideramos que el arreglo de mesas es más que una disposición física; es una expresión artística que transforma espacios y crea ambientes memorables para nuestros clientes.',
            date: '6 de junio de 2024'
        },
        {
            imgSrc: '/IMG/pexels-amina-4.jpg',
            title: 'Nuestra florista',
            content: 'Nuestra florista en Esencia es el corazón floral de cada evento que diseñamos. Con una pasión innata por las flores y un ojo meticuloso para el diseño.',
            date: '4 de junio de 2024'
        },
        {
            imgSrc: '/IMG/pexels-bohlemedia-5.jpg',
            title: 'Sobre nuestras bajillas',
            content: 'En Esencia, entendemos que la elección de vajilla, platos de vidrio y copas juega un papel crucial en la presentación y experiencia gastronómica de cualquier evento.',
            date: '2 de junio de 2024'
        },
        {
            imgSrc: '/IMG/pexels-kokorevas-ingla6.jpg',
            title: 'El viaje a Inglaterra para un arreglo',
            content: 'El viaje a Inglaterra para el arreglo fue más que una simple expedición; fue una odisea de descubrimiento y creatividad.',
            date: '1 de junio de 2024'
        },
        {
            imgSrc: '/IMG/pexels-3.jpg',
            title: 'Decoración de exteriores',
            content: 'En Esencia, nos especializamos en crear ambientes únicos al aire libre, donde cada detalle contribuye a la atmósfera del evento.',
            date: '28 de mayo de 2024'
        },
        {
            imgSrc: '/IMG/pexels-amina-4.jpg',
            title: 'La importancia de la iluminación',
            content: 'Descubre cómo la iluminación puede transformar un espacio y realzar la belleza de tu evento con nuestro equipo en Esencia.',
            date: '25 de mayo de 2024'
        },
        {
            imgSrc: '/IMG/pexels-cottonbro2.jpg',
            title: 'Música y ambiente',
            content: 'Explora cómo la selección musical adecuada puede crear la atmósfera perfecta para tu evento con los expertos en Esencia.',
            date: '22 de mayo de 2024'
        },
        // Agregar más objetos de blogs según sea necesario
    ];

    // Función para mostrar los blogs en la página actual
    function showBlogs(page) {
        const start = (page - 1) * blogsPerPage;
        const end = start + blogsPerPage;

        // Limpiar el contenedor de blogs antes de agregar nuevos
        blogsContainer.innerHTML = '';

        // Iterar sobre los blogs para mostrar solo los de la página actual
        blogs.slice(start, end).forEach((blog, index) => {
            const blogHTML = `
                <div class="col-md-6 mb-4 blog-item">
                    <div class="card">
                        <img src="${blog.imgSrc}" class="card-img-top" alt="${blog.title}">
                        <div class="card-body">
                            <h5 class="card-title">${blog.title}</h5>
                            <p class="card-text">${blog.content}</p>
                            <p class="card-text"><small class="text-muted">Publicado el ${blog.date}</small></p>
                            <button type="button" class="btn btn-primary mb-3 leer-mas-btn" data-toggle="modal" data-target="#blogModal" data-blog-index="${start + index}">Leer más</button>
                        </div>
                    </div>
                </div>
            `;
            blogsContainer.innerHTML += blogHTML;
        });

        // Si la página actual no está en el array de páginas cargadas, añadirla
        if (!loadedPages.includes(currentPage)) {
            loadedPages.push(currentPage);
        }

        // Si no quedan más blogs por mostrar, ocultar el botón "Ver más"
        if (end >= blogs.length) {
            verMasBtn.style.display = 'none';
        } else {
            verMasBtn.style.display = 'inline-block';
        }

        // Mostrar el botón "Cargar menos" si hay más de una página cargada
        if (loadedPages.length > 1) {
            cargarMenosBtn.style.display = 'inline-block';
        } else {
            cargarMenosBtn.style.display = 'none';
        }
    }

    // Mostrar los primeros blogs al cargar la página
    showBlogs(currentPage);

    // Evento de clic en el botón "Ver más"
    verMasBtn.addEventListener('click', function(e) {
        e.preventDefault();
        currentPage++; // Avanzar a la siguiente página de blogs
        showBlogs(currentPage); // Mostrar los blogs de la nueva página
    });

    // Evento de clic en el botón "Cargar menos"
    cargarMenosBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loadedPages.pop(); // Eliminar la última página cargada del array
        currentPage = loadedPages[loadedPages.length - 1]; // Retroceder a la página anterior
        showBlogs(currentPage); // Mostrar los blogs de la página anterior
        showBlogs(currentPage); // Mostrar los blogs de la página anterior
    });

    // Evento de clic en el botón "Leer más" de cada blog
    $('#blogModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget); // Botón que activó el modal
        const blogIndex = button.data('blog-index'); // Obtener el índice del blog desde los datos del botón
        const modalTitle = document.getElementById('blogModalLabel');
        const modalBody = document.getElementById('blogModalBody');

        // Actualizar el título y contenido del modal con el blog seleccionado
        modalTitle.textContent = blogs[blogIndex].title;
        modalBody.innerHTML = `
            <img src="${blogs[blogIndex].imgSrc}" class="card-img-top" alt="${blogs[blogIndex].title}">
            <div class="card-body">
                <p class="card-text">${blogs[blogIndex].content}</p>
                <p class="card-text"><small class="text-muted">Publicado el ${blogs[blogIndex].date}</small></p>
            </div>
        `;
    });

    // Función para ocultar los blogs de páginas anteriores
    function hidePreviousBlogs() {
        const start = currentPage * blogsPerPage;
        const end = blogs.length;

        // Ocultar los blogs anteriores en el contenedor
        document.querySelectorAll('.blog-item').forEach((item, index) => {
            if (index >= start && index < end) {
                item.classList.add('hidden');
            }
        });
    }

    // Evento de clic en el botón "Cargar menos"
    cargarMenosBtn.addEventListener('click', function(e) {
        e.preventDefault();
        currentPage--; // Retroceder a la página anterior
        showBlogs(currentPage); // Mostrar los blogs de la página anterior
        hidePreviousBlogs(); // Ocultar los blogs de las páginas anteriores
    });
});
