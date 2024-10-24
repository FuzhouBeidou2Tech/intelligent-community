package com.example.intelligentcommunity.framework.handle;

import com.corundumstudio.socketio.SocketIOServer;
import com.example.intelligentcommunity.common.utils.SocketUtil;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SocketHandler {
    @Autowired
    private SocketIOServer socketIoServer;


    /**
     *  容器销毁前，自动调用此方法，关闭 socketIo 服务端
     *
     * @Param []
     * @return
     **/
    @PreDestroy
    private void destroy(){
        try {
            log.debug("关闭 socket 服务端");
            socketIoServer.stop();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @PostConstruct
    public void init() {
        log.debug("SocketEventListener initialized");

        //添加监听，客户端自动连接到 socket 服务端
        socketIoServer.addConnectListener(client -> {
            String userId = client.getHandshakeData().getSingleUrlParam("userId");
            SocketUtil.connectMap.put(userId, client);
            log.debug("客户端userId: "+ userId+ "已连接，客户端ID为：" + client.getSessionId());
        });

        //添加监听，客户端跟 socket 服务端自动断开
        socketIoServer.addDisconnectListener(client -> {
            String userId = client.getHandshakeData().getSingleUrlParam("userId");
            SocketUtil.connectMap.remove(userId, client);
            log.debug("客户端userId:" + userId + "断开连接，客户端ID为：" + client.getSessionId());
        });
    }
}
