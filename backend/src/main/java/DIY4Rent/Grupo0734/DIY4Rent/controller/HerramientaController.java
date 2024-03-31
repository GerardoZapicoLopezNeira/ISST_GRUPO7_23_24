package DIY4Rent.Grupo0734.DIY4Rent.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import DIY4Rent.Grupo0734.DIY4Rent.model.Herramienta;
import DIY4Rent.Grupo0734.DIY4Rent.service.HerramientaService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/v1/herramientas")
@CrossOrigin("*")
public class HerramientaController {

    @Autowired
    private HerramientaService herramientaService;

    @GetMapping
    public ResponseEntity<List<Herramienta>> getAllHerramientas() {
        List<Herramienta> herramientaList = herramientaService.getAllHerramientas();
        if (herramientaList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(herramientaList, HttpStatus.OK);
    }

    @GetMapping("/getHerramientaById/{id}")
    public ResponseEntity<Herramienta> getHerramientaById(@PathVariable Long id) {
        Herramienta herramientaData = herramientaService.getHerramientaById(id);
        if (herramientaData != null) {
            return new ResponseEntity<>(herramientaData, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/addHerramienta")
    public ResponseEntity<Herramienta> addHerramienta(@RequestBody Herramienta herramienta) {
        Herramienta newHerramienta = herramientaService.addHerramienta(herramienta);
        return new ResponseEntity<>(newHerramienta, HttpStatus.OK);
    }

    @PostMapping("/updateHerramientaById/{id}")
    public ResponseEntity<Herramienta> updateHerramientaById(@PathVariable Long id, @RequestBody Herramienta newHerramientaData) {
        Herramienta updatedHerramientaData = herramientaService.updateHerramientaById(id, newHerramientaData);
        if (updatedHerramientaData != null) {
            return new ResponseEntity<>(updatedHerramientaData, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/deleteHerramientaById/{id}")
    public ResponseEntity<HttpStatus> deleteHerramientaById(@PathVariable Long id) {
        herramientaService.deleteHerramientaById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    

}
