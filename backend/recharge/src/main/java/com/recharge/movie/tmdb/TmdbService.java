package com.recharge.movie.client;

import com.recharge.movie.vo.MovieVO;

import java.util.List;
import java.util.Map;

public interface TmdbClient {
    
//    제목 기반 검색
    List<MovieVO> searchByTitle(String title);
//    파이썬 통합 검색
    List<MovieVO> discoverByStrategy(Map<String, Object> strategy);
//    ai 추천 결과 상세 페이지용
    MovieVO getMovieDetail(Long movieId);
}
