package com.gusrylmubarok.taskagile.service;

import com.gusrylmubarok.taskagile.model.Message;
import com.gusrylmubarok.taskagile.respository.MessageRepository;
import com.gusrylmubarok.taskagile.security.SecurityCheck;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class MessageService {
    private MessageRepository repository;

    public MessageService(MessageRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<Message> getMessages() {
        return repository.getMessages();
    }

    @SecurityCheck
    @Transactional(noRollbackFor = { UnsupportedOperationException.class })
    public Message save(String text) {
        return repository.saveMessage(new Message(text));
    }
}
