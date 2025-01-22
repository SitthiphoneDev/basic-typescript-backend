import { Request, Response, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const categoryController = {
  // Create a new category
  create: (async (req: Request, res: Response) => {
    try {
      const data = req.body;
      let result;

      if (Array.isArray(data)) {
        // Bulk create
        result = await prisma.$transaction(
          data.map((category) => 
            prisma.category.create({
              data: {
                category_name: category.category_name
              }
            })
          )
        );
      } else {
        // Single create
        result = await prisma.category.create({
          data: {
            category_name: data.category_name
          }
        });
      }

      res.status(201).json({
        message: 'Category created successfully',
        result: result
      });
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Error creating category' });
    }
  }) as RequestHandler,

  // Get all categories with their products
  getAll: (async (req: Request, res: Response) => {
    try {
      const categories = await prisma.category.findMany({
        // include: {
        //   product: true
        // },
        orderBy: {
          createdAt: 'desc'
        }
      });
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching categories' });
    }
  }) as RequestHandler,

  // Get a single category by ID
  getOne: (async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await prisma.category.findUnique({
        where: {
          category_id: Number(id)
        },
        // include: {
        //   product: true
        // }
      });
      
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching category' });
    }
  }) as RequestHandler,

  // Update a category
  update: (async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { category_name } = req.body;
      
      const category = await prisma.category.update({
        where: {
          category_id: Number(id)
        },
        data: {
          category_name
        }
      });
      
      res.json({
        message: 'Category updated successfully',
        result: category
      });
    } catch (error) {
      res.status(500).json({ error: 'Error updating category' });
    }
  }) as RequestHandler,

  // Delete a category
  delete: (async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.category.delete({
        where: {
          category_id: Number(id)
        }
      });
      res.status(200).send({
        message: 'Category deleted successfully'
      });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting category' });
    }
  }) as RequestHandler
};
