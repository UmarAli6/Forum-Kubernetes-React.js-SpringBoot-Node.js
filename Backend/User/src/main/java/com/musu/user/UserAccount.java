package com.musu.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UserAccount {
    @Id
    @SequenceGenerator(
            name = "user_account_id_sequence",
            sequenceName = "user_account_id_sequence"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_account_id_sequence"
    )
    private Integer id;
    @Column(unique = true)
    private String name;
    private String password;
}
