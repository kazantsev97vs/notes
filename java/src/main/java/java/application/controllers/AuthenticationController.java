package java.application.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.application.config.JwtTokenUtil;
import java.application.entities.User;
import java.application.models.ApiResponse;
import java.application.models.LoginUser;
import java.application.service.UserService;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/authentication")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public ApiResponse<User> registration (@RequestBody User user) throws AuthenticationException {
        return new ApiResponse<>(
                HttpStatus.OK.value(),
                "User saved successfully.",
                userService.save(user)
        );
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ApiResponse<String> login(@RequestBody LoginUser loginUser) throws AuthenticationException {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginUser.getUsername(), loginUser.getPassword()));

        final User user = userService.findByUsername(loginUser.getUsername());

        final String token = jwtTokenUtil.generateToken(user);

        return new ApiResponse<>(200, "success", token);
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ApiResponse<Void> logout() throws AuthenticationException {
        return new ApiResponse<>(200, "success", null);
    }

}
