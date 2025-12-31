package com.example.householdmanagement.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.householdmanagement.dto.LoaiPhiDTO;
import com.example.householdmanagement.service.LoaiPhiService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/loai-phi")
@CrossOrigin
public class LoaiPhiController {

    @Autowired
    private LoaiPhiService loaiPhiService;

    // CRUD cơ bản
    @GetMapping
    public ResponseEntity<List<LoaiPhiDTO>> getAllLoaiPhi() {
        List<LoaiPhiDTO> loaiPhiList = loaiPhiService.getAllLoaiPhi();
        return ResponseEntity.ok(loaiPhiList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoaiPhiDTO> getLoaiPhiById(@PathVariable Long id) {
        Optional<LoaiPhiDTO> loaiPhi = loaiPhiService.getLoaiPhiById(id);
        return loaiPhi.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<LoaiPhiDTO> createLoaiPhi(@Valid @RequestBody LoaiPhiDTO loaiPhiDTO) {
        try {
            LoaiPhiDTO createdLoaiPhi = loaiPhiService.createLoaiPhi(loaiPhiDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdLoaiPhi);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<LoaiPhiDTO> updateLoaiPhi(@PathVariable Long id, @Valid @RequestBody LoaiPhiDTO loaiPhiDTO) {
        try {
            LoaiPhiDTO updatedLoaiPhi = loaiPhiService.updateLoaiPhi(id, loaiPhiDTO);
            return ResponseEntity.ok(updatedLoaiPhi);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoaiPhi(@PathVariable Long id) {
        try {
            loaiPhiService.deleteLoaiPhi(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
