package com.kleven.Readly.controller;

import com.kleven.Readly.model.Book;
import com.kleven.Readly.service.BookService;
import com.kleven.Readly.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;

    @GetMapping("/search")
    public ResponseEntity<List<Book>> search(
            @RequestParam String title,
            @RequestParam String author) {

        List<Book> results = bookService.searchBooks(title, author);
        return ResponseEntity.ok(results);
    }

    @PostMapping("/save")
    public ResponseEntity<Book> save(@RequestBody Book book) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.saveBook(book));
    }

    @GetMapping("/library")
    public List<Book> getAll() {
        return bookRepository.findAll();
    }
}