const Productos = require('../../models/Productos')
const TipoProductos = require('../../models/TipoProductos');
const cloudinary = require('../../utils/cloudinary');

/**
 * Obtener todos los productos.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa que resuelve con la respuesta al cliente.
 */

const allProduct = async (req, res) => {
    try {
        const product = await Productos.find().populate('tipo');

        if (!product) {
            res.status(400).send("No existen productos")
            return
        }
        res.status(200).send(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

/**
 * Obtener un producto por nombre.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa que resuelve con la respuesta al cliente.
 */
const productName = async (req, res) => {
    try {
        const { name } = req.params
        const product = await Productos.findOne({ name: { $regex: new RegExp(name, 'i') } });

        if (!product) {
            res.status(400).send("No existe producto con ese nombre")
            return
        }
        res.status(200).send(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

/**
 * Crear un nuevo producto.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa que resuelve con la respuesta al cliente.
 */



// const createProduct = async (req, res) => {
//     try {
//         const { name, price, brand,tipoId, stock, description } = req.body;

//         // Verifica si el producto ya existe
//         const existingProduct = await Productos.findOne({ name });
//         if (existingProduct) {
//             res.status(400).send("El producto ya existe");
//             return;
//         }

//         // Verifica si el tipo de producto existe
//         const tipo = await TipoProductos.findById(tipoId);
//         if (!tipo) {
//             res.status(400).send("El tipo de producto no existe");
//             return;
//         }

//         // Crea el producto asociándolo al tipo correspondiente
//         const product = await Productos({
//             name,
//             price,
//             brand,
//             description,
//             stock,
//             image: req.body.image || '',
//             tipo: tipoId,
//         });

//         await product.save();
//         res.status(200).send(product);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// };
// const createProduct = async (req, res) => {
//     try {
//         const { name, price, brand, tipoId,sise,color, stock, description } = req.body;

//         // Verifica si el producto ya existe
//         const existingProduct = await Productos.findOne({ name });
//         if (existingProduct) {
//             return res.status(400).send("El producto ya existe");
//         }

//         // Verifica si el tipo de producto existe
//         const tipo = await TipoProductos.findById(tipoId);
//         if (!tipo) {
//             return res.status(400).send("El tipo de producto no existe");
//         }

//         // Crea un arreglo para almacenar las imágenes
//         const images = req.files.map(file => file.buffer); // Accede a los buffers de las imágenes

//         // Crea el producto asociándolo al tipo correspondiente
//         const product = new Productos({
//             name,
//             price,
//             brand,
//             description,
//             stock,
//             sise,
//             color,
//             image: images, // Almacena las imágenes como buffers
//             tipo: tipoId,
//         });

//         await product.save();
//         res.status(200).send(product);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// };
// const createProduct = async (req, res) => {
//     try {
//         const { name, price, brand, tipoId, sise, color, stock, description } = req.body;

//         // Verifica si el producto ya existe
//         const existingProduct = await Productos.findOne({ name });
//         if (existingProduct) {
//             return res.status(400).send("El producto ya existe");
//         }

//         // Verifica si el tipo de producto existe
//         const tipo = await TipoProductos.findById(tipoId);
//         if (!tipo) {
//             return res.status(400).send("El tipo de producto no existe");
//         }

//         // Crea un arreglo para almacenar las imágenes
//         const images = req.files.map(file => file.buffer);

//         // Divide las cadenas de sise y color en arreglos
//         const sizesArray = sise.split(',').map(size => size.trim()); // Separa por comas y elimina espacios
//         const colorsArray = color.split(',').map(col => col.trim()); // Separa por comas y elimina espacios

//         // Crea el producto asociándolo al tipo correspondiente
//         const product = new Productos({
//             name,
//             price,
//             brand,
//             description,
//             stock,
//             sise: sizesArray, // Almacena las tallas como un arreglo
//             color: colorsArray, // Almacena los colores como un arreglo
//             image: images, // Almacena las imágenes como buffers
//             tipo: tipoId,
//         });

//         await product.save();
//         res.status(200).send(product);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// };
// const createProduct = async (req, res) => {
//     try {
//         const { name, price, brand, tipoId, sise, color, stock, description } = req.body;

//         // Verifica si el producto ya existe
//         const existingProduct = await Productos.findOne({ name });
//         if (existingProduct) {
//             return res.status(400).send("El producto ya existe");
//         }

//         // Verifica si el tipo de producto existe
//         const tipo = await TipoProductos.findById(tipoId);
//         if (!tipo) {
//             return res.status(400).send("El tipo de producto no existe");
//         }

//         // Sube cada imagen a Cloudinary y almacena sus URLs en un arreglo
//         const imageUrls = await Promise.all(req.files.map((file) => {
//             return new Promise((resolve, reject) => {
//                 const stream = cloudinary.uploader.upload_stream(
//                     { folder: 'Carpeta_tienda' },
//                     (error, result) => {
//                         if (error) {
//                             reject(error);
//                         } else {
//                             resolve(result.secure_url);
//                         }
//                     }
//                 );
//                 stream.end(file.buffer); // Asegura que se esté enviando el buffer
//             });
//         }));

//         // Divide las cadenas de sise y color en arreglos
//         const sizesArray = Array.isArray(sise) ? sise : sise.split(',').map(size => size.trim());
//         const colorsArray = Array.isArray(color) ? color : color.split(',').map(col => col.trim());

//         // Crea el producto asociándolo al tipo correspondiente
//         const product = new Productos({
//             name,
//             price,
//             brand,
//             description,
//             stock,
//             sise: sizesArray,
//             color: colorsArray,
//             image: imageUrls, 
//             tipo: tipoId,
//         });

//         await product.save();
//         res.status(200).send(product);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// };
const createProduct = async (req, res) => {
    try {
        const { name, price, brand, tipoId, color, stock, description } = req.body;

        // Verifica si el producto ya existe
        const existingProduct = await Productos.findOne({ name });
        if (existingProduct) {
            return res.status(400).send("El producto ya existe");
        }

        // Verifica si el tipo de producto existe
        const tipo = await TipoProductos.findById(tipoId);
        if (!tipo) {
            return res.status(400).send("El tipo de producto no existe");
        }

        // Sube cada imagen a Cloudinary y almacena sus URLs en un arreglo
        let imageUrls = [];

        if (req.files && req.files.length > 0) {
            imageUrls = await Promise.all(req.files.map((file) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: 'Carpeta_tienda' },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result.secure_url);
                            }
                        }
                    );
                    stream.end(file.buffer);
                });
            }));
        }

        // Procesa color como arreglo
        const colorsArray = Array.isArray(color)
            ? color
            : (typeof color === 'string' ? color.split(',').map(col => col.trim()) : []);

        // Crea el producto
        const product = new Productos({
            name,
            price,
            brand,
            description,
            stock,
            color: colorsArray,
            image: imageUrls,
            tipo: tipoId,
        });

        await product.save();
        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


