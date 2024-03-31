package DIY4Rent.Grupo0734.DIY4Rent.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import DIY4Rent.Grupo0734.DIY4Rent.model.Usuario;
import DIY4Rent.Grupo0734.DIY4Rent.service.UsuarioService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/v1/users")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        List<Usuario> usuarioList = usuarioService.getAllUsuarios();
        if (usuarioList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(usuarioList, HttpStatus.OK);
    }

    @GetMapping("/getUsuarioById/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) {
        Usuario usuarioData = usuarioService.getUsuarioById(id).orElse(null);
        if (usuarioData != null) {
            return new ResponseEntity<>(usuarioData, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/addUsuario")
    public ResponseEntity<Usuario> addUsuario(@RequestBody Usuario usuario) {
        Usuario newUsuario = usuarioService.addUsuario(usuario);
        return new ResponseEntity<>(newUsuario, HttpStatus.OK);
    }

    @PostMapping("/updateUsuarioById/{id}")
    public ResponseEntity<Usuario> updateUsuarioById(@PathVariable Long id, @RequestBody Usuario newUsuarioData) {
        Usuario updatedUsuarioData = usuarioService.updateUsuarioById(id, newUsuarioData);
        if (updatedUsuarioData != null) {
            return new ResponseEntity<>(updatedUsuarioData, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/deleteUsuarioById/{id}")
    public ResponseEntity<HttpStatus> deleteUsuarioById(@PathVariable Long id) {
        usuarioService.deleteUsuarioById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
