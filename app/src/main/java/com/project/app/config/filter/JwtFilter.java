package com.project.app.config.filter;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.project.app.entity.User;
import com.project.app.repository.UserRepository;
import com.project.app.usecase.jwt.JwtUseCase;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/*
 * FILTRO DE JWT
 * caso haja jwt nos headers : aplica authentication ao contexto de segurança
 * caso não : passa requisição para next filter
 */

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUseCase jwtUseCase;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        // pega string de authorizacao
        final String authHeader = request.getHeader("Authorization");

        // verifica se há header com barreira (token)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // pega token jwt a partir de substring (retirando "Baerer ")
        final String jwt = authHeader.substring(7);
        final String cpf = jwtUseCase.extractCpf(jwt);

        // tenta encontrar usuário pelo cpf
        Optional<User> optionalUser = userRepository.findByCpf(cpf);

        // verifica se usuário foi encontrado
        // caso não encontre, lança excessão de credenciais inválidas
        if (optionalUser.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }

        // caso encontre, atribuimos informações
        User user = optionalUser.get();

        // verifica se o token jwt é válido
        // caso inválido, lança excessão de credenciais inválidas
        if (!jwtUseCase.isTokenValid(jwt, user.getCpf())) {
            filterChain.doFilter(request, response);
            return;
        }

        // se houver autentication no contexto, finaliza filtro
        if (SecurityContextHolder.getContext().getAuthentication() != null){
            filterChain.doFilter(request, response);
            return;
        }

        // instancia novo authenticationToken
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user, null, null);

        // configuração autentication ao contexto
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        // caso válido
        filterChain.doFilter(request, response);
    }
}
