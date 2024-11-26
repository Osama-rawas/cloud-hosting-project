import { z } from "zod";
export const creatArticleSchema = z.object({
  title: z
    .string({
      required_error: "title is require", //.optional()
      invalid_type_error: "title must be string",
    })
    .min(2, { message: "title should be at least 2 characters long" })
    .max(200, { message: "title should be at less than 200 characters long" }),
  description: z
    .string({
      required_error: "description is require",
      invalid_type_error: "description must be string",
    })
    .min(10, { message: "description should be at least 2 characters long" }),
});
export const registerSchema = z.object({
  userName: z
    .string({
      required_error: "userName is require",
      invalid_type_error: "userName must be string",
    })
    .min(2, { message: "userName should be at least 2 characters long" })
    .max(30),
  email: z
    .string({
      required_error: "email is require",
      invalid_type_error: "email must be string",
    })
    .min(8, { message: "email should be at least 8 characters long" })
    .max(40)
    .email(),
  password: z
    .string({
      required_error: "password is require",
      invalid_type_error: "password must be string",
    })
    .min(8, { message: "password should be at least 8 characters long" }),
});
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "email is require",
      invalid_type_error: "email must be string",
    })
    .min(8, { message: "email should be at least 8 characters long" })
    .max(40)
    .email(),
  password: z
    .string({
      required_error: "password is require",
      invalid_type_error: "password must be string",
    })
    .min(8, { message: "password should be at least 8 characters long" }),
});
//create comment
export const createCommentSchema = z.object({
  text: z.string().min(2).max(500),
  articleId: z.number(),
});
// update user schema
export const updateUserSchema = z.object({
  userName: z
    .string({
      required_error: "userName is require",
      invalid_type_error: "userName must be string",
    })
    .min(2, { message: "userName should be at least 2 characters long" })
    .max(30)
    .optional(),
  email: z
    .string({
      required_error: "email is require",
      invalid_type_error: "email must be string",
    })
    .min(8, { message: "email should be at least 8 characters long" })
    .max(40)
    .email()
    .optional(),
  password: z
    .string({
      required_error: "password is require",
      invalid_type_error: "password must be string",
    })
    .min(8, { message: "password should be at least 8 characters long" })
    .optional(),
});
