package com.recharge.movie.client;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class TmdbClientImpl implements TmdbClient{

    private final WebClient tmdbWebClient

}
