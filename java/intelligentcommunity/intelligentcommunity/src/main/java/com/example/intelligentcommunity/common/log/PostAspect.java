package com.example.intelligentcommunity.common.log;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class PostAspect {

    @Pointcut("execution(* com.example.intelligentcommunity.service.PostService.*(..)))")
    public void PostServiceMethods() {}
    @Before("PostServiceMethods()")
    public void before(JoinPoint joinPoint) {
        String name=joinPoint.getSignature().getName();
        System.out.println("************************************************************** AOP:"+name);

    }
}
