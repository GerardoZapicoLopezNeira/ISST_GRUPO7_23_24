package DIY4Rent.Grupo0734.DIY4Rent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import DIY4Rent.Grupo0734.DIY4Rent.mapper.UserMapper;
import DIY4Rent.Grupo0734.DIY4Rent.model.Usuario;
import DIY4Rent.Grupo0734.DIY4Rent.repo.UsuarioRepository;
import DIY4Rent.Grupo0734.DIY4Rent.dto.CredentialsDto;
import DIY4Rent.Grupo0734.DIY4Rent.dto.SignUpDto;
import DIY4Rent.Grupo0734.DIY4Rent.dto.UserDto;
import DIY4Rent.Grupo0734.DIY4Rent.exceptions.AppException;

import java.nio.CharBuffer;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDto findByUsername(String username) {
        Usuario usuario = usuarioRepository.findByUsername(username)
            .orElseThrow(() -> new AppException("Error: Usuario no encontrado", HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(usuario);
    }

    public UserDto login(CredentialsDto credentialsDto) {
        Usuario usuario = usuarioRepository.findByUsername(credentialsDto.getUsername())
            .orElseThrow(() -> new AppException("Error: Usuario no encontrado", HttpStatus.NOT_FOUND));
            if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), usuario.getPassword())) {
                return userMapper.toUserDto(usuario);
            }
            throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto userDto) {
        Optional<Usuario> optionalUser = usuarioRepository.findByUsername(userDto.getUsername());

        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        Usuario usuario = userMapper.signUpToUser(userDto);
        usuario.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));

        Usuario savedUser = usuarioRepository.save(usuario);

        return userMapper.toUserDto(savedUser);
    }

}
