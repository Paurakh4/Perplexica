import { pgTable, text, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const messages = pgTable('messages', {
  id: integer('id').primaryKey(),
  content: text('content').notNull(),
  chatId: text('chat_id').notNull(),
  messageId: text('message_id').notNull(),
  role: text('type', { enum: ['assistant', 'user'] }),
  metadata: jsonb('metadata'),
});

interface File {
  name: string;
  fileId: string;
}

export const chats = pgTable('chats', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  focusMode: text('focus_mode').notNull(),
  files: jsonb('files').default('[]').$type<File[]>(),
});
