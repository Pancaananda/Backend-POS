import { Request, Response } from 'express';
import { firestore } from '../config/firebase';

export class UserController {
    // Create a new user
    async createUser(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const userRef = firestore.collection('users').doc(email);
            await userRef.set({ email, password });
            res.status(201).send({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).send({ error: 'Error creating user' });
        }
    }

    // Get user details
    async getUser(req: Request, res: Response) {
        const { email } = req.params;
        try {
            const userRef = firestore.collection('users').doc(email);
            const userDoc = await userRef.get();
            if (!userDoc.exists) {
                return res.status(404).send({ error: 'User not found' });
            }
            res.status(200).send(userDoc.data());
        } catch (error) {
            res.status(500).send({ error: 'Error fetching user' });
        }
    }

    // Update user details
    async updateUser(req: Request, res: Response) {
        const { email } = req.params;
        const updates = req.body;
        try {
            const userRef = firestore.collection('users').doc(email);
            await userRef.update(updates);
            res.status(200).send({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).send({ error: 'Error updating user' });
        }
    }

    // Delete a user
    async deleteUser(req: Request, res: Response) {
        const { email } = req.params;
        try {
            const userRef = firestore.collection('users').doc(email);
            await userRef.delete();
            res.status(200).send({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).send({ error: 'Error deleting user' });
        }
    }
}