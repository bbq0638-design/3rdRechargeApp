package com.recharge.user.dao;

import com.recharge.user.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDAO {
    int insertUser(UserVO user);

    int checkUserId(String userId);

    int checkUserNickName(String userNickname);
}
