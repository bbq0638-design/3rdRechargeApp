package com.recharge.music.dao;

import com.recharge.music.vo.MusicListVO;
import com.recharge.music.vo.MusicPostVO;

import java.util.List;

public interface MusicPostDAO {

    int insertMusicPost(MusicPostVO vo);

    int insertMusicList(MusicListVO vo);

    List<MusicPostVO> selectAllPosts();

    MusicPostVO selectMusicPostDetail(Long musicPostId);

    List<MusicListVO> selectMusicListsByPost(Long musicPostId);
}
