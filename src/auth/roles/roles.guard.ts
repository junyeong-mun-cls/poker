import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new ForbiddenException('로그인 필요');
        }

        if (user.role !== 'ADMIN') {
            throw new ForbiddenException('관리자만 접근 가능');
        }

        return true;
    }
}