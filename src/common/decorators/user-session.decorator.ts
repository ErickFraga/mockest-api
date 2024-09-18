import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserSession = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const sessionId = request.cookies.sessionId;
    console.log('Session Decorator', sessionId);
    return sessionId as string;
  },
);
