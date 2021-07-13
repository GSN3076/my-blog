
import { TOPIC } from "../variables";

export const addtoTopics = (product) => ({
  type: TOPIC.ADD_TO_TOPIC,
  product,
});

export const removeFromTopics = (productId) => ({
  type: TOPIC.REMOVE_FROM_TOPIC,
  productId,
});

