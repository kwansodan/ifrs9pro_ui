import { useQuery } from "@tanstack/react-query";
import { GetAllFeedbacks } from "../services/feedback.service";

export const useFeedback = () => {
  const feedbackQuery = useQuery({
    queryKey: ["feedbackQuery"],
    queryFn: () => GetAllFeedbacks(),
  });
  return {
    feedbackQuery,
  };
};
