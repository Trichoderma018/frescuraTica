import { useState, useEffect } from "react";
import llamados from "../services/llamados"
import "../styles/InventoryComponent.css"

function InventoryComponent() {
    const [inventario, setInventario] = useState([]);
    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [precio, setPrecio] = useState("");
    const [url, setUrl] = useState("");
    const [editandoId, setEditandoId] = useState(null);
    const [busqueda, setBusqueda] = useState(""); // Estado para la barra de búsqueda

    //Carga inventario con useEfecct automaticamente
    useEffect(() => {
        cargarInventario();
    }, []);

    function cargarInventario(){
        llamados.GetData('inventario')
        .then(data => setInventario(data))
        .catch(error => console.error('Error al obtener el inventario:', error));
    };
    
    function buscarProducto() {
        const codigoBuscado = busqueda.trim(); // Convertir a minúsculas para evitar problemas de mayúsculas

        if (!codigoBuscado) {
            cargarInventario(); // Si está vacío, recarga el inventario completo
            return;
        }

        llamados.GetData("inventario")
            .then(data => {
                const productoEncontrado = data.find(producto => 
                    producto.codigo === codigoBuscado
                );

                if (productoEncontrado) {
                    setInventario([productoEncontrado]); // Mostrar solo el producto encontrado
                } else {
                    alert("Producto no encontrado.");
                    cargarInventario(); // Si no se encuentra, recarga el inventario completo
                }
            })
            .catch(error => {
                console.error("Error al buscar producto:", error);
                alert("Error al buscar el producto.");
                cargarInventario(); // Asegurar que se recargue el inventario si hay un error
            }
        );
    }
    // Si la búsqueda se borra, recargar el inventario automáticamente
    useEffect(() => {
        if (!busqueda.trim()) {
            cargarInventario();
        }
    }, [busqueda]);

    function agregarProducto() {
        if (!codigo.trim() || !nombre.trim() || !cantidad || !precio.trim()) { //Todos menos la URL
            alert("Todos los campos son obligatorios.");
            return;
        }

        const nuevoProducto = {
            codigo: codigo.trim(),
            nombre: nombre.trim(),
            cantidad: parseInt(cantidad, 10),
            precio: parseFloat(precio),
            url: url
        };

        llamados.PostData(nuevoProducto, "inventario")
            .then(() => {
                cargarInventario(); // Volver a cargar el inventario
                limpiarCampos(""); // Limpiar el campo de entrada
            })
            .catch(error => console.error("Error al agregar producto:", error)
        );
    }
    function limpiarCampos () {
        setCodigo("");
        setNombre("");
        setCantidad("");
        setPrecio("");
        setUrl("");
        setEditandoId(null);
    }
    function eliminarProducto(productoId) {
        llamados.DeleteData('inventario', productoId)
            .then(() => cargarInventario())
            .catch(error => console.error("Error al eliminar producto:", error));
    }
    function iniciarEdicion(producto) {
        setEditandoId(producto.id);
        setCodigo(producto.codigo);
        setNombre(producto.nombre);
        setCantidad(producto.cantidad.toString());
        setPrecio(producto.precio.toString());
        setUrl(producto.url);
    }

    function actualizarProducto() {
        if (!codigo.trim() || !nombre.trim() || !cantidad.trim() || !precio.trim()) {
            alert("Todos los campos son obligatorios.");
            return;
        }
    
        if (!editandoId) {
            alert("No hay un producto seleccionado para actualizar.");
            return;
        }
    
        const productoActualizado = {
            id: editandoId, // Asegurar que se envía el ID
            codigo: codigo.trim(),
            nombre: nombre.trim(),
            cantidad: parseInt(cantidad, 10),
            precio: parseFloat(precio),
            url: url.trim()
        };
    
        llamados.UpdateData(productoActualizado, "inventario", editandoId)
            .then(() => {
                cargarInventario();
                limpiarCampos();
                setEditandoId(null); // Salir del modo edición
            })
            .catch(error => console.error("Error al actualizar producto:", error)
        );
    }

    return (
        <div className="container">
            <h2 className="titulo-container">Inventario de Productos</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar por Código"
                    className="search-bar"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <button className="btn-search" onClick={buscarProducto}>Buscar</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {inventario.length > 0 ? (
                        inventario.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.codigo}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.cantidad}</td>
                                <td>₡{producto.precio}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => iniciarEdicion(producto)}>Editar</button>
                                    <button className="btn-delete" onClick={() => eliminarProducto(producto.id)}>Eliminar</button> 
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="empty-message">No hay productos disponibles en el inventario.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="add-product">
                <h3>{editandoId ? "Actualizar Producto" : "Agregar Nuevo Producto"}</h3>
                <input
                    type="text"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    placeholder="Código del Producto"
                />
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre del Producto"
                />
                <div className="input-group">
                    <input
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        placeholder="Cantidad"
                    />
                    <input
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        placeholder="Precio"
                    />
                </div>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="URL de la imagen"
                />
                {editandoId ? (
                    <button onClick={actualizarProducto}>Actualizar Producto</button>
                ) : (
                    <button onClick={agregarProducto}>Agregar Producto</button>
                )}
            </div>
        </div>
    );
}

export default InventoryComponent;