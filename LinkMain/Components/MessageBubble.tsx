// components/MessageBubble.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Message } from '../Utils/Types';
import { currentUserID } from '../Utils/values';

interface Props {
  message: Message;
}

const MessageBubble: React.FC<Props> = ({ message }) => {
  const isOwn = message.sender_id === currentUserID;

  return (
    <View style={[
      styles.container,
      isOwn ? styles.ownContainer : styles.otherContainer,
    ]}>
      {!isOwn && (
        <Image source={{ uri: message.sender_Pic }} style={styles.avatar} />
      )}

      <View style={[styles.bubble, isOwn ? styles.ownBubble : styles.otherBubble]}>
        {message.reply_to_message_id && message.replayed_Message && (
          <View style={styles.replyContainer}>
            <Text style={styles.replyText}>{message.replayed_Message}</Text>
          </View>
        )}
        <Text style={styles.messageText}>{message.content}</Text>

        {message.reactions.length > 0 && (
          <View style={styles.reactionsContainer}>
            {message.reactions.map((reaction, index) => (
              <Text key={index} style={styles.reactionEmoji}>
                {reaction.reaction_type === 'love' ? '❤️' :
                 reaction.reaction_type === 'like' ? '👍' :
                 reaction.reaction_type === 'laugh' ? '😂' :
                 reaction.reaction_type === 'angry' ? '😡' : '❓'}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginVertical: 5, alignItems: 'flex-end' },
  ownContainer: { justifyContent: 'flex-end', alignSelf: 'flex-end' },
  otherContainer: { justifyContent: 'flex-start', alignSelf: 'flex-start' },
  avatar: { width: 35, height: 35, borderRadius: 17.5, marginRight: 8 },
  bubble: { borderRadius: 12, padding: 10, maxWidth: '75%' },
  ownBubble: { backgroundColor: '#DCF8C6' },
  otherBubble: { backgroundColor: '#EEE' },
  messageText: { fontSize: 16 },
  replyContainer: { borderLeftWidth: 2, borderColor: '#888', paddingLeft: 6, marginBottom: 4 },
  replyText: { fontSize: 14, color: '#555', fontStyle: 'italic' },
  reactionsContainer: { flexDirection: 'row', marginTop: 5 },
  reactionEmoji: { marginRight: 4, fontSize: 16 },
});

export default MessageBubble;
