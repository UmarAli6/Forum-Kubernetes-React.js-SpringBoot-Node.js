package com.musu.user;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public record UserService(UserRepository userRepository) {

    public UserAccount registerUser(UserRegistrationRequest userRegistrationRequest) {
        UserAccount userAccount = UserAccount.builder()
                .name(userRegistrationRequest.name())
                .password(userRegistrationRequest.password()).build();
        return userRepository.save(userAccount);
    }

    public List<UserAccount> getUserAccounts(Integer id) {
        List<UserAccount> userAccounts = userRepository.findAllByIdIsNot(id);
        return userAccounts;
    }

    public UserAccount getUserAccountById(Integer id) {
        UserAccount userAccount = userRepository.getById(id);
        return userAccount;
    }

    public UserAccount loginUserAccount(String name, String password) {
        try {
            return userRepository.findUserAccountByNameAndPassword(name, password);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
