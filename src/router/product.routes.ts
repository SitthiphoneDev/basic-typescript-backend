import { Router } from 'express';
import { productController } from '../controllers/product.controller';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - product_name
 *         - quantity
 *         - price
 *         - sale_price
 *         - category_id
 *         - unit_id
 *       properties:
 *         product_id:
 *           type: integer
 *           description: The auto-generated id of the product
 *         product_name:
 *           type: string
 *           description: The name of the product
 *         quantity:
 *           type: number
 *           description: The quantity in stock
 *         price:
 *           type: number
 *           description: The regular price of the product
 *         sale_price:
 *           type: number
 *           description: The sale price of the product
 *         category_id:
 *           type: integer
 *           description: The ID of the product's category
 *         unit_id:
 *           type: integer
 *           description: The ID of the product's unit of measurement
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the product was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the product was last updated
 *         category:
 *           $ref: '#/components/schemas/Category'
 *         unit:
 *           $ref: '#/components/schemas/Unit'
 *       example:
 *         product_id: 1
 *         product_name: "Laptop"
 *         quantity: 50
 *         price: 999.99
 *         sale_price: 899.99
 *         category_id: 1
 *         unit_id: 1
 *         createdAt: "2024-01-22T12:00:00Z"
 *         updatedAt: "2024-01-22T12:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 required:
 *                   - product_name
 *                   - quantity
 *                   - price
 *                   - sale_price
 *                   - category_id
 *                   - unit_id
 *                 properties:
 *                   product_name:
 *                     type: string
 *                   quantity:
 *                     type: number
 *                   price:
 *                     type: number
 *                   sale_price:
 *                     type: number
 *                   category_id:
 *                     type: integer
 *                   unit_id:
 *                     type: integer
 *               - type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - product_name
 *                     - quantity
 *                     - price
 *                     - sale_price
 *                     - category_id
 *                     - unit_id
 *                   properties:
 *                     product_name:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     price:
 *                       type: number
 *                     sale_price:
 *                       type: number
 *                     category_id:
 *                       type: integer
 *                     unit_id:
 *                       type: integer
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */
router.post('/', productController.create);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Returns the list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */
router.get('/', productController.getAll);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 *       500:
 *         description: Some server error
 */
router.get('/:id', productController.getOne);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *               sale_price:
 *                 type: number
 *               category_id:
 *                 type: integer
 *               unit_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The product was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 *       500:
 *         description: Some server error
 */
router.put('/:id', productController.update);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Remove a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product deleted successfully
 *       404:
 *         description: The product was not found
 *       500:
 *         description: Some server error
 */
router.delete('/:id', productController.delete);

export default router;