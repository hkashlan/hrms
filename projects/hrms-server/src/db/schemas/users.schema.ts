import { boolean, date, integer, pgEnum, pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const genderEnum = pgEnum('gender', ['male', 'female']);

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  age: integer(),
  username: varchar('username', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  lastName: varchar('lastName', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  married: boolean().default(false),
  birthDate: date('birth_date'),
  gender: genderEnum().default('male'),
});
