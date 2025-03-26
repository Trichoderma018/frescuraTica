import { useState, useEffect, useRef } from "react";
import llamados from "../services/llamados"
import "../styles/InventoryComponent.css"
import AWS from 'aws-sdk';

function InventoryComponent() {
    const [inventario, setInventario] = useState([]);
    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagenPreview, setImagenPreview] = useState(""); // Para mostrar vista previa
    const [editandoId, setEditandoId] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [uploading, setUploading] = useState(false); // Estado para controlar la carga
    const fileInputRef = useRef(null); // Referencia al input de tipo file
    const [prueba,setPrueba] = useState(null)
    
    // const S3_BUCKET = 'inventoryimages99';
    // const REGION = 'us-east-2';
    // const s3 = new AWS.S3({
    //     accessKeyId: 'AKIA55HIDFXCEWOLPREJ',
    //     secretAccessKey: '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',
    //     region: REGION,
    // });
    // const uploadImageToS3 = async (file) => {
    //     const params = {
    //       Bucket: S3_BUCKET,
    //       Key: file.name,
    //       Body: file,
    //       ContentType: file.type,
    //       // ACL: 'public-read',
    //     };
    //     return s3.upload(params).promise();
    // };

    // Carga inventario con useEffect automáticamente
    useEffect(() => {
        cargarInventario();
    }, []);

    function cargarInventario(){
        llamados.GetData('inventario')
        .then(data => setInventario(data))
        .catch(error => console.error('Error al obtener el inventario:', error));
    };
    
    function buscarProducto() {
        const codigoBuscado = busqueda.trim();

        if (!codigoBuscado) {
            cargarInventario();
            return;
        }

        llamados.GetData("inventario")
            .then(data => {
                const productoEncontrado = data.find(producto => 
                    producto.codigo === codigoBuscado
                );

                if (productoEncontrado) {
                    setInventario([productoEncontrado]);
                } else {
                    alert("Producto no encontrado.");
                    cargarInventario();
                }
            })
            .catch(error => {
                console.error("Error al buscar producto:", error);
                alert("Error al buscar el producto.");
                cargarInventario();
            }
        );
    }

    // Si la búsqueda se borra, recargar el inventario automáticamente
    useEffect(() => {
        if (!busqueda.trim()) {
            cargarInventario();
        }
    }, [busqueda]);

    let imagenUrl='';
    // Función para manejar el cambio de archivo de imagen
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            try {
              const result = await uploadImageToS3(file);
              imagenUrl = result.Location;
              console.log(imagenUrl);
              setPrueba(imagenUrl)
            } catch (error) {
              console.error('Error al subir la imagen a S3:', error);
              throw new Error('No se pudo subir la imagen a S3');
            }
          }
        
    };

    function agregarProducto() {
        if (!codigo.trim() || !nombre.trim() || !cantidad || !precio.trim()) {
            alert("Todos los campos son obligatorios excepto la imagen.");
            return;
        }

        // Si no hay imagen, avisar pero permitir continuar
        if (!prueba) {
            const confirmar = window.confirm("No has subido una imagen. ¿Deseas continuar sin imagen?");
            if (!confirmar) return;
        }

        const nuevoProducto = {
            codigo: codigo.trim(),
            nombre: nombre.trim(),
            cantidad: parseInt(cantidad, 10),
            precio: parseFloat(precio),
            url: prueba // Ahora guardamos la URL de la imagen subida
        };

        llamados.PostData(nuevoProducto, "inventario")
            .then(() => {
                cargarInventario();
                limpiarCampos();
            })
            .catch(error => console.error("Error al agregar producto:", error)
        );
    }

    function limpiarCampos () {
        setCodigo("");
        setNombre("");
        setCantidad("");
        setPrecio("");
        setImagenPreview("");
        setEditandoId(null);
        
        // Limpiar el input de archivo
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    function eliminarProducto(productoId) {
        // Buscar el producto para obtener su URL de imagen
        const producto = inventario.find(p => p.id === productoId);
        
        llamados.DeleteData('inventario', productoId)
            .then(() => {
                // Si el producto tenía una imagen y la URL comienza con /assets/img/
                // podríamos eliminarla del servidor aquí
                if (producto && producto.url && producto.url.startsWith('/assets/img/')) {
                    // Extraer el nombre del archivo de la URL
                    const filename = producto.url.split('/').pop();
                    
                    // Llamar a la API para eliminar la imagen
                    fetch(`http://localhost:3000/inventario/${filename}`, {
                        method: 'DELETE'
                    }).catch(error => console.error("Error al eliminar la imagen:", error));
                }
                
                cargarInventario();
            })
            .catch(error => console.error("Error al eliminar producto:", error));
    }

    function iniciarEdicion(producto) {
        setEditandoId(producto.id);
        setCodigo(producto.codigo);
        setNombre(producto.nombre);
        setCantidad(producto.cantidad.toString());
        setPrecio(producto.precio.toString());
        setImagenUrl(producto.url);
        
        // Si hay una URL de imagen, mostrarla como vista previa
        if (producto.url) {
            setImagenPreview(producto.url.startsWith('http') ? 
                producto.url : `http://localhost:3000${producto.url}`);
        } else {
            setImagenPreview("");
        }
    }

    function actualizarProducto() {
        if (!codigo.trim() || !nombre.trim() || !cantidad.trim() || !precio.trim()) {
            alert("Todos los campos son obligatorios excepto la imagen.");
            return;
        }
    
        if (!editandoId) {
            alert("No hay un producto seleccionado para actualizar.");
            return;
        }
    
        const productoActualizado = {
            id: editandoId,
            codigo: codigo.trim(),
            nombre: nombre.trim(),
            cantidad: parseInt(cantidad, 10),
            precio: parseFloat(precio),
            url: imagenUrl // Usamos la URL de la imagen subida
        };
    
        llamados.UpdateData(productoActualizado, "inventario", editandoId)
            .then(() => {
                cargarInventario();
                limpiarCampos();
                setEditandoId(null);
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
                        <th>Imagen</th>
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
                                    {producto.url ? (
                                        <img 
                                            src={producto.url.startsWith('http') ? 
                                                producto.url : `http://localhost:3001${producto.url}`} 
                                            alt={producto.nombre}
                                            className="product-thumbnail"
                                            width="50"
                                            height="50"
                                        />
                                    ) : (
                                        <span className="no-image">Sin imagen</span>
                                    )}
                                </td>
                                <td>
                                    <button className="btn-edit" onClick={() => iniciarEdicion(producto)}>Editar</button>
                                    <button className="btn-delete" onClick={() => eliminarProducto(producto.id)}>Eliminar</button> 
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="empty-message">No hay productos disponibles en el inventario.</td>
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
                
                {/* Sección de carga de imagen */}
                <div className="image-upload-section">
                    <label htmlFor="product-image" className="file-input-label">
                        Seleccionar imagen del producto
                    </label>
                    <input
                        type="file"
                        id="product-image"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        className="file-input"
                    />
                    
                    {/* Vista previa de la imagen */}
                    {imagenPreview && (
                        <div className="image-preview">
                            <img 
                                src={imagenPreview} 
                                alt="Vista previa" 
                                className="preview-img" 
                            />
                        </div>
                    )}
                    
                    {/* Mostrar estado de carga */}
                    {uploading && <p className="uploading-message">Subiendo imagen...</p>}
                </div>

                {editandoId ? (
                    <button 
                        onClick={actualizarProducto} 
                        disabled={uploading}
                        className={uploading ? "button-disabled" : ""}
                    >
                        Actualizar Producto
                    </button>
                ) : (
                    <button 
                        onClick={agregarProducto} 
                        disabled={uploading}
                        className={uploading ? "button-disabled" : ""}
                    >
                        Agregar Producto
                    </button>
                )}
            </div>
        </div>
    );
}

export default InventoryComponent;