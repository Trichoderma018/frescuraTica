export async function GetInventario() {
    try {
        const response = await fetch("http://localhost:3000/inventario", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Error al obtener el inventario");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en GetInventario:", error);
        throw error;
    }
}
export async function PostInventario(nuevoProducto) {
    try {
        const response = await fetch("http://localhost:3000/inventario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoProducto),
        });

        if (!response.ok) {
            throw new Error("Error al agregar el producto");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en PostInventario:", error);
        throw error;
    }
}