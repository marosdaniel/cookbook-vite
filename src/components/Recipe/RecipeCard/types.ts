export interface IProps {
  title: string;
  description: string;
  createdBy: string;
  id: string;
  imgSrc?: string;
  isFavorite?: boolean;
  ratingsCount: number;
  averageRating: number;
}
