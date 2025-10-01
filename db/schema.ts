import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// Speaker application table
export const speakerApplication = pgTable("speaker_application", {
  id: text("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  submissionDate: timestamp("submission_date").notNull(),
  topic: text("topic").notNull(), // Using ideaPresentation as topic
  mobilePhone: text("mobile_phone").notNull(),
  wechatId: text("wechat_id").notNull(),
  gender: text("gender"), // Made optional since we're not collecting this anymore
  job: text("job").notNull(),
  rehearsalAvailability: text("rehearsal_availability").notNull(),
  availableInBeijing: text("available_in_beijing"), // Made optional since we're using rehearsalAvailability instead
  priorTedTalk: text("prior_ted_talk").notNull(),
  commonBelief: text("common_belief").notNull(),
  coreIdea: text("core_idea").notNull(),
  personalInsight: text("personal_insight").notNull(),
  potentialImpact: text("potential_impact").notNull(),
  remarks: text("remarks"),
  websiteUrl: text("website_url"),
  status: text("status").notNull().default("under_review"),
  flagged: boolean("flagged").notNull().default(false),
  notes: text("notes").default(""),
  rating: integer("rating").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Speaker nomination table
export const speakerNomination = pgTable("speaker_nomination", {
  id: text("id").primaryKey(),
  fullName: text("full_name").notNull(),
  submissionDate: timestamp("submission_date").notNull(),
  contact: text("contact").notNull(),
  nominatedBy: text("nominated_by").notNull(), // This will be from the form submitter
  priorTedTalk: text("prior_ted_talk").notNull(),
  remarks: text("remarks").notNull(),
  websiteUrl: text("website_url"),
  topic: text("topic").notNull(), // Generated from remarks
  status: text("status").notNull().default("under_review"),
  flagged: boolean("flagged").notNull().default(false),
  notes: text("notes").default(""),
  rating: integer("rating").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const schema = {
  user,
  session,
  account,
  verification,
  speakerApplication,
  speakerNomination,
};
