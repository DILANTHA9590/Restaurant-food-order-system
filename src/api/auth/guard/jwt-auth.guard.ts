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
     
      return true;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY || 'default_secret');
      console.log("jwt Errr",decoded);
      request.user = decoded;
      return true;
    } catch (err) {
     
      throw new UnauthorizedException("Expired Token"); 
    }
  }
}
