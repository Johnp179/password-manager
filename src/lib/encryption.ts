import env from "@/lib/parse-env";
import { scryptSync } from "crypto";

// const { scryptSync } = require("crypto");
export const algorithm = "aes-192-cbc";
export const key = scryptSync(env.ENCRYPTION_KEY_BASE, env.SALT, 24); //key
export const iv = scryptSync(env.IVBASE, env.SALT, 16); // Initialization vector.
