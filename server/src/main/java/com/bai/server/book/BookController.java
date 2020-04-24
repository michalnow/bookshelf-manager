package com.bai.server.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/book")
@CrossOrigin
public class    BookController {

    @Autowired
    BookService bookService;

    @CrossOrigin
    @PostMapping
    public ResponseEntity<?> createBook(@Valid @RequestBody Book book){

        bookService.saveOrUpdateCar(book);
        return new ResponseEntity<Book>(book, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Iterable<Book> getAllBooks(){
        return bookService.findAll();
    }

    @GetMapping("/titles")
    public Iterable<String> getAllTitles(){
        return bookService.findTitles();
    }
}