/**
 * Actulizar un  producto.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa que resuelve con la respuesta al cliente.
 */

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        console.log("hola soy el id", id)

        if (!id) {
            res.status(404).send("No existe producto con ese ID")
            return
        }
        const existingProduct = await Productos.findById(id);
        if (!existingProduct) {
            res.status(404).send("No existe producto con ese ID.");
            return;
        }
        const { name, price, image, stock,brand, description } = req.body
        const updateFields = {};
        if (name) {
            updateFields.name = name;
        }
        if (price) {
            updateFields.price = price;
        }
        if (brand) {
            updateFields.brand = brand;
        }
        if (image) {
            updateFields.image = image;
        }
        if (stock) {
            updateFields.stock = stock;
        }
        if (description) {
            updateFields.description = description;
        }
        const update = await Productos.findByIdAndUpdate(id, updateFields, { new: true });
        res.status(200).send(update)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

/**
 * Eliminar un  producto.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Promesa que resuelve con la respuesta al cliente.
 */

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Productos.findById(id)
        console.log("soy el producto a eliminar", product)
        if (!product) {
            res.status(404).send("No existe producto con ese Id ")
            return
        }
        const productDelete = await Productos.findByIdAndDelete(product)

        res.status(200).send("Producto Eliminado")
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
const getProductId = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            res.status(404).send("No existe producto con ese ID")
            return
        }
        const productId = await Productos.findById(id)

        res.status(200).send(productId)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    allProduct,
    productName,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductId
}