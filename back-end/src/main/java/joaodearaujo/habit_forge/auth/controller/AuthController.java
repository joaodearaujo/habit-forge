package joaodearaujo.habit_forge.auth.controller;

import jakarta.servlet.http.HttpServletResponse;
import joaodearaujo.habit_forge.user.entity.User;
import joaodearaujo.habit_forge.auth.dto.request.LoginRequest;
import jakarta.servlet.http.Cookie;
import joaodearaujo.habit_forge.user.dto.response.UserResponse;
import joaodearaujo.habit_forge.auth.service.TokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Value("${app.cookie.secure:false}")
    private boolean cookieSecure;

    @Value("${app.cookie.same-site:Strict}")
    private String cookieSameSite;

    public AuthController(AuthenticationManager authenticationManager, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password());
            Authentication auth = this.authenticationManager.authenticate(usernamePassword);

            User authenticatedUser = (User) auth.getPrincipal();
            String token = tokenService.generateToken(authenticatedUser);

            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(cookieSecure);
            cookie.setPath("/");
            cookie.setMaxAge(2 * 60 * 60);
            cookie.setAttribute("SameSite", cookieSameSite);
            response.addCookie(cookie);

            return ResponseEntity.ok(new UserResponse(
                    authenticatedUser.getId(),
                    authenticatedUser.getName(),
                    authenticatedUser.getEmail())
            );
        } catch (AuthenticationException e) {
            logger.warn("Invalid credentials: {}", loginRequest.email());
            return ResponseEntity.status(401).body("Invalid Credentials");
        }
    }

    @PostMapping("/logout")
    public void logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(cookieSecure);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setAttribute("SameSite", cookieSameSite);
        response.addCookie(cookie);
    }
}