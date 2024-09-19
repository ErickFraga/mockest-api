import { Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';

@Injectable()
export class SessionMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let sessionId = req.cookies.sessionId ?? null;
    if (!sessionId) {
      sessionId = nanoid();
    }
    req.cookies = { sessionId };
    res.cookie('sessionId', sessionId, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    });

    next();
  }
}
