package com.bai.server.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Iterable<Book> findAll() {
        return bookRepository.findAll();
    }

    public Iterable<String> findTitles(){
        List<String> titles = new ArrayList<>();
        Iterable<Book> books = findAll();

        books.forEach(book ->{titles.add(book.getTitle());});

        return titles;
    }

    public Book saveOrUpdateCar(Book book) {
        return bookRepository.save(book);

    }
}
