const {mongoose, Schema} = require('mongoose')

const tipoProductosSchema = mongoose.Schema({
    name:{
        type:String,
        requiere: true
    },
    product: { type: Schema.Types.ObjectId, ref: 'Productos' }
})
module.exports= mongoose.model('TipoProductos',tipoProductosSchema);