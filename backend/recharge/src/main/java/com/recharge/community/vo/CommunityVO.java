package com.recharge.community.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityVO {
    private Long communityPostId;
    private String userId;
    private  String communityImagePath; //프론트 엔드 표시용 가상 URL
    private String communityImageName;
    private byte[] communityImageData;
    private String communityTitle;
    private String communityContent;
    private int communityLikeCount;
    private int communityViewCount;
    private Date createDate;

    private String userNickname;
    private String userRole;
}
