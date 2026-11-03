package timecapsule.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import timecapsule.model.Capsule;
import timecapsule.repository.CapsuleRepository;

@RestController
@RequestMapping("/api/capsules")
public class CapsuleController {

    private final CapsuleRepository capsuleRepository;

    public CapsuleController(CapsuleRepository capsuleRepository) {
        this.capsuleRepository = capsuleRepository;
    }

    @PostMapping
    public Capsule createCapsule(@RequestBody Capsule capsule) {
        capsule.setCreatedAt(java.time.LocalDateTime.now());

        return capsuleRepository.save(capsule);
    }
}