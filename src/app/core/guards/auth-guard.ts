import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

/**
 * Guarda as rotas não públicas
 * caso usuário esteja loggado : permite o acesso a rota
 * caso contrário : redireciona-o para rota de login
 * OBS: Usar em todas as rotas que não são públicas
 */

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isLogged()) {
    const registerPath = router.parseUrl("/auth/users");

    return new RedirectCommand(registerPath, {
      skipLocationChange: true,
    });
  }

  return true;
};
