package com.kleven.Readly.repository;

import com.kleven.Readly.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // Busca ignorando maiúsculas e minúsculas para evitar duplicados como "and" vs "And"
    Optional<Book> findByTitleIgnoreCaseAndAuthorIgnoreCase(String title, String author);

    // Métodos para a busca interna (Arsenal)
    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByAuthorContainingIgnoreCase(String author);
}