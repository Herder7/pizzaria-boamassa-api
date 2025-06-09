import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { FindCategoryController } from "./controllers/category/FindCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { EditCategoryController } from "./controllers/category/EditCategoryController";
import { DisableCategoryController } from "./controllers/category/DisableCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import uploadConfig from './config/multer';
import { FindProductController } from "./controllers/product/FindProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { ListProductController } from "./controllers/product/ListProductController";
import { EditProductController } from "./controllers/product/EditProductController";
import { DisableProductController } from "./controllers/product/DisableProductController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { ShowOrderDetailController } from "./controllers/order/ShowOrderDetailController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
import { CreateTableController } from "./controllers/table/CreateTableController";
import { ListTableController } from "./controllers/table/ListTableController";
import { BusyTableController } from "./controllers/table/BusyTableController";
import { DisableTableController } from "./controllers/table/DisableTableController";
import { CreatePaymentController } from "./controllers/payment/CreatePaymentController";
import { ListTableCallWaiterController } from "./controllers/table/ListTableCallWaiterController";
import { UpdateTableController } from "./controllers/table/UpdateTableController";
import { ListTableCloseBillController } from "./controllers/table/ListTableCloseBillController";
import { DeletePaymentController } from "./controllers/payment/DeletePaymentController";
import { FinishPaymentController } from "./controllers/payment/FinishPaymentController";
import { ListUserController } from "./controllers/user/ListUserController";
import { DisableUserController } from "./controllers/user/DisableUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import { ChangePasswordUserController } from "./controllers/user/ChangePasswordUserController";
import { ListProductsMenuController } from "./controllers/menu/ListProductsMenuController";
import { DeleteCategoryController } from "./controllers/category/DeleteCategoryController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { LoggedOutUserController } from "./controllers/user/LoggedOutUserController";
import { ListTableMenuController } from "./controllers/menu/ListTableMenuController";
import { CallWaiterMenuController } from "./controllers/menu/CallWaiterMenuController";
import { CloseBillMenuController } from "./controllers/menu/CloseBillMenuController";
import { ListPaymentsController } from "./controllers/payment/ListPaymentsController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//Rotas USER
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/userinfo', isAuthenticated, new DetailUserController().handle);
router.put('/user/logout', isAuthenticated, new LoggedOutUserController().handle);
router.get('/users', isAuthenticated, new ListUserController().handle);
router.put('/user/disable', isAuthenticated, new DisableUserController().handle);
router.put('/user/update', isAuthenticated, new UpdateUserController().handle);
router.put('/user/password', isAuthenticated, new ChangePasswordUserController().handle);

//Rotas TABLE
router.post('/table', isAuthenticated, new CreateTableController().handle);
router.get('/tables', isAuthenticated, new ListTableController().handle);
router.put('/table/busy', isAuthenticated, new BusyTableController().handle);
router.put('/table/disable', isAuthenticated, new DisableTableController().handle);
router.get('/tables/call_waiter', isAuthenticated, new ListTableCallWaiterController().handle);
router.get('/tables/close_bill', isAuthenticated, new ListTableCloseBillController().handle);
router.put('/table/update', isAuthenticated, new UpdateTableController().handle);


//Rotas CATEGORY
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/categories', isAuthenticated, new ListCategoryController().handle);
router.get('/category', isAuthenticated, new FindCategoryController().handle);
router.put('/category/update', isAuthenticated, new EditCategoryController().handle);
router.put('/category/disable', isAuthenticated, new DisableCategoryController().handle);
router.delete('/category', isAuthenticated, new DeleteCategoryController().handle);

//Rotas PRODUCT
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/product', isAuthenticated, new FindProductController().handle);
router.get('/product/bycategory', isAuthenticated, new ListByCategoryController().handle);
router.get('/products', isAuthenticated, new ListProductController().handle);
router.put('/product/update', isAuthenticated, new EditProductController().handle);
router.put('/product/disable', isAuthenticated, new DisableProductController().handle);
router.delete('/product', isAuthenticated, new DeleteProductController().handle);

//Rotas ORDER
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new DeleteOrderController().handle);
router.post('/order/add', isAuthenticated, new AddItemController().handle);
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle);
router.put('/order/send', isAuthenticated, new SendOrderController().handle);
router.get('/orders', isAuthenticated, new ListOrderController().handle);
router.get('/order/show', isAuthenticated, new ShowOrderDetailController().handle);
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);

//Rotas PAYMENT
router.get('/payment', isAuthenticated, new CreatePaymentController().handle);
router.delete('/payment', isAuthenticated, new DeletePaymentController().handle);
router.put('/payment', isAuthenticated, new FinishPaymentController().handle);
router.post('/payments', isAuthenticated, new ListPaymentsController().handle);

//Rotas MENU
router.get('/menu', new ListProductsMenuController().handle);
router.get('/menu/categories', new ListCategoryController().handle);
router.get('/menu/table', new ListTableMenuController().handle);
router.put('/menu/call_waiter', new CallWaiterMenuController().handle);
router.put('/menu/close_bill', new CloseBillMenuController().handle);

export { router };