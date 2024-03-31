package DIY4Rent.Grupo0734.DIY4Rent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DIY4Rent.Grupo0734.DIY4Rent.model.Usuario;
import DIY4Rent.Grupo0734.DIY4Rent.repo.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> getUsuarioById(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario addUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario updateUsuarioById(Long id, Usuario newUsuarioData) {
        Optional<Usuario> oldUsuarioData = usuarioRepository.findById(id);
        if (oldUsuarioData.isPresent()) {
            Usuario updatedUsuarioData = oldUsuarioData.get();
            updatedUsuarioData.setDni(newUsuarioData.getDni());
            updatedUsuarioData.setNombre(newUsuarioData.getNombre());
            updatedUsuarioData.setDireccion(newUsuarioData.getDireccion());
            updatedUsuarioData.setEmail(newUsuarioData.getEmail());
            updatedUsuarioData.setTelefono(newUsuarioData.getTelefono());

            return usuarioRepository.save(updatedUsuarioData);
        }
        return null;
    }

    public void deleteUsuarioById(Long id) {
        usuarioRepository.deleteById(id);
    }
}
