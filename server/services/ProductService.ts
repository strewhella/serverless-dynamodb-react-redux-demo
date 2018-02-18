import { DynamoDbService } from './DynamoDbService';
import { Product } from '../db/models/Product';

export class ProductService extends DynamoDbService {
    getProducts(): Promise<Array<Product>> {
        return this.getAll('Product');
    }
}
