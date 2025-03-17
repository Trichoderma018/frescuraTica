import { useState } from "react";
import { GetInventario, PostInventario } from "../services/llamados"
import "../styles/InventoryComponent.css"

function InventoryComponent() {
    const [inventario, setInventario] = useState([]);
    const [nombre, setNombre] = useState("");

    const cargarInventario = async () => {
        const data = await GetInventario();
        setInventario(data);
    };

    const agregarProducto = async () => {
        const nuevoProducto = { nombre };
        await PostInventario(nuevoProducto);
        setNombre(""); // Limpiar input después de agregar
        cargarInventario(); // Recargar la lista
    };

    return (
        <div>
            <h2>Inventario</h2>
            <button onClick={cargarInventario}>Cargar Inventario</button>
            <ul>
                {inventario.map((producto) => (
                    <li key={producto.id}>{producto.nombre}</li>
                ))}
            </ul>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del producto"
            />
            <button onClick={agregarProducto}>Agregar Producto</button>
        </div>
    );
}

export default InventoryComponent;