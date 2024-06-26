let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1]) // here the length of items = 6
})



document.addEventListener('DOMContentLoaded', function() {
    const posts = [
        { id: 1, title: 'Cómo planificar una boda inolvidable', views: 256 },
        { id: 2, title: 'Consejos para organizar eventos corporativos exitosos', views: 187 },
        { id: 3, title: 'Ideas creativas para fiestas infantiles', views: 132 },
        { id: 4, title: 'Guía completa para decorar eventos especiales', views: 98 },
        { id: 5, title: 'Técnicas avanzadas de fotografía de eventos', views: 76 }
    ];

    const postList = document.getElementById('post-list');

    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.textContent = `${post.title} - ${post.views} vistas`;
        postList.appendChild(listItem);

        // Simular redireccionamiento al hacer clic en un post (aquí puedes añadir tu lógica real)
        listItem.addEventListener('click', () => {
            console.log(`Redirigiendo al post ${post.id}`);
            // Aquí puedes implementar la lógica para redirigir a la página del post
        });
    });
});
