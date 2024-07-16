package com.example.puzzle.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GameController {

    @GetMapping("/puzzlePage")
    public String showPuzzlePage() {
        return "puzzlePageView";
    }
}
