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
            description: getDescription(row),
            unit: row['__EMPTY_2'] as string,
            qty: row['__EMPTY_3'] !== '-' ? String(row['__EMPTY_3']) : undefined,
            rate: String(row['__EMPTY_4']),
            amount: row['__EMPTY_5'] !== '-' ? String(row['__EMPTY_5']) : undefined,
        };

        // Validate required fields
        if (!mappedRow.itemNo || !mappedRow.description || !mappedRow.unit) {
            continue; // Skip the current row and move to the next row
        }
        if ()

        // Save the product to the database
        const createdProduct = await prisma.product.create({
            data: mappedRow,
        });

        products.push(createdProduct);
    }

    return products;
}

function getDescription(row: any): string {
    const description = row['__EMPTY_1'] as string;
    const nestedTables = getNestedTables(row);
    if (nestedTables.length === 0) {
        return description;
    } else {
        const nestedDescriptions = nestedTables.map(getDescription);
        return `${description}\n${nestedDescriptions.join('\n')}`;
    }
}

function getNestedTables(row: any): any[] {
    const nestedTables: any[] = [];
    for (const key in row) {
        if (key.startsWith('__EMPTY_') && Array.isArray(row[key])) {
            nestedTables.push(row[key]);
        }
    }
    return nestedTables;
}

export { processExcelData };
