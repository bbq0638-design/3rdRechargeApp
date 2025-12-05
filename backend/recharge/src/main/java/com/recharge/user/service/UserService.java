package com.recharge.user.service;

import com.recharge.user.vo.UserVO;

public interface UserService {
    int insertUser(UserVO user);
    boolean checkUserId(String userId);
    boolean checkUserNickname(String userNickname);
    UserVO login(UserVO user);
}