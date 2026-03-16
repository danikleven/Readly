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

                    if (title.toLowerCase().contains(cleanTitle.toLowerCase()) &&
                            author.toLowerCase().contains(cleanAuthor.toLowerCase())) {

                        Book book = new Book();
                        book.setTitle(capitalize(title));
                        book.setAuthor(capitalize(author));
                        String category = item.path("genres").has(0) ? item.path("genres").get(0).asText() : "N/A";
                        book.setCategory(capitalize(category));
                        String desc = item.path("description").asText("No description available.");
                        book.setDescription(formatDescription(desc));
                        String imgUrl = item.path("artworkUrl100").asText("");
                        book.setImageUrl(imgUrl.replace("100x100bb.jpg", "600x600bb.jpg"));
                        book.setAverageRating(item.path("averageUserRating").asDouble(0.0));
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

    public List<Book> searchInternal(String query) {
        if (query == null || query.trim().isEmpty()) {
            return bookRepository.findAll();
        }

        String cleanQuery = query.trim();
        List<Book> byTitle = bookRepository.findByTitleContainingIgnoreCase(cleanQuery);
        List<Book> byAuthor = bookRepository.findByAuthorContainingIgnoreCase(cleanQuery);

        return Stream.concat(byTitle.stream(), byAuthor.stream())
                .distinct()
                .collect(Collectors.toList());
    }

    public Book saveBook(Book book) {
        // Padroniza antes de qualquer verificação
        String standardizedTitle = capitalize(book.getTitle());
        String standardizedAuthor = capitalize(book.getAuthor());

        // Busca duplicados usando o novo método IgnoreCase (Blindagem Total)
        Optional<Book> duplicate = bookRepository.findByTitleIgnoreCaseAndAuthorIgnoreCase(standardizedTitle, standardizedAuthor);

        if (duplicate.isPresent()) {
            throw new RuntimeException("THE BOOK '" + standardizedTitle + "' BY " + standardizedAuthor + " ALREADY EXISTS.");
        }

        book.setTitle(standardizedTitle);
        book.setAuthor(standardizedAuthor);
        book.setCategory(capitalize(book.getCategory()));
        book.setDescription(formatDescription(book.getDescription()));

        return bookRepository.save(book);
    }

    public Book updateBookTitle(Long id, String newTitle) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BOOK NOT FOUND WITH ID: " + id));

        book.setTitle(capitalize(newTitle));
        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("CANNOT DELETE. BOOK NOT FOUND WITH ID: " + id);
        }
        bookRepository.deleteById(id);
    }

    private String capitalize(String text) {
        if (text == null || text.isEmpty()) return text;
        return Stream.of(text.trim().split("\\s+"))
                .filter(word -> !word.isEmpty())
                .map(word -> word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase())
                .collect(Collectors.joining(" "));
    }

    private String formatDescription(String text) {
        if (text == null || text.isEmpty()) return text;
        String clean = text.replaceAll("<[^>]*>", "").trim();
        // Se estiver tudo em CAPS LOCK, corrige. Se não, respeita a formatação original.
        if (clean.equals(clean.toUpperCase()) && clean.length() > 1) {
            return clean.substring(0, 1).toUpperCase() + clean.substring(1).toLowerCase();
        }
        return clean;
    }
}