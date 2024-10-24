package com.example.intelligentcommunity.dao;



import jakarta.validation.constraints.*;
import lombok.Data;

//lombok  在编译阶段,为实体类自动生成setter  getter toString
// pom文件中引入依赖   在实体类上添加注解
@Data
public class User {
    @NotNull
    private Integer id;//主键ID
    private String username;//用户名
//    @JsonIgnore//让springmvc把当前对象转换成json字符串的时候,忽略password,最终的json字符串中就没有password这个属性了
//    private String password;//密码

    @NotEmpty
    @Pattern(regexp = "^\\d{11}$") // 校验规则修改为11位数字
    private String phoneNumber;  // 字段名称修改为 phoneNumber


    private  Byte gender; // gender 字段，限制为只能是 0 或 1

    @NotEmpty
    private  Byte userstatus;

    private  Integer userHousingId;


}
