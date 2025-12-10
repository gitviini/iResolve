import { Routes } from '@angular/router';
import { Register } from "./features/auth/register/register";
import { Login } from "./features/auth/login/login";
import { authGuard } from './core/guards/auth-guard';

// Import dos Componentes das Features
import { HomeComponent } from './features/home/home.component';
import { PublishComponent } from './features/needs/publish/publish.component';
import { PaymentComponent } from './features/payment/payment.component';
import { CheckoutComponent } from './features/payment/checkout/checkout.component';
import { RateComponent } from './features/review/rate/rate.component';
import { ChatComponent } from './features/chat/chat.component';
import { VerificationComponent } from './features/verification/verification.component';
import { ProfileComponent } from './features/profile/profile.component';
import { MyContractsComponent } from './features/contracts/my-contracts/my-contracts.component'; // <--- Import Novo

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
    
    // UH10/UH5/UH13 - Home (Mural)
    {
        path: "home",
        component: HomeComponent,
        canActivate: [authGuard],
        title: "Início"
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

    // UH12/UH11 - Perfil
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [authGuard],
        title: "Meu Perfil"
    },

    // NOVA ROTA - Meus Contratos
    {
        path: "contracts",
        component: MyContractsComponent,
        canActivate: [authGuard],
        title: "Meus Contratos"
    }
];

export default routes;