package com.recharge.follow.service;

import com.recharge.follow.dao.FollowDAO;
import com.recharge.follow.vo.FollowVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowServiceImpl implements FollowService{

    @Autowired
    private FollowDAO followDAO;

    @Override
    public int insertFollow(FollowVO vo) {
        if(followDAO.countFollow(vo) > 0) {
            return 0;
        }

        return followDAO.insertFollow(vo);
    }

    @Override
    public int deleteFollow(FollowVO vo) {
        return followDAO.deleteFollow(vo);
    }

    @Override
    public boolean isFollowing(FollowVO vo) {
        return followDAO.countFollow(vo) > 0;
    }

    @Override
    public List<FollowVO> getFollowingList(String followerId){
        return followDAO.getFollowingList(followerId);
    }

    @Override
    public List<FollowVO> getFollowerList(String followingId) {
        return followDAO.getFollowerList(followingId);
    }
}
