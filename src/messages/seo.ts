import { defineMessages } from 'react-intl';

export const seoMessages = defineMessages({
  recipeDetailTitle: {
    id: 'seo.recipeDetailTitle',
    defaultMessage: '{title} - Recipe by {createdBy} | Cookbook',
  },
  recipeDetailDescription: {
    id: 'seo.recipeDetailDescription',
    defaultMessage:
      '{title} recipe, created by {createdBy}. This recipe belongs to the {category} category and can be prepared in {cookingTime} minutes. Check out the exact ingredients and detailed cooking instructions!',
  },
  recipeDetailKeywords: {
    id: 'seo.recipeDetailKeywords',
    defaultMessage: 'recipe, {title}, {category}, cooking, {createdBy}, ingredients, meal',
  },
});
