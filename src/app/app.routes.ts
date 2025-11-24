import { Routes } from '@angular/router';
// Importando o Cadastro (que JÁ EXISTE na branch)
import { Register } from "./features/auth/register/register";

// Importando a NOVA TELA (Publicar Necessidade)
import { PublishNeed } from './features/needs/publish-need/publish-need';

export const routes: Routes = [
    // 1. Regra: Se acessar o site vazio (""), manda para o "/home"
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },

    // 2. A Rota Home (UH3)
    {
        path: "home",
        component: PublishNeed,
        title: "Publicar Necessidade"
    },

    // 3. Rotas de Autenticação
    {
        path: "auth/users",
        component: Register,
        title: "Cadastrar",
    }
    // (Sem a rota de Login pois ela não existe nesta branch)
];

export default routes;