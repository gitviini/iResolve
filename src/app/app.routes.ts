import { Routes } from "@angular/router";
import { Register } from "./features/auth/register/register";
import { Login } from "./features/auth/login/login";

export const routes: Routes = [
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
		title: "Recuperar Senha",
	},

	// --- ROTAS PRIVADAS (Protegidas pelo Guard) ---
];

export default routes;
