import xlsx from 'xlsx';
import { PrismaClient } from '@prisma/client';
import { ProductEntity } from '../models/product.entity.js';

const prisma = new PrismaClient();

async function processExcelData(filePath: string): Promise<ProductEntity[]> {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const products: ProductEntity[] = [];

    for (const row of jsonData) {
        const mappedRow: ProductEntity = {
            itemNo: String(row['__EMPTY']),
            description: row['__EMPTY_1'] as string,
            unit: row['__EMPTY_2'] as string,
            qty: row['__EMPTY_3'] !== '-' ? String(row['__EMPTY_3']) : undefined,
            rate: String(row['__EMPTY_4']),
            amount: row['__EMPTY_5'] !== '-' ? String(row['__EMPTY_5']) : undefined,
        };

        if (!mappedRow.itemNo || !mappedRow.description || !mappedRow.unit) {
            continue;
        }

        if (
            mappedRow.itemNo === 'Item No ' ||
            mappedRow.description === 'Description' ||
            mappedRow.unit === 'Unit' ||
            mappedRow.qty === 'Qty' ||
            mappedRow.rate === 'Rate' ||
            mappedRow.amount === 'Amount'
        ) {
            continue;
        }

        if (!mappedRow.itemNo) {
            mappedRow.itemNo = products[products.length - 1].itemNo;
        }

        const createdProduct = await prisma.product.create({
            data: mappedRow,
        });

        products.push(createdProduct);
    }

    return products;
}

export { processExcelData };
