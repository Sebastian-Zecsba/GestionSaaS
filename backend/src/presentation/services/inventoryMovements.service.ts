import { InventoryMovementsModel, ProductModel, WarehouseModel, InventoryModel } from "../../data/mongo";
import { CustomError, InventoryMovementsDto, UserEntity } from "../../domain";

export class InventoryMovementsService {
  constructor() {}

  async createInventoryMovements( inventoryMovementsDto: InventoryMovementsDto, user: UserEntity ) {
    const { product, warehouse, movement_type, quantity } = inventoryMovementsDto;

    const existProduct = await ProductModel.findById(product);
    if (!existProduct) throw CustomError.badRequest("Producto no encontrado");

    const existWarehouse = await WarehouseModel.findById(warehouse);
    if (!existWarehouse) throw CustomError.badRequest("Bodega no encontrada");

    try {

        if(movement_type === "entrada"){
            const existOnInventory = await InventoryModel.find({product: product, warehouse: warehouse})
            const updateQuantity = await InventoryModel.findOneAndUpdate({_id: existOnInventory[0]._id}, {quantity: existOnInventory[0].quantity + quantity}, {new: true})
    
            const createMovement = new InventoryMovementsModel({
                ...inventoryMovementsDto,
                user: user.id,
            })
    
            await createMovement.save()
    
            return {createMovement , updateQuantity}
        }

        if(movement_type === "salida"){
            const existOnInventory = await InventoryModel.find({product: product, warehouse: warehouse})
            const updateQuantity = await InventoryModel.findOneAndUpdate({_id: existOnInventory[0]._id}, {quantity: existOnInventory[0].quantity - quantity}, {new: true})
    
            const createMovement = new InventoryMovementsModel({
                ...inventoryMovementsDto,
                user: user.id,
            })
    
            await createMovement.save()
    
            return {createMovement , updateQuantity}
        }

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

}
