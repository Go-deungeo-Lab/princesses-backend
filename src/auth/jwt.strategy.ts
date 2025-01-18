import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

type JwtPayload = {
    sub: number;
    username: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'your-secret-key',
            passReqToCallback: true
        });
    }

    async validate(request: Request, payload: JwtPayload) {
        return {
            userId: payload.sub,
            username: payload.username,
        };
    }
}