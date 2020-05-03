package com.bai.server.book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name= "book")
public class Book {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="title")
    private String title;
    @Lob
    @Column(name="description", length=10000)
    private String description;
    @Column(name="author")
    private String author;
    @Column(name="pages")
    private int pages;
    @Column(name="poster")
    private String poster;
    @Column(name="genre")
    private String genre;
}
