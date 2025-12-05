package com.recharge.user.controller;

import com.recharge.user.service.UserService;
import com.recharge.user.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    //아이디 중복체크
    @GetMapping("/check-id")
    public ResponseEntity<Boolean> checkUserId(@RequestParam String userId) {
        boolean exists = userService.checkUserId(userId);
        return ResponseEntity.ok(exists);
    }

    //닉네임 중복체크
    @GetMapping("/check-nickname")
    public ResponseEntity<Boolean> checkUserNickname(@RequestParam String userNickname) {
        boolean exists = userService.checkUserNickname(userNickname);
        return ResponseEntity.ok(exists);
    }

    //회원가입
    @PostMapping("/signup")
    public ResponseEntity<String> signup (@RequestBody UserVO user) {

        if(userService.checkUserId(user.getUserId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용중인 아이디입니다.");
        }

        if(userService.checkUserNickname(user.getUserNickname())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용중인 닉네임입니다.");
        }

        int result = userService.insertUser(user);
        if (result > 0) {
            return ResponseEntity.ok("회원가입 성공");
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 실패");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody UserVO user) {
        try {
            UserVO result = userService.login(user);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}