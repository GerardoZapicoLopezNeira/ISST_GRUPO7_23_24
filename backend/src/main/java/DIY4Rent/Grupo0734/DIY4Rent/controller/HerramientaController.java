package DIY4Rent.Grupo0734.DIY4Rent.controller;

import org.springframework.web.bind.annotation.RestController;

import DIY4Rent.Grupo0734.DIY4Rent.dto.HerramientaDto;
import DIY4Rent.Grupo0734.DIY4Rent.model.Herramienta;
import DIY4Rent.Grupo0734.DIY4Rent.repo.UsuarioRepository;
import DIY4Rent.Grupo0734.DIY4Rent.service.HerramientaService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

@RequiredArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class HerramientaController {

    @Autowired
    private HerramientaService herramientaService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/api/v1/herramientas/{id}")
    public ResponseEntity<HerramientaDto> getHerramientaById(@PathVariable Long id) {
        HerramientaDto herramientaData = herramientaService.getHerramientaById(id);
        if (herramientaData != null) {
            return new ResponseEntity<>(herramientaData, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
/*
    @PutMapping("/api/v1/herramientas/{id}")
    public ResponseEntity<Herramienta> updateHerramientaById(@PathVariable Long id, @RequestBody Herramienta newHerramientaData) {
        Herramienta updatedHerramientaData = herramientaService.updateHerramientaById(id, newHerramientaData);
        if (updatedHerramientaData != null) {
            return new ResponseEntity<>(updatedHerramientaData, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/api/v1/herramientas/{id}")
    public ResponseEntity<HttpStatus> deleteHerramientaById(@PathVariable Long id) {
        herramientaService.deleteHerramientaById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
*/  

    @GetMapping("/api/v1/users/{usuarioId}/herramientas")
    public ResponseEntity<List<HerramientaDto>> getAllHerramientasByUsuarioId(@PathVariable(value="usuarioId") Long usuarioId) {
        
        if(!usuarioRepository.existsById(usuarioId)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        List<HerramientaDto> herramientaList = herramientaService.getAllHerramientasByUsuarioId(usuarioId);
        if (herramientaList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(herramientaList, HttpStatus.OK);
    }

    @PostMapping("/api/v1/users/{usuarioId}/herramientas")
    public ResponseEntity<HerramientaDto> createHerramienta(@PathVariable(value = "usuarioId") Long usuarioId, @RequestBody HerramientaDto herramientaDto) {
        
        HerramientaDto newHerramienta = herramientaService.createHerramienta(herramientaDto, usuarioId);

        return new ResponseEntity<>(newHerramienta, HttpStatus.CREATED);
    }

    @GetMapping("/api/v1/herramientas")
    public ResponseEntity<List<HerramientaDto>> getAllHerramientas() {
        List<HerramientaDto> herramientaList = herramientaService.getAllHerramientas();
        if (herramientaList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(herramientaList, HttpStatus.OK);
    }
}
