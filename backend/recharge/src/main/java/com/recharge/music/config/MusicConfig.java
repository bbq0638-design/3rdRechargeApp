package com.recharge.music.config;


import lombok.Getter;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
public class SpotifyConfig {

//    스포티파이 호출 기본 url
    private final String BASE_URL = "https://api.spotify.com/v1";
// 스포티파이 한국 인기차트, 차트 id는 외부 노출 가능
    private final String KOREA_TOP50_PLAYLIST_ID = "37i9dQZEVXbJZGQDXfMQ7V";
//    스포티파이 글로벌 인기차트
    private final String GLOBAL_TOP50_PLAYLIST_ID = "37i9dQZEVXbMDoHDwVN2tF";
//    스포티파이 팝송 인기차트(가끔 한국 노래도 섞였음)
    private final String TODAY_TOP_HITS_PLAYLIST_ID = "37i9dQZF1DXcBWIGoYBM5M";

//    스포티파이 TOKEN 유효시간
    private final int TOKEN_EXPIRE_SECONDS = 3600;
//    itunes search api 호출
    private final String ITUNES_SEARCH_URL = "https://itunes.apple.com/search";

//    itunes 한국 기준 검색
    private final String ITUNES_COUNTRY_CODE = "KR";
    
}
