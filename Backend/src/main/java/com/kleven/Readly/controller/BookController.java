package com.kleven.Readly.controller;

import com.kleven.Readly.model.Book;
import com.kleven.Readly.service.BookService;
import com.kleven.Readly.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;

    // Busca na Apple (Para adicionar livros)
    @GetMapping("/search")
    public ResponseEntity<List<Book>> search(
            @RequestParam String title,
            @RequestParam String author) {
        List<Book> results = bookService.searchBooks(title, author);
        return ResponseEntity.ok(results);
    }

    // Busca no seu Arsenal (Barra de pesquisa do site)
    @GetMapping("/my-library/search")
    public ResponseEntity<List<Book>> searchInternal(@RequestParam String query) {
        List<Book> results = bookService.searchInternal(query);
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

    @PatchMapping("/{id}/title")
    public ResponseEntity<Book> updateTitle(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String newTitle = body.get("title");
        return ResponseEntity.ok(bookService.updateBookTitle(id, newTitle));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}