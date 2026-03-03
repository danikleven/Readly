package com.kleven.Readly.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reviewerName;

    @Column(length = 1000)
    private String comment;

    private Double rating;

    private LocalDateTime createdAt;

    // Relacionamento: Muitas avaliações pertencem a UM livro
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}