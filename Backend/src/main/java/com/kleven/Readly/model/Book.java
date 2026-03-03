package com.kleven.Readly.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;

    @Column(length = 5000)
    private String description;

    private String imageUrl;
    private String category;
    private int pageCount;
    private String publishedDate;
    private double averageRating;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<Review> reviews;
}