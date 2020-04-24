package com.bai.server.book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Lob
    @Column(name="description", length=10000)
    private String description;
    private String author;
    private int pages;
    private String poster;
    private String genre;
}
