package joaodearaujo.habit_forge.shared.dto.request.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import joaodearaujo.habit_forge.user.repository.UserRepository;
import joaodearaujo.habit_forge.auth.service.TokenService;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(SecurityFilter.class);


    public SecurityFilter(TokenService tokenService, UserRepository userRepository) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        var token = this.recoverToken(request);

        if (token != null) {
            var email = tokenService.validateToken(token);

            if (!email.isEmpty()) {
                userRepository
                        .findByEmail(email)
                        .ifPresent(user -> {
                            var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                        });
            } else {
                logger.warn("Email not found: {}", email);
            }

        } else {
            logger.warn("Invalid Token");
        }

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        if (request.getCookies() == null) {
            logger.warn("No cookie found");
            return null;
        };
        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equals("token")) {
                    return cookie.getValue();
                }
            }
        return null;
    }
}