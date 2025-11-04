import { Routes } from '@angular/router';
import { Register } from "./features/auth/register/register";

export const routes: Routes = [
    //UH1 : Criar página de cadastro na rota "auth/users"
    {
        path: "auth/users",
        component: Register,
        title: "Cadastrar",
    }
]

export default routes;