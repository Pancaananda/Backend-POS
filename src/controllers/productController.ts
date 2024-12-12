export class ProductController {
    private products: any[] = [];

    public async getAllProducts(req: any, res: any) {
        try {
            // Logic to retrieve all products from Firestore
            res.status(200).json(this.products);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving products' });
        }
    }

    public async getProductById(req: any, res: any) {
        const { id } = req.params;
        try {
            const product = this.products.find(p => p.id === id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving product' });
        }
    }

    public async createProduct(req: any, res: any) {
        const newProduct = req.body;
        try {
            this.products.push(newProduct);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error creating product' });
        }
    }

    public async updateProduct(req: any, res: any) {
        const { id } = req.params;
        const updatedProduct = req.body;
        try {
            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                return res.status(404).json({ message: 'Product not found' });
            }
            this.products[index] = { ...this.products[index], ...updatedProduct };
            res.status(200).json(this.products[index]);
        } catch (error) {
            res.status(500).json({ message: 'Error updating product' });
        }
    }

    public async deleteProduct(req: any, res: any) {
        const { id } = req.params;
        try {
            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) {
                return res.status(404).json({ message: 'Product not found' });
            }
            this.products.splice(index, 1);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product' });
        }
    }
}