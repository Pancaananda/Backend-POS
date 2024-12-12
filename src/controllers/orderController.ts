import { Request, Response } from 'express';
import { firestore } from '../config/firebase';

export class OrderController {
    // Create a new order
    public async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const orderData = req.body;
            const orderRef = await firestore.collection('orders').add(orderData);
            res.status(201).json({ id: orderRef.id, ...orderData });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create order' });
        }
    }

    // Get all orders
    public async getOrders(req: Request, res: Response): Promise<void> {
        try {
            const ordersSnapshot = await firestore.collection('orders').get();
            const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve orders' });
        }
    }

    // Get a specific order by ID
    public async getOrderById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const orderDoc = await firestore.collection('orders').doc(id).get();

            if (!orderDoc.exists) {
                res.status(404).json({ error: 'Order not found' });
                return;
            }

            res.status(200).json({ id: orderDoc.id, ...orderDoc.data() });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve order' });
        }
    }

    // Update an order
    public async updateOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const orderData = req.body;
            await firestore.collection('orders').doc(id).update(orderData);
            res.status(200).json({ id, ...orderData });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update order' });
        }
    }

    // Delete an order
    public async deleteOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await firestore.collection('orders').doc(id).delete();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete order' });
        }
    }
}