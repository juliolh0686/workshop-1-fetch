/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector('#app');

//---API Internacionalizacion => Intl
//1 - Formato a fechas
//2 - formato de monedas
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN',{
        style: 'currency',
        currency: "USD",
    }).format(price);

    return newPrice;
}

//WEB API
//conectarnos al servidor
window
    .fetch(baseUrl+'/api/avo')
//procesar la respuesta y convertirlo en JSON
    .then((respuesta) =>respuesta.json())
//JSON -> data -> renderizar informeacion en el Browser
    .then((responseJson) => {

        const todosLosItem = [];

        responseJson.data.forEach((item) => {

            //crear imagen
            const imagen = document.createElement('img');
            imagen.src = baseUrl+item.image;
            imagen.className = "w-48";

            //crear titulo
            const title = document.createElement('h2');
            title.textContent = item.name;
            title.className = "text-lg text-lime-500 text-center font-bold";

            //crear precio
            const price = document.createElement('div');
            price.textContent=formatPrice(item.price);
            price.className = "bg-sky-500/50 rounded-md text-center w-24 mx-auto mt-4 text-white font-bold"

            const container = document.createElement('div');
            container.append(imagen,title,price); 
            container.className = "w-64 border border-emerald-100 rounded-md px-4 py-8 cursor-pointer hover:border-lime-500"

            todosLosItem.push(container);

        });

        appNode.append(...todosLosItem);
        appNode.className="flex flex-wrap justify-center gap-9 my-8";
    })

