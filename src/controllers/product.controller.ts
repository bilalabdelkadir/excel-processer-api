import { PrismaClient, Product } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const GetProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

export const GetProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve product" });
  }
};

export const CreateProduct = async (req: Request, res: Response) => {
  const { itemNo, description, unit, qty, rate, amount } = req.body;
  try {
    if (!itemNo || !description || !unit || !rate) {
      res.status(400).json({ error: "Required fields are missing" });
      return;
    }
    const product = await prisma.product.create({
      data: {
        itemNo,
        description,
        unit,
        qty,
        rate,
        amount,
      },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const UpdateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { itemNo, description, unit, qty, rate, amount } = req.body;
  try {
    if (!itemNo && !description && !unit && !qty && !rate && !amount) {
      res.status(400).json({ error: "No fields provided to update" });
      return;
    }
    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!existingProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        ...(itemNo && { itemNo }),
        ...(description && { description }),
        ...(unit && { unit }),
        ...(qty && { qty }),
        ...(rate && { rate }),
        ...(amount && { amount }),
      },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const DeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!existingProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    });
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

export const DeleteAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.deleteMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete products" });
  }
};
