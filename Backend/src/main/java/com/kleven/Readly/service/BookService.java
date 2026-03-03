package com.kleven.Readly.service;

import com.kleven.Readly.model.Book;
import com.kleven.Readly.repository.BookRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    private static final String APPLE_API_URL = "https://itunes.apple.com/search?entity=ebook&lang=en_us&term=";

    /**
     * Searches for books via Apple API with strict filtering and text normalization.
     */
    public List<Book> searchBooks(String titleQuery, String authorQuery) {
        String cleanTitle = (titleQuery != null) ? titleQuery.trim() : "";
        String cleanAuthor = (authorQuery != null) ? authorQuery.trim() : "";

        if (cleanTitle.isEmpty() || cleanAuthor.isEmpty()) {
            return new ArrayList<>();
        }

        RestTemplate restTemplate = new RestTemplate();
        String searchTerm = cleanTitle + " " + cleanAuthor;
        String url = APPLE_API_URL + searchTerm.replace(" ", "+");

        try {
            String response = restTemplate.getForObject(url, String.class);
            ObjectMapper mapper = new ObjectMapper();
            JsonNode results = mapper.readTree(response).path("results");

            List<Book> filteredBooks = new ArrayList<>();

            if (results.isArray()) {
                for (JsonNode item : results) {
                    String title = item.path("trackName").asText("");
                    String author = item.path("artistName").asText("");

                    // Logic to ensure the search result actually contains what the user typed
                    if (title.toLowerCase().contains(cleanTitle.toLowerCase()) &&
                            author.toLowerCase().contains(cleanAuthor.toLowerCase())) {

                        Book book = new Book();

                        // APPLY CAPITALIZATION TO FIELDS
                        book.setTitle(capitalize(title));
                        book.setAuthor(capitalize(author));

                        String category = item.path("genres").has(0) ? item.path("genres").get(0).asText() : "N/A";
                        book.setCategory(capitalize(category));

                        // FORMAT DESCRIPTION (NO FULL CAPS, NO HTML)
                        String desc = item.path("description").asText("No description available.");
                        book.setDescription(formatDescription(desc));

                        // IMAGE AND RATING
                        String imgUrl = item.path("artworkUrl100").asText("");
                        book.setImageUrl(imgUrl.replace("100x100bb.jpg", "600x600bb.jpg"));
                        book.setAverageRating(item.path("averageUserRating").asDouble(0.0));

                        // DATE NORMALIZATION (YYYY)
                        String fullDate = item.path("releaseDate").asText("");
                        book.setPublishedDate(fullDate.length() >= 4 ? fullDate.substring(0, 4) : "N/A");

                        filteredBooks.add(book);
                    }
                }
            }
            return filteredBooks;
        } catch (Exception e) {
            throw new RuntimeException("Error searching books: " + e.getMessage());
        }
    }

    /**
     * Saves a book only if it doesn't exist yet (Unique Title + Author).
     */
    public Book saveBook(Book book) {
        // 1. Standardize text before checking for duplicates
        String standardizedTitle = capitalize(book.getTitle());
        String standardizedAuthor = capitalize(book.getAuthor());

        // 2. Check if a book with the exact same Title and Author already exists
        Optional<Book> duplicate = bookRepository.findByTitleAndAuthor(standardizedTitle, standardizedAuthor);

        if (duplicate.isPresent()) {
            // Personalized message as requested
            throw new RuntimeException("THE BOOK '" + standardizedTitle + "' BY " + standardizedAuthor + " ALREADY EXISTS.");
        }

        // 3. Final normalization before database insertion
        book.setTitle(standardizedTitle);
        book.setAuthor(standardizedAuthor);
        book.setCategory(capitalize(book.getCategory()));
        book.setDescription(formatDescription(book.getDescription()));

        return bookRepository.save(book);
    }

    // --- HELPER METHODS FOR TEXT NORMALIZATION ---

    private String capitalize(String text) {
        if (text == null || text.isEmpty()) return text;
        return Stream.of(text.trim().split("\\s+"))
                .filter(word -> word.length() > 0)
                .map(word -> word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase())
                .collect(Collectors.joining(" "));
    }

    private String formatDescription(String text) {
        if (text == null || text.isEmpty()) return text;
        // Strip HTML tags
        String clean = text.replaceAll("<[^>]*>", "").trim();

        // If the entire text is in uppercase, convert it to sentence case
        if (clean.equals(clean.toUpperCase())) {
            return clean.substring(0, 1).toUpperCase() + clean.substring(1).toLowerCase();
        }
        return clean;
    }
}