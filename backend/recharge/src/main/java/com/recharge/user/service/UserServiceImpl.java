package com.recharge.user.service;

import com.recharge.user.dao.UserDAO;
import com.recharge.user.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public int insertUser(UserVO user) {

        //아이디 중복체크
        if(userDAO.checkUserId(user.getUserId()) > 0) {
            return -1;
        }

        //닉네임 중복체크
        if(userDAO.checkUserNickName(user.getUserNickname()) > 0) {
            return -2;
        }

        user.setUserPwd(passwordEncoder.encode(user.getUserPwd()));

        user.setUserRole("USER");

        return userDAO.insertUser(user);
    }

    @Override
    public boolean checkUserId(String userId) {
        return userDAO.checkUserId(userId) > 0;
    }

    @Override
    public boolean checkUserNickname(String userNickname) {
        return userDAO.checkUserNickName(userNickname) > 0;
    }
}
