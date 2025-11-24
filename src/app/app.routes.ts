import { Routes } from '@angular/router';
// Importando o Cadastro (que JÁ EXISTE na branch)
import { Register } from "./features/auth/register/register";

// Importando a TELA (Publicar Necessidade)
import { PublishNeed } from './features/needs/publish-need/publish-need';

// Importando a NOVA TELA (Buscar Prestadores)
import { Search } from './features/search/search';

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
    },

    // 5. A Rota de Busca de Prestadores
    {
    path: "search",
    component: Search,
    title: "Buscar Prestadores"
    }
    // (Sem a rota de Login pois ela não existe nesta branch)
];

export default routes;