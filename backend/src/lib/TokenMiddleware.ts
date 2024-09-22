import { Request, Response, NextFunction, response, request } from "express";
import { verify } from "jsonwebtoken";

type TokenData = {
	userId: string, 
	iat: number
}

async function authMiddleware( req: Request = request, res: Response = response, next: NextFunction ) {
	try {
		const token = req.headers.authorization?.replace('Bearer ', '');
		if (token) {
			const userDecoded = verify(token, "CHANGE ME") as TokenData;
			req.params.userId = userDecoded.userId ;
			next();
			return;
		}

		return res.status(401).json({
			message: "Denied, requires authentication.",
		});
	} catch (error) {
		console.error("Error getting userId:", error);
		return null;
	}
}

export default authMiddleware;
