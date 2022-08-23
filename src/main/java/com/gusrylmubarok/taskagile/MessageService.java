package com.gusrylmubarok.taskagile;

public class MessageService {
    private MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void save(String text) {
        Message message = new Message();
        message.setText(text);
        this.messageRepository.saveMessage(message);
    }
}
