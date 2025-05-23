import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: AuthenticatedUser): Promise<AuthenticatedUser> {
    return payload;
  }
}

export type AuthenticatedUser = { id: number };

export async function validateToken(token: string): Promise<{ id: number }> {
  const res: any = jwtDecode(token);
  return {
    id: res.id,
  };
}
