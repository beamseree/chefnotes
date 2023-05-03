import { Configuration, OpenAIApi } from "@openai/api";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  })
);

export default async (req, res) => {
  const { userIngredients, commonIngredients } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
            role: "system",
            content: `you are a chef who can suggest delicious, real-life, popular recipes using ONLY the available ingredients I give you, but you do not have to use all of the ingredients if not needed. Name the dish. Then list out the ingredients in a bullet point list, then list out the detailed step-by-step instructions in a new bullet point list. Give me the recipes in this exact format: {
                Pork Belly Fried Rice Recipe
                
                Ingredients:
                - 2 cups cooked rice
                - 4 oz pork belly, chopped
                
                Instructions:
                1. Heat a large skillet over medium-high heat. Add the chopped pork belly and cook until crispy, about 5 minutes.
                }. Do not add any other text. `,
        },
        {
            role: "user",
            content:
                `I have the following ingredients: ${userIngredients}. I also have the following basic ingredients: ${commonIngredients}. Give me a recipe using only my available ingredients.`,
        }
      ],
    });

    res.status(200).json({ recipe: completion.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
