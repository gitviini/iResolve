import { Routes } from '@angular/router';
import { Home } from "./home/home";
import { Login } from "./auth/login/login";
import { Register } from "./auth/register/register";

export const routes: Routes = [
    {
        path: "",
        component: Home,
        title: "Home",
    },
    {
        path: "auth/login",
        component: Login,
        title: "Login",
    },
    {
        path: "auth/register",
        component: Register,
        title: "Register",
    }
]

export default routes;