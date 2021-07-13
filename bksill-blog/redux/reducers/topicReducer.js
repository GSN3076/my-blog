import { v4 as uuidv4 } from "uuid";

import { TOPIC } from "../variables";

const initialState = [];

export default function topicReducer(state = initialState, action) {
  const topicItem = state.find((item) => item.id === action.productId);
  const topicItemIndex = topicItem && state.indexOf(topicItem);
  switch (action.type) {
    case TOPIC.ADD_TO_TOPIC:
      const addedtopicItem = state.find(
        (item) => item.id === action.product.id
      );
      const addedtopicItemIndex =
        addedtopicItem && state.indexOf(addedtopicItem);
      if (!addedtopicItem) {
          return [
            ...state,
            {
              ...action.product,
            },
          ];
      } else {
        return [
          ...state.slice(0, addedtopicItemIndex),
          ...state.slice(addedtopicItemIndex + 1),
        ];
      }
    case TOPIC.REMOVE_FROM_TOPIC:
      return [
        ...state.slice(0, topicItemIndex),
        ...state.slice(topicItemIndex + 1),
      ];
    default:
      return state;
  }
}
