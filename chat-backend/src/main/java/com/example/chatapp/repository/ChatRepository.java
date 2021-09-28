package com.example.chatapp.repository;

import com.example.chatapp.domain.Chat;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;

public interface ChatRepository extends ReactiveMongoRepository<Chat, String> {

    @Tailable   // 커서를 안닫고 계속 유지
    @Query("{ roomNum : ?0 }")
    Flux<Chat> mFindByRoomNum(Integer roomNum);   // Flux : response를 유지하면서 데이터를 계속 흘려보낼 수 있음
}
