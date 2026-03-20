import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PlayerService } from '../player/player.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private playerService: PlayerService,
        private jwtService: JwtService,
    ) { }

    async login(username: string, password: string) {
        const user = await this.playerService.findByUsername(username);

        if (!user) throw new UnauthorizedException('No user found');

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) throw new UnauthorizedException('Invalid password');

        const payload = { sub: user.id, username: user.username, role: user.role };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}