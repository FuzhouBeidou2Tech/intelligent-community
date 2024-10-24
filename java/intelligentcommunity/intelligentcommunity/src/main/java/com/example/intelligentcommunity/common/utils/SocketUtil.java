package com.example.intelligentcommunity.common.utils;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.annotation.OnEvent;

import com.example.intelligentcommunity.common.constant.SocketEventContants;
import com.example.intelligentcommunity.mapper.MessageMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
@Component
@Slf4j
public class SocketUtil {
    @Autowired
    MessageMapper messageMapper;
    //暂且把用户&客户端信息存在缓存
    public static ConcurrentMap<String, SocketIOClient> connectMap = new ConcurrentHashMap<>();

    /**
     *  单发消息（以 userId 为标识符，给用户发送消息）
     *
     * @Param [userId, message]
     * @return
     **/
    public  void sendToOne(int userId, String message,int senderId) {
        //拿出某个客户端信息
        SocketIOClient socketClient = getSocketClient(String.valueOf(userId));

        //消息持久化存储
        messageMapper.insertMessage(senderId,userId,message);

        // 构建消息对象，包含 message 和 senderid
        Map<String, Object> data = new HashMap<>();
        data.put("message", message);
        data.put("senderid", senderId);

        if (Objects.nonNull(socketClient) ){
            //单独给他发消息
            socketClient.sendEvent(SocketEventContants.CHANNEL_USER,data);
        }else{
            //socketClient.sendEvent(SocketEventContants.CHANNEL_USER,data);
            log.info(userId + "已下线，发送消息对方可能未看见。");
        }
    }

    /**
     *  群发消息
     *
     * @Param
     * @return
     **/
    public static void sendToAll(Object message) {
        if (connectMap.isEmpty()){
            return;
        }
        //给在这个频道的每个客户端发消息
        for (Map.Entry<String, SocketIOClient> entry : connectMap.entrySet()) {
            entry.getValue().sendEvent(SocketEventContants.CHANNEL_SYSTEM, message);
        }
    }

    /**
     * 根据 userId 识别出 socket 客户端
     * @param userId
     * @return
     */
    public static SocketIOClient getSocketClient(String userId){
        SocketIOClient client = null;
        if (StringUtils.hasLength(userId) &&  !connectMap.isEmpty()){
            for (String key : connectMap.keySet()) {
                if (userId.equals(key)){
                    client = connectMap.get(key);
                }
            }
        }
        return client;
    }

    /**
     *  1）使用事件注解，服务端监听获取客户端消息；
     *  2）拿到客户端发过来的消息之后，可以再根据业务逻辑发送给想要得到这个消息的人；
     *  3）channel_system 会向全体客户端发消息；
     *
     * @Param message
     * @return
     **/
    @OnEvent(value = SocketEventContants.CHANNEL_SYSTEM)
    public void channelSystemListener(String message) {
        if (!StringUtils.hasLength(message)){
            return;
        }

        this.sendToAll(message);
    }

}
