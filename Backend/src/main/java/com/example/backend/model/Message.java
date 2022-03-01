package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private LocalDateTime dateTime;
    @Column
    private String content;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "sender_user_id", referencedColumnName = "id")
    private User sender;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "receiver_user_id", referencedColumnName = "id")
    private User receiver;

    public Message() {
    }

    public Message(String content) {
        this.dateTime = LocalDateTime.now();
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", dateTime=" + dateTime +
                ", content='" + content + '\'' +
                '}';
    }
}

