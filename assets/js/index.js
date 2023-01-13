let productosCarro = [];
  
  if (localStorage.getItem("productos")) {
    productosCarro = JSON.parse(localStorage.getItem("productos"));
    console.log(productosCarro);
    actualizarCarro(productosCarro);
  }
  
  cargarProductos(productos);
  
  //FUNCION ENCARGADA DE CARGAR PRODUCTOS
 
  function cargarProductos(listadoProductos) {
    console.log(listadoProductos)
    let acumulador = "";
    listadoProductos.forEach((producto) => {
      
      let template = `
                      <div class="card m-auto" style="width: 18rem;" class="col-ms-12 col-lg-4 col-md-6">
                      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                      <div class="card-body">
                        <h5 class="card-title">"${producto.nombre}"</h5>
                        <p class="card-text">"${producto.descripcion}"</p>
                        <p class="card-text">Precio: "${producto.precio}"</p>
                        <a class="btn btn-primary" data-sku=${producto.sku} onclick="addToCart('${producto.sku}')">Comprar</a>
                      </div>
                    </div>
                          `;
      acumulador += template;
    })
  
    document.querySelector("#productos .row").innerHTML = acumulador;
  }
  
  function addToCart(sku) {
    let objProducto = {
      sku,
      cantidad: 1,
    }};
  
     let productoEncontrado = productosCarro.find(
       (producto) => producto.sku == sku
     );
     if (productoEncontrado) {
       productoEncontrado.cantidad = productoEncontrado.cantidad + 1;
     } else {
      productosCarro.push(objProducto);
    }
  
     actualizarCarro(productosCarro);
    
     Swal.fire({
       position: 'center',
       icon: 'success',
       title: 'Producto agregado correctamente.',
       showConfirmButton: false,
     timer: 1500
     })

   
  
   function actualizarCarro(listadoProductos) {
     localStorage.setItem("productos", JSON.stringify(listadoProductos));
  
     const valorInicial = 0;
     const sumaProductos = listadoProductos.reduce(
       (accumulator, producto) => accumulator + producto.cantidad,
       valorInicial
     );
  
    document.querySelector("#cantidad-productos").innerText = sumaProductos;
   }
