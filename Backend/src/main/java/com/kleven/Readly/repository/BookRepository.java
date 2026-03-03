package com.kleven.Readly.repository;

import com.kleven.Readly.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // Verifica se já existe um livro com esse título e autor exatos
    Optional<Book> findByTitleAndAuthor(String title, String author);
}