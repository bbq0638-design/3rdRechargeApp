package com.recharge.user.service;

import com.recharge.config.JwtTokenProvider;
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

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    //회원가입
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

    //아이디 중복체크
    @Override
    public boolean checkUserId(String userId) {
        return userDAO.checkUserId(userId) > 0;
    }

    //닉네임 중복체크
    @Override
    public boolean checkUserNickname(String userNickname) {
        return userDAO.checkUserNickName(userNickname) > 0;
    }

    //로그인
    @Override
    public UserVO login(UserVO user) {
        UserVO dbUser = userDAO.getUserById(user.getUserId());

        if(dbUser == null) {
            throw new RuntimeException("존재하지 않는 아이디입니다.");
        }

        if(!passwordEncoder.matches(user.getUserPwd(), dbUser.getUserPwd())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        dbUser.setDeviceOs((user.getDeviceOs()));
        dbUser.setDeviceVersion(user.getDeviceVersion());
        dbUser.setFcmToken(user.getFcmToken());
        dbUser.setUpdatedId(dbUser.getUserId());

        userDAO.updateDeviceInfo(dbUser);

        String token = jwtTokenProvider.createToken(dbUser.getUserId(), dbUser.getUserRole());
        dbUser.setToken(token);

        dbUser.setUserPwd(null);

        return dbUser;
    }
}