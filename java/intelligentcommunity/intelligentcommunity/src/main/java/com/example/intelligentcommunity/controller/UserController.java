package com.example.intelligentcommunity.controller;

import com.example.intelligentcommunity.common.WxMappingJackson2HttpMessageConverter;
import com.example.intelligentcommunity.dao.*;
import com.example.intelligentcommunity.service.CommunitiesService;
import com.example.intelligentcommunity.service.FriendshipService;
import com.example.intelligentcommunity.utils.AliOssUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.example.intelligentcommunity.service.UserService;


import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.AlgorithmParameters;
import java.security.Security;
import java.util.*;

@RestController
@RequestMapping("/user")
@Validated
public class UserController {

    @Value("${wechat.appid}")
    private String appId;

    @Value("${wechat.secret}")
    private String appSecret;
    @Autowired
    private UserService userService;

    @Autowired
    private CommunitiesService communitiesService;

    static {
        Security.addProvider(new BouncyCastleProvider());
    }


    @PostMapping("/login")
    public Result<Map<String, Object>> login(@RequestBody WeChatRequest weChatRequest) throws JsonProcessingException {

        String code = weChatRequest.getCode();
        String encryptedData = weChatRequest.getEncryptedData();
        String iv = weChatRequest.getIv();
        boolean newuserif=false;//判断是否新用户
        System.out.println(code);
        System.out.println(encryptedData);
        System.out.println(iv);
        // 1. 用 code 换取 session_key 和 openid
        String sessionKey = getSessionKey(code);

        // 2. 解密 encryptedData
        String decryptedData = decrypt(encryptedData, sessionKey, iv);
        System.out.println("打印信息");
        System.out.println(decryptedData);
        System.out.println(sessionKey);
        //3.判断用户有没有注册
        //使用 Jackson 解析 JSON 字符串
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(decryptedData);
        String phoneNumberStr = jsonNode.get("phoneNumber").asText();
        long phoneNumber = Long.parseLong(phoneNumberStr);
        System.out.println("解密出的手机号: " + phoneNumber);

        if(userService.findByPhoneNumber((phoneNumber))==null){
            //未注册用户
            //注册  默认用户名=手机号  ，默认添加管理员好友   设置用户默认头像
            userService.register("User",phoneNumber);

            newuserif=true;
//            https://intelligent-community627.oss-cn-fuzhou.aliyuncs.com/%E7%94%A8%E6%88%B7%2C%E5%A4%B4%E5%83%8F.png
            //设置用户默认头像


        }else{
            //注册过的用户


        }
        User user=userService.findByUserinfo(phoneNumber);
        //判断用户有没有填写地址
        Integer userHousingId = user.getUserHousingId();
        UserHousing userHousing = null;
        if (userHousingId != null) {
            userHousing = communitiesService.findcommunityid(userHousingId);
        }


        // 4. 返回解密后的信息和 session_key
        Map<String, Object> response = new HashMap<>();
        response.put("session_key", sessionKey); // 将 session_key 返回给前端
        response.put("decryptedData", decryptedData); // 解密后的数据，比如手机号
        response.put("user_name", user.getUsername());
        response.put("user_status", user.getUserstatus());
        response.put("user_gender", user.getGender());
        response.put("user_newuserif", newuserif);
        response.put("user_id", user.getId());
        response.put("user_image",user.getUserimage());
        if(userHousing!=null){
            Community community = communitiesService.findcommunityinfo(userHousing.getCommunityId());
            Building building=communitiesService.findbuildinfo(userHousing.getBuildingId());
            Room room=communitiesService.findroominfo(userHousing.getRoomId());
            response.put("community_id", community.getId());
            response.put("community_name",community.getName());
            response.put("community_address",community.getAddress());
            response.put("building_name",building.getName());
            response.put("room_name",room.getRoomNumber());
        }

        //response.put("userInfo", parseUserInfo(decryptedData)); // 解析用户信息，可以根据需求修改
        return Result.success(response); // 返回封装的结果
    }
    @PutMapping("/update")
    public ResponseEntity<String> Update(@RequestBody SetUserinfo user) throws JsonProcessingException {
        System.out.println("进入update");
        String username = user.getUsername();
        int gender = user.getGender();
        long phoneNumber = user.getPhoneNumber();
        String userimage=user.getUserimage();
        try {
            userService.update(username,(byte)gender,phoneNumber,userimage);
            return ResponseEntity.ok("用户信息更新成功");
        }catch (Exception e)   {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("用户信息更新失败");
        }
    }

    @GetMapping("/search")
    public List<User> searchUser(@RequestParam String value){
        return userService.searchUser(value);
    }

    @PostMapping("/inserimage")
    public Result<String> uploadImage(@RequestParam("file") MultipartFile file) throws Exception {
        System.out.println("进去");
        String originalFilename = file.getOriginalFilename();
        String filename = UUID.randomUUID().toString() + originalFilename.substring(originalFilename.lastIndexOf("."));
        String url = AliOssUtil.uploadFile(filename, file.getInputStream());
        // 假设简单返回文件地址
        return Result.success(url);
    }

    //利用 Spring 的 RestTemplate 类向微信 API 发送 GET 请求获取 session_key
    private String getSessionKey(String code) {
        String url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appId + "&secret=" + appSecret + "&js_code=" + code + "&grant_type=authorization_code";
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters().add(new WxMappingJackson2HttpMessageConverter());
        Map<String, String> response = restTemplate.getForObject(url, Map.class);
        return response.get("session_key");
    }
    //使用 AES 算法解密微信小程序中返回的加密数据（encryptedData）
    private String decrypt(String encryptedData, String sessionKey, String iv) {
        try {
            byte[] dataByte = Base64.getDecoder().decode(encryptedData);
            byte[] keyByte = Base64.getDecoder().decode(sessionKey);
            byte[] ivByte = Base64.getDecoder().decode(iv);
            int base = 16;
            if (keyByte.length % base != 0) {
                int groups = keyByte.length / base + (keyByte.length % base != 0 ? 1 : 0);
                byte[] temp = new byte[groups * base];
                System.arraycopy(keyByte, 0, temp, 0, keyByte.length);
                keyByte = temp;
            }
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS7Padding");
            SecretKeySpec spec = new SecretKeySpec(keyByte, "AES");
            AlgorithmParameters parameters = AlgorithmParameters.getInstance("AES");
            parameters.init(new IvParameterSpec(ivByte));
            cipher.init(Cipher.DECRYPT_MODE, spec, parameters);
            byte[] resultByte = cipher.doFinal(dataByte);
            if (resultByte != null && resultByte.length > 0) {
                return new String(resultByte, "UTF-8");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
