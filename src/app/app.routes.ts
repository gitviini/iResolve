import { Routes } from '@angular/router';
import { Register } from "./features/auth/register/register";
import { Login } from "./features/auth/login/login";
import { authGuard } from './core/guards/auth-guard'; // Importe o Guard
import { VerificationComponent } from './features/verification/verification.component';
import { PaymentComponent } from './features/payment/payment.component';

// Componente temporário para a Home (apenas para teste)
import { Component } from '@angular/core';
import { CheckoutComponent } from './features/payment/checkout/checkout.component';
@Component({
  selector: 'app-home',
  standalone: true,
  template: `<h1>Bem-vindo! Você está logado.</h1>`
})
class HomeComponent {}

export const routes: Routes = [
    // Redirecionamento inicial
    {
        path: "",
        redirectTo: "home", // Mudamos para home para testar o Guard
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

    // --- ROTAS PRIVADAS (Protegidas pelo Guard) ---
    {
        path: "home",
        component: HomeComponent, // Use seu componente Home real aqui futuramente
        canActivate: [authGuard], // <--- AQUI ESTÁ A PROTEÇÃO DO CHECKLIST
        title: "Início"
    },
    {
        path: "verification",
        component: VerificationComponent,
        canActivate: [authGuard],
        title: "Verificar Identidade"
    },
    {
        path: "payment",
        component: PaymentComponent,
        canActivate: [authGuard],
        title: "Contratar e Pagar"
    },
    {
        path: "payment/checkout",
        component: CheckoutComponent, 
        canActivate: [authGuard],
        title: "Pagamento"
    }
];

export default routes;