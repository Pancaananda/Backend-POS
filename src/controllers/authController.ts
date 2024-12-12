import { Request, Response } from 'express';
import { auth } from '../config/auth';
import { firestore } from '../config/firebase';
import * as admin from 'firebase-admin';

class AuthController {
    async register(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const userRecord = await admin.auth().createUser({
                email,
                password,
            });

            await firestore.collection('users').doc(userRecord.uid).set({
                email,
                createdAt: new Date(),
            });

            res.status(201).json({ message: 'User registered successfully', uid: userRecord.uid });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const user = await admin.auth().getUserByEmail(email);
            const token = await admin.auth().createCustomToken(user.uid);

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }
}

export default new AuthController();