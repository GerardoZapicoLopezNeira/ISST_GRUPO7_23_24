package DIY4Rent.Grupo0734.DIY4Rent.controller;

import org.springframework.web.bind.annotation.RestController;

import DIY4Rent.Grupo0734.DIY4Rent.config.UserAuthenticationProvider;
import DIY4Rent.Grupo0734.DIY4Rent.dto.CredentialsDto;
import DIY4Rent.Grupo0734.DIY4Rent.dto.LocationDto;
import DIY4Rent.Grupo0734.DIY4Rent.dto.SignUpDto;
import DIY4Rent.Grupo0734.DIY4Rent.dto.UserDto;
import DIY4Rent.Grupo0734.DIY4Rent.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.parsing.Location;
import org.springframework.web.bind.annotation.PutMapping;


@RequiredArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("/api/v1/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        UserDto userDto = usuarioService.login(credentialsDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto.getUsername()));
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/api/v1/users/{username}")
    public ResponseEntity<UserDto> getUser(@PathVariable String username) {
        UserDto userDto = usuarioService.findByUsername(username);
        return ResponseEntity.ok(userDto);
    } 

    @PostMapping("/api/v1/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto user) {
        UserDto createdUser = usuarioService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(user.getUsername()));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser); 
    }

    @PutMapping("/api/v1/users/{username}")
    public ResponseEntity<UserDto> updateUser(@PathVariable String username, @RequestBody UserDto user) {
        UserDto updatedUser = usuarioService.updateUser(username, user);
        return ResponseEntity.ok(updatedUser);
    }
   
    @PutMapping("/api/v1/users/{username}/location")
    public ResponseEntity<UserDto> updateUserLocation(@PathVariable String username, @RequestBody LocationDto location){
        UserDto updatedUser = usuarioService.updateUserLocation(username, location.getLat(), location.getLng());
        return ResponseEntity.ok(updatedUser);
    }
}
