import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBook } from "@/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BookDetails = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const { data: book, isLoading, isError } = useQuery({
    queryKey: ["book", isbn],
    queryFn: () => getBook(isbn!),
    enabled: !!isbn,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !book) {
    return <div>Error fetching book details</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>{book.author}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <strong>ISBN:</strong> {book.isbn}
        </p>
        <p>
          <strong>Publication Year:</strong> {book.publicationYear}
        </p>
      </CardContent>
    </Card>
  );
};

export default BookDetails;