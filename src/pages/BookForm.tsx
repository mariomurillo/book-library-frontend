import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createBook, getBook, updateBook } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bookSchema, createBookSchema, type Book } from "@/models/book";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BookForm = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: book, isLoading } = useQuery({
    queryKey: ["book", isbn],
    queryFn: () => getBook(isbn!),
    enabled: !!isbn,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Book, "isbn">>({
    resolver: zodResolver(isbn ? bookSchema : createBookSchema),
    defaultValues: book || {},
  });

  React.useEffect(() => {
    if (book) {
      reset(book);
    }
  }, [book, reset]);

  const mutation = useMutation({
    mutationFn: (newBook: Omit<Book, "isbn">) =>
      isbn ? updateBook({ ...newBook, isbn }) : createBook(newBook),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      navigate("/");
    },
  });

  const onSubmit = (data: Omit<Book, "isbn">) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isbn ? "Edit Book" : "Add Book"}</CardTitle>
        <CardDescription>
          {isbn
            ? "Edit the details of the book."
            : "Enter the details of the new book."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="author">Author</Label>
            <Input id="author" {...register("author")} />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="publicationYear">Publication Year</Label>
            <Input
              id="publicationYear"
              type="number"
              {...register("publicationYear", { valueAsNumber: true })}
            />
            {errors.publicationYear && (
              <p className="text-red-500 text-sm">
                {errors.publicationYear.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookForm;