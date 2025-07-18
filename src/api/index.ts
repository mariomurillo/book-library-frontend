import axios from 'axios';
import type { Book } from '../models/book';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get('/books');
  return response.data;
};

export const getBook = async (isbn: string): Promise<Book> => {
  const response = await api.get(`/books/${isbn}`);
  return response.data;
};

export const createBook = async (book: Omit<Book, 'isbn'>): Promise<Book> => {
  const response = await api.post('/books', book);
  return response.data;
};

export const updateBook = async (book: Book): Promise<Book> => {
  const response = await api.put(`/books/${book.isbn}`, book);
  return response.data;
};

export const deleteBook = async (isbn: string): Promise<void> => {
  await api.delete(`/books/${isbn}`);
};


export default api;
