package com.example.intelligentcommunity.config;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.SpringAnnotationScanner;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class SocketConfig {
    @Value("${socketio.host}")
    private String host;

    @Value("${socketio.port}")
    private Integer port;

    @Value("${socketio.bossCount}")
    private int bossCount;

    @Value("${socketio.workCount}")
    private int workCount;

    @Value("${socketio.allowCustomRequests}")
    private boolean allowCustomRequests;

    @Value("${socketio.upgradeTimeout}")
    private int upgradeTimeout;

    @Value("${socketio.pingTimeout}")
    private int pingTimeout;

    @Value("${socketio.pingInterval}")
    private int pingInterval;

    @Bean
    public SocketIOServer socketIOServer() {
        com.corundumstudio.socketio.Configuration configuration = new com.corundumstudio.socketio.Configuration();
        configuration.setPort(port);
        com.corundumstudio.socketio.SocketConfig socketConfig=new com.corundumstudio.socketio.SocketConfig();
        socketConfig.setReuseAddress(true);
        configuration.setSocketConfig(socketConfig);
        configuration.setOrigin(null);
        configuration.setBossThreads(bossCount);
        configuration.setWorkerThreads(workCount);
        configuration.setAllowCustomRequests(allowCustomRequests);
        configuration.setUpgradeTimeout(upgradeTimeout);
        configuration.setPingTimeout(pingTimeout);
        configuration.setPingInterval(pingInterval);
        //设置 sessionId 随机
        configuration.setRandomSession(true);

//         configuration.setKeyStorePassword("pi0yo93pqgrs");
//         configuration.setKeyStore(this.getClass().getResourceAsStream("www.ibms.club.jks"));
//         configuration.setAuthorizationListener(data -> {
//             String token = data.getSingleUrlParam("token");
//             return StrUtil.isNotBlank(token);
//         });

        //初始化 Socket 服务端配置
        return new SocketIOServer(configuration);
    }

    /**
     *  Spring加载 SocketIOServer
     *
     * @Param [server]
     * @return
     **/
    @Bean
    public SpringAnnotationScanner springAnnotationScanner(SocketIOServer socketIOServer ) {
        return new SpringAnnotationScanner(socketIOServer );
    }
}
