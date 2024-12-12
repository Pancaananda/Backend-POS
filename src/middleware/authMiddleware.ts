import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    admin.auth().verifyIdToken(token)
        .then(decodedToken => {
            req.user = decodedToken;
            next();
        })
        .catch(error => {
            console.error('Error verifying token:', error);
            return res.status(401).json({ message: 'Unauthorized' });
        });
};