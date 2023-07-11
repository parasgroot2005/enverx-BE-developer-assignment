export interface Blog {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  isPublished: boolean;
  views: number;
  comments: Comment[];
}
