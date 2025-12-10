import { Routes } from "@angular/router";
import { Register } from "./features/auth/register/register";
import { Login } from "./features/auth/login/login";
import { authGuard } from './core/guards/auth-guard';
import { ProfileComponent } from './features/profile/profile.component';

// Import dos Componentes das Features
import { HomeComponent } from './features/home/home.component';
import { PublishComponent } from './features/needs/publish/publish.component'; // <--- O erro era a falta deste
import { PaymentComponent } from './features/payment/payment.component';
import { CheckoutComponent } from './features/payment/checkout/checkout.component';
import { RateComponent } from './features/review/rate/rate.component'; // Atenção: 'review' no singular
import { ChatComponent } from './features/chat/chat.component';
import { VerificationComponent } from './features/verification/verification.component';
import { Search } from './features/search/search';
import { Logout } from './features/logout/logout';
import { Contracts } from './features/contracts/contracts';

export const routes: Routes = [
    // Redirecionamento inicial
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    
    // --- ROTAS PÚBLICAS ---
    {
        path: "auth/users",
        component: Register,
        title: "Cadastrar",
    },
    {
        path: "auth/login",
        component: Login,
        title: "Login",
    },
    {
        path: "auth/forgot",
        component: Login, 
        title: "Recuperar Senha"
    },

    // --- ROTAS PRIVADAS (Protegidas) ---
    
    // UH10 - Home (Mural)
    {
        path: "home",
        component: HomeComponent, // Agora aponta para o arquivo correto!
        canActivate: [authGuard],
        title: "Início"
    },

    
    {
        path: "search",
        component: Search, // Agora aponta para o arquivo correto!
        canActivate: [authGuard],
        title: "Pesquisar"
    },


    // UH3 - Publicar
    {
        path: "needs/publish",
        component: PublishComponent,
        canActivate: [authGuard],
        title: "Publicar Necessidade"
    },

    // UH4 - Verificação
    {
        path: "verification",
        component: VerificationComponent,
        canActivate: [authGuard],
        title: "Verificar Identidade"
    },

    // UH9 - Chat
    {
        path: "chat",
        component: ChatComponent,
        canActivate: [authGuard],
        title: "Chat"
    },

    // UH6 - Contrato/Pagamento
    {
        path: "payment",
        component: PaymentComponent,
        canActivate: [authGuard],
        title: "Detalhes do Contrato"
    },

    // UH7 - Checkout
    {
        path: "payment/checkout",
        component: CheckoutComponent,
        canActivate: [authGuard],
        title: "Pagamento"
    },

    // UH8 - Avaliação
    {
        path: "reviews/rate",
        component: RateComponent,
        canActivate: [authGuard],
        title: "Avaliar Serviço"
    },

    // CONTRATOS
    {
        path: "contracts",
        component: Contracts,
        canActivate: [authGuard],
        title: "Avaliar Serviço"
    },

    /* //UH12 - Perfil
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [authGuard],
        title: "Meu Perfil"
    }, */

    //UH16 - other profile
    {
        path: "profile/:nickname",
        component: ProfileComponent,
        canActivate: [authGuard],
        title: "Meu Perfil"
    },

    // LOGOUT
    {
        path: "logout",
        component: Logout,
        title: "Logout"
    }
];

export default routes;
