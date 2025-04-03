import { useQuery } from "@tanstack/react-query";
import { GetAllFeedbacks, GetFeedback } from "../services/feedback.service";

export const useFeedback = () => {
  const feedbackQuery = useQuery({
    queryKey: ["feedbackQuery"],
    queryFn: () => GetAllFeedbacks(),
  });
  return {
    feedbackQuery,
  };
};

export const useGetAFeedback = (id: number | string) => {
  const aFeedBackQuery = useQuery({
    queryKey: ["aFeedBackQuery"],
    queryFn: () => GetFeedback(id),
  });
  return {
    aFeedBackQuery,
  };
};
