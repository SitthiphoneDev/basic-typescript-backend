import { Router } from 'express';
import { unitController } from '../controllers/unit.controller';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Unit:
 *       type: object
 *       required:
 *         - unit_name
 *       properties:
 *         unit_id:
 *           type: integer
 *           description: The auto-generated id of the unit
 *         unit_name:
 *           type: string
 *           description: The name of the unit (e.g., kg, pieces, boxes)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the unit was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the unit was last updated
 *       example:
 *         unit_id: 1
 *         unit_name: "Kilogram"
 *         createdAt: "2024-01-22T12:00:00Z"
 *         updatedAt: "2024-01-22T12:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Units
 *   description: The units managing API
 */

/**
 * @swagger
 * /api/units:
 *   post:
 *     summary: Create a new unit
 *     tags: [Units]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/Unit'
 *               - type: array
 *                 items:
 *                   $ref: '#/components/schemas/Unit'
 *     responses:
 *       201:
 *         description: The unit was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unit'
 *       500:
 *         description: Some server error
 */
router.post('/', unitController.create);

/**
 * @swagger
 * /api/units:
 *   get:
 *     summary: Returns the list of all units
 *     tags: [Units]
 *     responses:
 *       200:
 *         description: The list of units
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Unit'
 *       500:
 *         description: Some server error
 */
router.get('/', unitController.getAll);

/**
 * @swagger
 * /api/units/{id}:
 *   get:
 *     summary: Get a unit by id
 *     tags: [Units]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unit id
 *     responses:
 *       200:
 *         description: The unit details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unit'
 *       404:
 *         description: The unit was not found
 *       500:
 *         description: Some server error
 */
router.get('/:id', unitController.getOne);

/**
 * @swagger
 * /api/units/{id}:
 *   put:
 *     summary: Update a unit by id
 *     tags: [Units]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unit id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - unit_name
 *             properties:
 *               unit_name:
 *                 type: string
 *                 description: The updated unit name
 *     responses:
 *       200:
 *         description: The unit was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unit'
 *       404:
 *         description: The unit was not found
 *       500:
 *         description: Some server error
 */
router.put('/:id', unitController.update);

/**
 * @swagger
 * /api/units/{id}:
 *   delete:
 *     summary: Remove a unit by id
 *     tags: [Units]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unit id
 *     responses:
 *       200:
 *         description: The unit was deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unit deleted successfully
 *       404:
 *         description: The unit was not found
 *       500:
 *         description: Some server error
 */
router.delete('/:id', unitController.delete);

export default router;