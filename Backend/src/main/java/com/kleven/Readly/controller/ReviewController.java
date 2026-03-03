package com.kleven.Readly.controller;

import com.kleven.Readly.model.Review;
import com.kleven.Readly.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/book/{bookId}")
    public ResponseEntity<Review> addReview(@PathVariable Long bookId, @RequestBody Review review) {
        Review savedReview = reviewService.addReviewToBook(bookId, review);
        return ResponseEntity.ok(savedReview);
    }

    @GetMapping("/book/{bookId}")
    public ResponseEntity<List<Review>> getReviewsByBook(@PathVariable Long bookId) {
        return ResponseEntity.ok(reviewService.getReviewsByBookId(bookId));
    }
}