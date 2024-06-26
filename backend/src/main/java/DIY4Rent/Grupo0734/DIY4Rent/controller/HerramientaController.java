package DIY4Rent.Grupo0734.DIY4Rent.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import DIY4Rent.Grupo0734.DIY4Rent.dto.HerramientaDto;
import DIY4Rent.Grupo0734.DIY4Rent.repo.UsuarioRepository;
import DIY4Rent.Grupo0734.DIY4Rent.service.HerramientaService;
import DIY4Rent.Grupo0734.DIY4Rent.service.ImageService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.PutMapping;

@RequiredArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class HerramientaController {

    @Autowired
    private HerramientaService herramientaService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ImageService imageService;

    @GetMapping("/api/v1/herramientas/{id}")
    public ResponseEntity<HerramientaDto> getHerramientaById(@PathVariable Long id) {
        HerramientaDto herramientaData = herramientaService.getHerramientaById(id);
        if (herramientaData != null) {
            return new ResponseEntity<>(herramientaData, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/api/v1/users/{usuarioId}/herramientas")
    public ResponseEntity<List<HerramientaDto>> getAllHerramientasByUsuarioId(
            @PathVariable(value = "usuarioId") Long usuarioId) {

        if (!usuarioRepository.existsById(usuarioId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<HerramientaDto> herramientaList = herramientaService.getAllHerramientasByUsuarioId(usuarioId);
        if (herramientaList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(herramientaList, HttpStatus.OK);
    }

    @PostMapping("/api/v1/users/{usuarioId}/herramientas")
    public ResponseEntity<HerramientaDto> createHerramienta(@PathVariable(value = "usuarioId") Long usuarioId,
            @RequestBody HerramientaDto herramientaDto) {

        HerramientaDto newHerramienta = herramientaService.createHerramienta(herramientaDto, usuarioId);

        return new ResponseEntity<>(newHerramienta, HttpStatus.CREATED);
    }

    @PutMapping("/api/v1/herramientas/{id}")
    public ResponseEntity<HerramientaDto> updateHerramientaById(@PathVariable Long id,
            @RequestBody HerramientaDto herramientaDto) {
        HerramientaDto updatedHerramientaData = herramientaService.updateHerramientaById(id, herramientaDto);
        if (updatedHerramientaData != null) {
            return new ResponseEntity<>(updatedHerramientaData, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/api/v1/herramientas/{id}")
    public ResponseEntity<HttpStatus> deleteHerramienta(@PathVariable Long id) throws IOException {
        if (herramientaService.deleteHerramienta(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/api/v1/herramientas")
    public ResponseEntity<List<HerramientaDto>> getAllHerramientas() {
        List<HerramientaDto> herramientaList = herramientaService.getAllHerramientas();
        if (herramientaList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(herramientaList, HttpStatus.OK);
    }


    @PostMapping(value = "/api/v1/herramientas/{id}/foto", consumes = "multipart/form-data")
    public ResponseEntity<HttpStatus> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {
        String uploadDirectory = "src/main/resources/static/images";
        String imagesString = "";

        imagesString = imageService.saveImageToStorage(uploadDirectory, file, id);
        
        herramientaService.uploadImage(id, imagesString);
        return new ResponseEntity<>(HttpStatus.CREATED);
        
    }
    @GetMapping(value = "/api/v1/herramientas/{id}/foto", produces = "image/png")
    public @ResponseBody byte[] getImages(@PathVariable Long id) throws IOException {
        return getClass().getResourceAsStream("/static/images/"+herramientaService.getHerramientaById(id).getFoto()).readAllBytes();
    }

}
