package com.kleven.Readly.service;

import com.kleven.Readly.model.Book;
import com.kleven.Readly.model.Review;
import com.kleven.Readly.repository.BookRepository;
import com.kleven.Readly.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private BookRepository bookRepository;

    public Review addReviewToBook(Long bookId, Review review) {
        // Busca o livro ou lança um erro se não existir
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + bookId));

        // Faz o vínculo (o "grampo" que conversamos)
        review.setBook(book);

        // Salva a avaliação
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByBookId(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        return book.getReviews();
    }
}