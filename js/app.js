const carrito = document.querySelector("#carrito");
const template = document.querySelector("#template");
const footer = document.querySelector("#footer");
const templateFooter = document.querySelector("#templateFooter");
const fragment = document.createDocumentFragment();
let carritoObjeto = [];

// Delegación de eventos:
document.addEventListener("click", (e) => {
    // console.log(e);
    // console.log(e.target.dataset.fruta);
    // console.log(e.target.matches(".card button"));
    if (e.target.matches(".card button")) {
        agregarCarrito(e);
    }

    // console.log(e.target.matches(".list-group-item .btn-success"));
    if (e.target.matches("#carrito .list-group-item .btn-success")) {
        btnAumentar(e);
    }

    // console.log(e.target.matches(".list-group-item .btn-danger"));
    if (e.target.matches("#carrito .list-group-item .btn-danger")) {
        btnDisminuir(e);
    }
});

const agregarCarrito = (e) => {
    // console.log(e.target.dataset);
    const producto = {
        titulo: e.target.dataset.comida,
        id: e.target.dataset.comida,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio),
    };

    // buscamos el indice
    const index = carritoObjeto.findIndex((item) => item.id === producto.id);

    // si no existe empujamos el nuevo elemento
    if (index === -1) {
        carritoObjeto.push(producto);
    } else {
        // en caso contrario aumentamos su cantidad
        carritoObjeto[index].cantidad++;
    }

    // console.log(carritoArray);
    pintarCarrito();
};

const pintarCarrito = () => {
    carrito.textContent = "";

    // recorremos el carrito y pintamos elementos:
    carritoObjeto.forEach((item) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".text-white .lead").textContent = item.titulo;
        clone.querySelector(".rounded-pill").textContent = item.cantidad;
        clone.querySelector("div .lead span").textContent =
            item.precio * item.cantidad;
        clone.querySelector(".btn-success").dataset.id = item.id;
        clone.querySelector(".btn-danger").dataset.id = item.id;
        fragment.appendChild(clone);
    });
    carrito.appendChild(fragment);
    
    pintarFooter();
};


const pintarFooter = () => {
    footer.textContent = "";

    const total = carritoObjeto.reduce(
        (acc, current) => acc + current.precio * current.cantidad,
        0
    );

    // console.log(total);

    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector("p span").textContent = total;

    // fragment.appendChild(clone);
    footer.appendChild(clone);
};


const btnAumentar = (e) => {

    //console.log("Me diste click 😁", e.target.dataset.id)

    carritoObjeto = carritoObjeto.map(item => {
if (item.id === e.target.dataset.id) {
    item.cantidad++;
}
return item;
    })

    pintarCarrito();

}

const btnDisminuir = (e) => {
//console.log("Me diste click 😁", e.target.dataset.id)
carritoObjeto = carritoObjeto.filter(item => {
    if (item.id === e.target.dataset.id) {    
        if (item.cantidad > 0) {
        item.cantidad--;        
            if (item.cantidad === 0) return 
                return item 
            }
            } else {return item }

            })
 pintarCarrito();
};




