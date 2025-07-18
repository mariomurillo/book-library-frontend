import { z } from "zod";

export const bookSchema = z.object({
  isbn: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  publicationYear: z.number().min(1, "Publication year is required"),
});

export const createBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  publicationYear: z.number().min(1, "Publication year is required"),
});

export type Book = z.infer<typeof bookSchema>;