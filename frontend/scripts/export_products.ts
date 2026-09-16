import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CATEGORIES_DATA, ALL_PRODUCTS } from '../src/data/products';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, '../backend/apps/catalog/fixtures');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const data = {
  categories: CATEGORIES_DATA,
  products: ALL_PRODUCTS
};

fs.writeFileSync(
  path.join(outputDir, 'legacy_products.json'),
  JSON.stringify(data, null, 2)
);

console.log('Successfully exported legacy products to fixtures/legacy_products.json');
