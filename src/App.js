import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const theme = createTheme({
    palette: {
        primary: {
            main: "#121212",
        },
        secondary: {
            main: "#121212",
        },
    },
});

const ingredientsList = [
    "Salt",
    "Pepper",
    "Sugar",
    "Vegetable Oil",
    "Olive Oil",
    "Sesame Oil",
    "Butter",
    "Garlic",
    "Vinegar",
    "Egg",
    "Lemon",
    "Flour",
    "Soy Sauce",
    "Hot Sauce",
    "Milk",
];

const App = () => {
    const [fetchingRecipe, setFetchingRecipe] = useState(false);

    const [userIngredients, setUserIngredients] = useState("")

    const [redirectRecipe, setRedirectRecipe] = useState(false)

    const [recipe, setRecipe] = useState(``)

    const [checkedIngredients, setCheckedIngredients] = useState(
        ingredientsList.reduce((acc, ingredient) => {
            acc[ingredient] = true;
            return acc;
        }, {})
    );

    const openai = async () => {
        setFetchingRecipe(true);
        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const commonIngredients = compileCheckbox();

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `you are a chef who can suggest delicious, real-life, popular recipes using ONLY the available ingredients I give you, but you do not have to use all of the ingredients if not needed. Name the dish. Then list out the ingredients in a bullet point list, then list out the detailed step-by-step instructions in a new bullet point list. Give me the recipes in this EXACT format: {
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
        setFetchingRecipe(false);
        setRecipe(completion.data.choices[0].message.content);
    };

    const compileCheckbox = () => {
        let ingredientList = ""
        for (const [key, value] of Object.entries(checkedIngredients)) {
            if (value) {
                ingredientList += key + ", "
            }
          }
          return ingredientList.trim()
    }

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Nav />

                <Routes>
                    <Route
                        path="/"
                        exact
                        element={
                            <Home
                                ingredientsList={ingredientsList}
                                checkedIngredients={checkedIngredients}
                                setCheckedIngredients={setCheckedIngredients}
                                setUserIngredients={setUserIngredients}
                                openai={openai}
                            />
                        }
                    ></Route>
                    <Route
                        path="/recipe"
                        element={
                            <Recipe
                                fetchingRecipe={fetchingRecipe}
                                setFetchingRecipe={setFetchingRecipe}
                                recipe={recipe}
                            />
                        }
                    ></Route>
                </Routes>
            </ThemeProvider>
        </Router>
    );
};

export default App;
