import { InventoryMovementsModel, ProductModel, WarehouseModel, InventoryModel } from "../../data/mongo";
import { CustomError, InventoryMovementsDto, PaginationDto, UserEntity } from "../../domain";

export class InventoryMovementsService {
  constructor() {}

  async createInventoryMovements( inventoryMovementsDto: InventoryMovementsDto, user: UserEntity ) {
    const { product, warehouse, movement_type, quantity } = inventoryMovementsDto;

    const existProduct = await ProductModel.findById(product);
    if (!existProduct) throw CustomError.badRequest("Producto no encontrado");

    const existWarehouse = await WarehouseModel.findById(warehouse);
    if (!existWarehouse) throw CustomError.badRequest("Bodega no encontrada");

    try {

        if (movement_type === "entrada") {
            let existOnInventory = await InventoryModel.findOne({ product, warehouse });
          
            if (!existOnInventory) {
              const createNewInventory = await InventoryModel.create({ product, warehouse, quantity });
              await createNewInventory.save();
              
              const createMovement = new InventoryMovementsModel({
                ...inventoryMovementsDto,
                user: user.id,
              });
          
              await createMovement.save();
          
              return { createMovement, createNewInventory };
            }
          
            const updateQuantity = await InventoryModel.findOneAndUpdate(
              { _id: existOnInventory._id },
              { quantity: existOnInventory.quantity + quantity },
              { new: true }
            );
          
            const createMovement = new InventoryMovementsModel({
              ...inventoryMovementsDto,
              user: user.id,
            });
          
            await createMovement.save();
          
            return { createMovement, updateQuantity };
          }

          if (movement_type === "salida") {
            let existOnInventory = await InventoryModel.findOne({ product, warehouse });
          
            if (!existOnInventory) {
              throw CustomError.badRequest("No hay inventario disponible para realizar una salida");
            }
          
            if (existOnInventory.quantity < quantity) {
              throw CustomError.badRequest("Cantidad insuficiente en inventario");
            }
          
            const updateQuantity = await InventoryModel.findOneAndUpdate(
              { _id: existOnInventory._id },
              { quantity: existOnInventory.quantity - quantity },
              { new: true }
            );
          
            const createMovement = new InventoryMovementsModel({
              ...inventoryMovementsDto,
              user: user.id,
            });
          
            await createMovement.save();
          
            return { createMovement, updateQuantity };
          }

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getInventoryMovements(paginationDto: PaginationDto, user: UserEntity) {
    const { page, limit, searchTerm } = paginationDto;
    
    let productQuery = {};
    
    productQuery = searchTerm ? { name: { $regex: searchTerm, $options: 'i' }, user: user.id } : {user: user.id };


    try {

        const matchingProducts = await ProductModel.find(productQuery).select('_id');
        const productIds = matchingProducts.map(product => product._id);

        let query: any = {};
        if (productIds.length > 0) {
            query.product = { $in: productIds };
        }
        const [total, movements] = await Promise.all([
            InventoryMovementsModel.countDocuments(query),
            InventoryMovementsModel.find(query)
                .skip((page - 1) * limit)
                .limit(limit)
                .populate('warehouse')
                .populate('product')
                .populate('user')
        ]);

        return {
            page,
            limit,
            total,
            next: `/movements?page=${(page + 1)}&limit=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`,
            prev: (page - 1 > 0) ? `/movements?page=${(page - 1)}&limit=${limit}${searchTerm ? `&search=${searchTerm}` : ''}` : null,
            movements: movements.map(movement => ({
                id: movement._id,
                product: movement.product,
                warehouse: movement.warehouse,
                user: movement.user,
                quantity: movement.quantity,
                movement_type: movement.movement_type,
                createdAt: movement.createdAt,
                isDeleted: movement.isDeleted
            }))
        };

    } catch (error) {
        throw CustomError.badRequest(`${error}`);
    }
}
}
