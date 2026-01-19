import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { userProfile } from "@/lib/db/schema";

/**
 * UserProfile returned from the database (SELECT)
 */
export type UserProfile = InferSelectModel<typeof userProfile>;

/**
 * Payload used when creating a user profile (INSERT)
 */
export type NewUserProfile = InferInsertModel<typeof userProfile>;
