export const getCoverUrl = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

export const booksMock = [
  // TOP 10 (Mais votados)
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "9780743273565", rating: 5.0, addedDate: "2026-01-05" },
  { id: 2, title: "1984", author: "George Orwell", isbn: "9780451524935", rating: 4.9, addedDate: "2026-01-10" },
  { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780547928227", rating: 4.8, addedDate: "2026-01-12" },
  { id: 4, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", isbn: "9780545010221", rating: 4.7, addedDate: "2026-01-15" },
  { id: 5, title: "Pride and Prejudice", author: "Jane Austen", isbn: "9780141439518", rating: 4.6, addedDate: "2026-01-18" },
  { id: 6, title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "9780316769488", rating: 4.5, addedDate: "2026-01-20" },
  { id: 7, title: "Brave New World", author: "Aldous Huxley", isbn: "9780060850524", rating: 4.4, addedDate: "2026-01-22" },
  { id: 8, title: "The Martian", author: "Andy Weir", isbn: "9780553418026", rating: 4.7, addedDate: "2026-01-25" },
  { id: 9, title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780060935467", rating: 4.2, addedDate: "2026-01-28" },
  { id: 10, title: "The Alchemist", author: "Paulo Coelho", isbn: "9780062315007", rating: 4.1, addedDate: "2026-01-30" },

  // RECENTLY ADDED (Datas variadas em Fevereiro)
  { id: 11, title: "The Book Thief", author: "Markus Zusak", isbn: "9780375831003", rating: 4.0, addedDate: "2026-02-01" },
  { id: 12, title: "The Da Vinci Code", author: "Dan Brown", isbn: "9780307474278", rating: 3.9, addedDate: "2026-02-02" },
  { id: 13, title: "The Hunger Games", author: "Suzanne Collins", isbn: "9780439023481", rating: 4.5, addedDate: "2026-02-03" },
  { id: 14, title: "Dune", author: "Frank Herbert", isbn: "9780441172719", rating: 4.8, addedDate: "2026-02-04" },
  { id: 15, title: "Foundation", author: "Isaac Asimov", isbn: "9780553293357", rating: 4.7, addedDate: "2026-02-05" },
  { id: 16, title: "The Little Prince", author: "Antoine de Saint-Exupéry", isbn: "9780156012195", rating: 4.9, addedDate: "2026-02-06" },
  { id: 17, title: "Animal Farm", author: "George Orwell", isbn: "9780451526342", rating: 4.6, addedDate: "2026-02-07" },
  { id: 18, title: "The Shining", author: "Stephen King", isbn: "9780307743657", rating: 4.4, addedDate: "2026-02-08" },
  { id: 19, title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "9780066238500", rating: 4.5, addedDate: "2026-02-09" },
  { id: 20, title: "Frankenstein", author: "Mary Shelley", isbn: "9780141439471", rating: 4.2, addedDate: "2026-02-10" },
  { id: 21, title: "Dracula", author: "Bram Stoker", isbn: "9780141439846", rating: 4.1, addedDate: "2026-02-11" },
  
  // Alterado: Saiu duplicata de The Martian, entrou It Ends with Us
  { id: 22, title: "It Ends with Us", author: "Colleen Hoover", isbn: "9781501110368", rating: 4.5, addedDate: "2026-02-12" },
  
  { id: 23, title: "Project Hail Mary", author: "Andy Weir", isbn: "9780593135204", rating: 4.9, addedDate: "2026-02-13" },
  { id: 24, title: "Atomic Habits", author: "James Clear", isbn: "9780735211292", rating: 4.8, addedDate: "2026-02-14" },
  { id: 25, title: "The Silent Patient", author: "Alex Michaelides", isbn: "9781250301697", rating: 4.3, addedDate: "2026-02-15" },
  { id: 26, title: "Where the Crawdads Sing", author: "Delia Owens", isbn: "9780735219090", rating: 4.4, addedDate: "2026-02-16" },
  { id: 27, title: "Ready Player One", author: "Ernest Cline", isbn: "9780307887436", rating: 4.6, addedDate: "2026-02-17" },
  { id: 28, title: "Normal People", author: "Sally Rooney", isbn: "9781984822178", rating: 3.8, addedDate: "2026-02-18" },
  { id: 29, title: "Circe", author: "Madeline Miller", isbn: "9780316556347", rating: 4.5, addedDate: "2026-02-19" },
  { id: 30, title: "The Song of Achilles", author: "Madeline Miller", isbn: "9780062060624", rating: 4.6, addedDate: "2026-02-20" },
  { id: 31, title: "Sapiens", author: "Yuval Noah Harari", isbn: "9780062316097", rating: 4.7, addedDate: "2026-02-21" },
  { id: 32, title: "The Road", author: "Cormac McCarthy", isbn: "9780307387899", rating: 4.0, addedDate: "2026-02-21" },
  { id: 33, title: "Life of Pi", author: "Yann Martel", isbn: "9780156027328", rating: 4.1, addedDate: "2026-02-22" },
  { id: 34, title: "The Night Circus", author: "Erin Morgenstern", isbn: "9780307744432", rating: 4.3, addedDate: "2026-02-22" },
  { id: 35, title: "Slaughterhouse-Five", author: "Kurt Vonnegut", isbn: "9780385333849", rating: 4.4, addedDate: "2026-02-23" },
  { id: 36, title: "The Picture of Dorian Gray", author: "Oscar Wilde", isbn: "9780141439570", rating: 4.5, addedDate: "2026-02-23" },
  { id: 37, title: "Wuthering Heights", author: "Emily Brontë", isbn: "9780141439556", rating: 4.2, addedDate: "2026-02-24" },
  { id: 38, title: "Crime and Punishment", author: "Fyodor Dostoevsky", isbn: "9780140449136", rating: 4.7, addedDate: "2026-02-24" },
  { id: 39, title: "The Odyssey", author: "Homer", isbn: "9780140268867", rating: 4.6, addedDate: "2026-02-25" },
  { id: 40, title: "A Game of Thrones", author: "George R.R. Martin", isbn: "9780553103540", rating: 4.8, addedDate: "2026-02-25" },
  { id: 41, title: "The Handmaid's Tale", author: "Margaret Atwood", isbn: "9780771008795", rating: 4.6, addedDate: "2026-02-25" },
  { id: 42, title: "The Lord of the Rings", author: "J.R.R. Tolkien", isbn: "9780618640157", rating: 4.9, addedDate: "2026-02-25" },
  { id: 43, title: "The Shadow of the Wind", author: "Carlos Ruiz Zafón", isbn: "9780143034902", rating: 4.8, addedDate: "2026-02-25" },
  
  // Alterado: Saiu duplicata de Project Hail Mary, entrou Fourth Wing
  { id: 44, title: "Fourth Wing", author: "Rebecca Yarros", isbn: "9781649374042", rating: 4.8, addedDate: "2026-02-24" },
  
  { id: 45, title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", isbn: "9780593321201", rating: 4.5, addedDate: "2026-02-23" },
  { id: 46, title: "Lessons in Chemistry", author: "Bonnie Garmus", isbn: "9780385547345", rating: 4.6, addedDate: "2026-02-22" },
];