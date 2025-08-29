// jwt.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
   canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      // token නැත්තම් 그냥 allow
      return true;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY || 'default_secret');
      request.user = decoded;
      return true;
    } catch (err) {
      // invalid / expired token නම් => reject කරන්න instead of skip
      throw new Error("Unauthorized"); // ⚠️ එක optional guard නම් මේක just req.user = null කරන්නත් පුළුවන්
    }
  }
}
