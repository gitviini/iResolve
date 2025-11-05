import { Routes } from '@angular/router';
import { Register } from "./features/auth/register/register";

export const routes: Routes = [
    /**
     * ROTAS PÚBLICAS
     */
    // Criar página de cadastro na rota "auth/users" [UH1]
    {
        path: "auth/users",
        component: Register,
        title: "Cadastrar",
    }

    // TODO : Adiciona authGuard para rotas não públicas
]

export default routes;