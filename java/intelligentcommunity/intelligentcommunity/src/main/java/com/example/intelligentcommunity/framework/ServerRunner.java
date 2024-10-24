package com.example.intelligentcommunity.framework;

import com.corundumstudio.socketio.SocketIOServer;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@AllArgsConstructor
public class ServerRunner implements CommandLineRunner {

    private final SocketIOServer socketIOServer;
    /**
     *  项目启动时，自动启动 socket 服务，服务端开始工作
     *
     * @Param [args]
     * @return
     **/
    @Override
    public void run(String... args)  {
        socketIOServer.start();
        System.out.println("启动成功");
    }


}
