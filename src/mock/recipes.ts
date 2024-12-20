import { TMetadataType } from '../store/Metadata/types';
import { TRecipe } from '../store/Recipe/types';

export const mockRecipes: TRecipe[] = [
  {
    _id: '1',
    title: 'Tiramisu',
    description: 'A classic Italian dessert made with coffee-soaked ladyfingers and mascarpone cheese.',
    ingredients: [
      { localId: '1', name: 'Ladyfingers', quantity: 200, unit: 'g' },
      { localId: '2', name: 'Mascarpone cheese', quantity: 250, unit: 'g' },
      { localId: '3', name: 'Sugar', quantity: 100, unit: 'g' },
      { localId: '4', name: 'Eggs', quantity: 3, unit: 'pcs' },
      { localId: '5', name: 'Espresso', quantity: 200, unit: 'ml' },
      { localId: '6', name: 'Cocoa powder', quantity: 2, unit: 'tbsp' },
    ],
    preparationSteps: [
      { description: 'Brew espresso and let it cool.', order: 1 },
      { description: 'Separate egg yolks from whites.', order: 2 },
      { description: 'Whisk egg yolks with sugar until creamy.', order: 3 },
      { description: 'Fold mascarpone cheese into egg mixture.', order: 4 },
      { description: 'Beat egg whites until stiff peaks form.', order: 5 },
      { description: 'Fold egg whites into mascarpone mixture.', order: 6 },
      { description: 'Quickly dip ladyfingers into espresso and layer them in a dish.', order: 7 },
      { description: 'Spread half of the mascarpone mixture over the ladyfingers.', order: 8 },
      { description: 'Repeat with another layer of ladyfingers and mascarpone mixture.', order: 9 },
      { description: 'Chill in the refrigerator for at least 4 hours.', order: 10 },
    ],
    createdAt: '2024-04-19T10:00:00Z',
    createdBy: 'user123',
    updatedAt: '2024-04-19T10:30:00Z',
    cookingTime: 30,
    difficultyLevel: {
      key: 'easy',
      label: 'Easy',
      name: 'easy',
      type: TMetadataType.LEVEL,
    },
    category: {
      key: 'italian',
      label: 'Italian',
      name: 'italian',
      type: TMetadataType.CATEGORY,
    },
    labels: [
      {
        key: 'dessert',
        label: 'Dessert',
        name: 'dessert',
        type: TMetadataType.LABEL,
      },
      {
        key: 'sweet',
        label: 'Sweet',
        name: 'sweet',
        type: TMetadataType.LABEL,
      },
    ],
    servings: 8,
    userRating: null,
    ratingsCount: 112,
    averageRating: 4.7,
  },
  {
    _id: '2',
    title: 'Spaghetti Carbonara',
    description: 'A classic Roman pasta dish made with eggs, cheese, pancetta, and black pepper.',
    ingredients: [
      { localId: '1', name: 'Spaghetti', quantity: 400, unit: 'g' },
      { localId: '2', name: 'Pancetta', quantity: 150, unit: 'g' },
      { localId: '3', name: 'Eggs', quantity: 3, unit: 'pcs' },
      { localId: '4', name: 'Pecorino Romano cheese', quantity: 100, unit: 'g' },
      { localId: '5', name: 'Black pepper', quantity: 1, unit: 'tsp' },
    ],
    preparationSteps: [
      { description: 'Cook spaghetti in salted water until al dente.', order: 1 },
      { description: 'Dice pancetta and fry until crispy.', order: 2 },
      { description: 'Whisk eggs with grated cheese and black pepper.', order: 3 },
      { description: 'Drain spaghetti and add to pancetta.', order: 4 },
      { description: 'Quickly stir in egg mixture until creamy.', order: 5 },
      { description: 'Serve immediately with extra cheese and pepper.', order: 6 },
    ],
    createdAt: '2024-04-19T11:00:00Z',
    createdBy: 'user456',
    updatedAt: '2024-04-19T11:30:00Z',
    cookingTime: 20,
    difficultyLevel: {
      key: 'medium',
      label: 'Medium',
      name: 'medium',
      type: TMetadataType.LEVEL,
    },
    category: {
      key: 'italian',
      label: 'Italian',
      name: 'italian',
      type: TMetadataType.CATEGORY,
    },
    labels: [
      {
        key: 'pasta',
        label: 'Pasta',
        name: 'pasta',
        type: TMetadataType.LABEL,
      },
      {
        key: 'savory',
        label: 'Savory',
        name: 'savory',
        type: TMetadataType.LABEL,
      },
    ],
    servings: 4,
    userRating: null,
    ratingsCount: 132,
    averageRating: 4.9,
  },
  {
    _id: '3',
    title: 'Chicken Tikka Masala',
    description: 'A popular Indian curry dish made with marinated chicken and a creamy tomato sauce.',
    ingredients: [
      { localId: '1', name: 'Chicken thighs', quantity: 500, unit: 'g' },
      { localId: '2', name: 'Yogurt', quantity: 200, unit: 'g' },
      { localId: '3', name: 'Tomato passata', quantity: 400, unit: 'ml' },
      { localId: '4', name: 'Onion', quantity: 1, unit: 'pcs' },
      { localId: '5', name: 'Garlic', quantity: 2, unit: 'cloves' },
      { localId: '6', name: 'Ginger', quantity: 1, unit: 'inch' },
      { localId: '7', name: 'Garam masala', quantity: 2, unit: 'tsp' },
      { localId: '8', name: 'Chili powder', quantity: 1, unit: 'tsp' },
      { localId: '9', name: 'Cream', quantity: 100, unit: 'ml' },
    ],
    preparationSteps: [
      { description: 'Marinate chicken in yogurt and spices for at least 1 hour.', order: 1 },
      { description: 'Grill chicken until cooked through.', order: 2 },
      { description: 'Saute onion, garlic, and ginger until soft.', order: 3 },
      { description: 'Add tomato passata and spices, simmer for 10 minutes.', order: 4 },
      { description: 'Stir in cream and grilled chicken, simmer for another 5 minutes.', order: 5 },
      { description: 'Serve with rice and naan bread.', order: 6 },
    ],
    createdAt: '2024-04-19T12:00:00Z',
    createdBy: 'user789',
    updatedAt: '2024-04-19T12:30:00Z',
    cookingTime: 45,
    difficultyLevel: {
      key: 'hard',
      label: 'Hard',
      name: 'hard',
      type: TMetadataType.LEVEL,
    },
    category: {
      key: 'indian',
      label: 'Indian',
      name: 'indian',
      type: TMetadataType.CATEGORY,
    },
    labels: [
      {
        key: 'curry',
        label: 'Curry',
        name: 'curry',
        type: TMetadataType.LABEL,
      },
      {
        key: 'spicy',
        label: 'Spicy',
        name: 'spicy',
        type: TMetadataType.LABEL,
      },
    ],
    servings: 6,
    userRating: null,
    ratingsCount: 100,
    averageRating: 3.4,
  },
  {
    _id: '4',
    title: 'Caesar Salad',
    description: 'A classic salad made with romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.',
    ingredients: [
      { localId: '1', name: 'Romaine lettuce', quantity: 1, unit: 'head' },
      { localId: '2', name: 'Croutons', quantity: 100, unit: 'g' },
      { localId: '3', name: 'Parmesan cheese', quantity: 50, unit: 'g' },
      { localId: '4', name: 'Chicken breast', quantity: 200, unit: 'g' },
      { localId: '5', name: 'Caesar dressing', quantity: 100, unit: 'ml' },
    ],
    preparationSteps: [
      { description: 'Grill chicken until cooked through.', order: 1 },
      { description: 'Tear lettuce into bite-sized pieces.', order: 2 },
      { description: 'Toss lettuce with dressing until coated.', order: 3 },
      { description: 'Top with croutons, shaved Parmesan, and sliced chicken.', order: 4 },
    ],
    createdAt: '2024-04-19T13:00:00Z',
    createdBy: 'user123',
    updatedAt: '2024-04-19T13:30:00Z',
    cookingTime: 15,
    difficultyLevel: {
      key: 'easy',
      label: 'Easy',
      name: 'easy',
      type: TMetadataType.LEVEL,
    },
    category: {
      key: 'american',
      label: 'American',
      name: 'american',
      type: TMetadataType.CATEGORY,
    },
    labels: [
      {
        key: 'salad',
        label: 'Salad',
        name: 'salad',
        type: TMetadataType.LABEL,
      },
      {
        key: 'light',
        label: 'Light',
        name: 'light',
        type: TMetadataType.LABEL,
      },
    ],
    servings: 4,
    userRating: null,
    ratingsCount: 122,
    averageRating: 3.1,
  },
  {
    _id: '5',
    title: 'Beef Stroganoff',
    description: 'A Russian dish made with sautéed beef, onions, mushrooms, and sour cream sauce.',
    ingredients: [
      { localId: '1', name: 'Beef sirloin', quantity: 500, unit: 'g' },
      { localId: '2', name: 'Onion', quantity: 1, unit: 'pcs' },
      { localId: '3', name: 'Mushrooms', quantity: 200, unit: 'g' },
      { localId: '4', name: 'Beef broth', quantity: 200, unit: 'ml' },
      { localId: '5', name: 'Sour cream', quantity: 100, unit: 'ml' },
      { localId: '6', name: 'Paprika', quantity: 1, unit: 'tsp' },
    ],
    preparationSteps: [
      { description: 'Slice beef into thin strips.', order: 1 },
      { description: 'Saute beef until browned, remove from pan.', order: 2 },
      { description: 'Saute onion and mushrooms until soft.', order: 3 },
      { description: 'Add beef broth and paprika, simmer for 10 minutes.', order: 4 },
      { description: 'Stir in sour cream and beef, simmer for another 5 minutes.', order: 5 },
      { description: 'Serve over egg noodles or rice.', order: 6 },
    ],
    createdAt: '2024-04-19T14:00:00Z',
    createdBy: 'user456',
    updatedAt: '2024-04-19T14:30:00Z',
    cookingTime: 30,
    difficultyLevel: {
      key: 'medium',
      label: 'Medium',
      name: 'medium',
      type: TMetadataType.LEVEL,
    },
    category: {
      key: 'russian',
      label: 'Russian',
      name: 'russian',
      type: TMetadataType.CATEGORY,
    },
    labels: [
      {
        key: 'beef',
        label: 'Beef',
        name: 'beef',
        type: TMetadataType.LABEL,
      },
      {
        key: 'creamy',
        label: 'Creamy',
        name: 'creamy',
        type: TMetadataType.LABEL,
      },
    ],
    servings: 6,
    userRating: null,
    ratingsCount: 102,
    averageRating: 4.7,
  },
  {
    _id: '6',
    title: 'Sushi Rolls',
    description: 'Japanese rice rolls filled with fish, vegetables, and other ingredients.',
    ingredients: [
      { localId: '1', name: 'Sushi rice', quantity: 2, unit: 'cups' },
      { localId: '2', name: 'Nori seaweed', quantity: 4, unit: 'sheets' },
      { localId: '3', name: 'Salmon', quantity: 200, unit: 'g' },
      { localId: '4', name: 'Cucumber', quantity: 1, unit: 'pcs' },
      { localId: '5', name: 'Avocado', quantity: 1, unit: 'pcs' },
      { localId: '6', name: 'Soy sauce', quantity: 50, unit: 'ml' },
      { localId: '7', name: 'Wasabi', quantity: 1, unit: 'tsp' },
      { localId: '8', name: 'Pickled ginger', quantity: 50, unit: 'g' },
    ],
    preparationSteps: [
      { description: 'Cook sushi rice according to package instructions.', order: 1 },
      { description: 'Slice fish, cucumber, and avocado into thin strips.', order: 2 },
      { description: 'Place nori sheet on bamboo mat, spread rice evenly.', order: 3 },
      { description: 'Arrange fish, cucumber, and avocado on rice.', order: 4 },
      { description: 'Roll up tightly, slice into bite-sized pieces.', order: 5 },
      { description: 'Serve with soy sauce, wasabi, and pickled ginger.', order: 6 },
    ],
    createdAt: '2024-04-19T15:00:00Z',
    createdBy: 'user789',
    updatedAt: '2024-04-19T15:30:00Z',
    cookingTime: 45,
    difficultyLevel: {
      key: 'hard',
      label: 'Hard',
      name: 'hard',
      type: TMetadataType.LEVEL,
    },
    category: {
      key: 'japanese',
      label: 'Japanese',
      name: 'japanese',
      type: TMetadataType.CATEGORY,
    },
    labels: [
      {
        key: 'sushi',
        label: 'Sushi',
        name: 'sushi',
        type: TMetadataType.LABEL,
      },
      {
        key: 'raw',
        label: 'Raw',
        name: 'raw',
        type: TMetadataType.LABEL,
      },
    ],
    servings: 4,
    userRating: null,
    ratingsCount: 12,
    averageRating: 4.0,
  },
  {
    _id: '7',
    title: 'Chocolate Cake',
    description: 'A rich and decadent cake made with cocoa powder, butter, sugar, and eggs.',
    ingredients: [
      { localId: '1', name: 'Flour', quantity: 200, unit: 'g' },
      { localId: '2', name: 'Cocoa powder', quantity: 50, unit: 'g' },
      { localId: '3', name: 'Butter', quantity: 150, unit: 'g' },
      { localId: '4', name: 'Sugar', quantity: 150, unit: 'g' },
      { localId: '5', name: 'Eggs', quantity: 3, unit: 'pcs' },
      { localId: '6', name: 'Baking powder', quantity: 1, unit: 'tsp' },
    ],
    preparationSteps: [
      { description: 'Preheat oven to 180°C.', order: 1 },
      { description: 'Cream butter and sugar until light and fluffy.', order: 2 },
      { description: 'Add eggs one at a time, beating well after each addition.', order: 3 },
      { description: 'Sift flour, cocoa powder, and baking powder together.', order: 4 },
      { description: 'Fold dry ingredients into wet ingredients until combined.', order: 5 },
      { description: 'Pour batter into greased cake pan, bake for 30 minutes.', order: 6 },
    ],
    createdAt: '2024-04-19T16:00:00Z',
    createdBy: 'user123',
    updatedAt: '2024-04-19T16:30:00Z',
    cookingTime: 60,
    difficultyLevel: {
      key: 'medium',
      label: 'Medium',
      name: 'medium',
      type: TMetadataType.LEVEL,
    },
    category: {
      key: 'dessert',
      label: 'Dessert',
      name: 'dessert',
      type: TMetadataType.CATEGORY,
    },
    labels: [
      {
        key: 'cake',
        label: 'Cake',
        name: 'cake',
        type: TMetadataType.LABEL,
      },
      {
        key: 'chocolate',
        label: 'Chocolate',
        name: 'chocolate',
        type: TMetadataType.LABEL,
      },
    ],
    servings: 8,
    userRating: null,
    ratingsCount: 12,
    averageRating: 2.1,
  },
  {
    _id: '8',
    title: 'Ratatouille',
    description: 'A French vegetable stew made with eggplant, zucchini, bell peppers, and tomatoes.',
    ingredients: [
      { localId: '1', name: 'Eggplant', quantity: 1, unit: 'pcs' },
      { localId: '2', name: 'Zucchini', quantity: 1, unit: 'pcs' },
      { localId: '3', name: 'Bell peppers', quantity: 2, unit: 'pcs' },
      { localId: '4', name: 'Tomatoes', quantity: 4, unit: 'pcs' },
      { localId: '5', name: 'Onion', quantity: 1, unit: 'pcs' },
      { localId: '6', name: 'Garlic', quantity: 2, unit: 'cloves' },
      { localId: '7', name: 'Olive oil', quantity: 2, unit: 'tbsp' },
      { localId: '8', name: 'Herbs de Provence', quantity: 1, unit: 'tsp' },
    ],
    preparationSteps: [
      { description: 'Slice vegetables into thin rounds.', order: 1 },
      { description: 'Saute onion and garlic in olive oil until soft.', order: 2 },
      { description: 'Layer vegetables in a baking dish, drizzle with olive oil.', order: 3 },
      { description: 'Sprinkle with herbs de Provence, cover with foil.', order: 4 },
      { description: 'Bake at 180°C for 45 minutes, uncover and bake for another 15 minutes.', order: 5 },
    ],
    createdAt: '2024-04-19T17:00:00Z',
    createdBy: 'user456',
    updatedAt: '2024-04-19T17:30:00Z',
    cookingTime: 60,
    difficultyLevel: {
      key: 'easy',
      label: 'Easy',
      name: 'easy',
      type: TMetadataType.LEVEL,
    },
    category: {
      key: 'french',
      label: 'French',
      name: 'french',
      type: TMetadataType.CATEGORY,
    },
    labels: [
      {
        key: 'vegetarian',
        label: 'Vegetarian',
        name: 'vegetarian',
        type: TMetadataType.LABEL,
      },
      {
        key: 'healthy',
        label: 'Healthy',
        name: 'healthy',
        type: TMetadataType.LABEL,
      },
    ],
    servings: 4,
    userRating: null,
    ratingsCount: 121,
    averageRating: 4.2,
  },
  {
    _id: '9',
    title: 'Pad Thai',
    description: 'A popular Thai stir-fried noodle dish made with shrimp, tofu, peanuts, and tamarind sauce.',
    ingredients: [
      { localId: '1', name: 'Rice noodles', quantity: 200, unit: 'g' },
      { localId: '2', name: 'Shrimp', quantity: 150, unit: 'g' },
      { localId: '3', name: 'Tofu', quantity: 100, unit: 'g' },
      { localId: '4', name: 'Bean sprouts', quantity: 100, unit: 'g' },
      { localId: '5', name: 'Peanuts', quantity: 50, unit: 'g' },
      { localId: '6', name: 'Tamarind paste', quantity: 2, unit: 'tbsp' },
      { localId: '7', name: 'Fish sauce', quantity: 2, unit: 'tbsp' },
      { localId: '8', name: 'Sugar', quantity: 1, unit: 'tbsp' },
    ],
    preparationSteps: [
      { description: 'Soak rice noodles in hot water until soft.', order: 1 },
      { description: 'Stir-fry shrimp and tofu until cooked through.', order: 2 },
      { description: 'Add noodles, bean sprouts, and sauce, toss to combine.', order: 3 },
      { description: 'Serve with crushed peanuts and lime wedges.', order: 4 },
    ],
    createdAt: '2024-04-19T18:00:00Z',
    createdBy: 'user789',
    updatedAt: '2024-04-19T18:30:00Z',
    cookingTime: 30,
    difficultyLevel: {
      key: 'medium',
      label: 'Medium',
      name: 'medium',
      type: TMetadataType.LEVEL,
    },
    category: {
      key: 'thai',
      label: 'Thai',
      name: 'thai',
      type: TMetadataType.CATEGORY,
    },
    labels: [
      {
        key: 'noodles',
        label: 'Noodles',
        name: 'noodles',
        type: TMetadataType.LABEL,
      },
      {
        key: 'spicy',
        label: 'Spicy',
        name: 'spicy',
        type: TMetadataType.LABEL,
      },
    ],
    servings: 2,
    userRating: null,
    ratingsCount: 12,
    averageRating: 1.5,
  },
];
