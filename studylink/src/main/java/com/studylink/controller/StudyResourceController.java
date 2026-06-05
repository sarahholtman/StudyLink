package com.studylink.controller;

import com.studylink.model.StudyResource;
import com.studylink.service.StudyResourceService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "*")
public class StudyResourceController {

    private final StudyResourceService studyResourceService;

    public StudyResourceController(StudyResourceService studyResourceService) {
        this.studyResourceService = studyResourceService;
    }

    @PostMapping
    public StudyResource shareResource(@RequestBody StudyResource resource) {
        return studyResourceService.shareResource(resource);
    }

    @GetMapping("/group/{groupId}")
    public List<StudyResource> getResourcesByGroup(@PathVariable Long groupId) {
        return studyResourceService.getResourcesByGroup(groupId);
    }
}
