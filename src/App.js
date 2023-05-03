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

    const [userIngredients, setUserIngredients] = useState("");

    const [redirectRecipe, setRedirectRecipe] = useState(false);

    const [recipe, setRecipe] = useState(``);

    const [checkedIngredients, setCheckedIngredients] = useState(
        ingredientsList.reduce((acc, ingredient) => {
            acc[ingredient] = true;
            return acc;
        }, {})
    );

    const openai = async () => {
        setFetchingRecipe(true);

        try {
            const response = await fetch("/api/get_recipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userIngredients,
                    commonIngredients: compileCheckbox(),
                }),
            });

            const data = await response.json();
            setFetchingRecipe(false);
            setRecipe(data.recipe);
        } catch (error) {
            setFetchingRecipe(false);
            console.error("Error fetching recipe:", error);
        }
    };

    const compileCheckbox = () => {
        let ingredientList = "";
        for (const [key, value] of Object.entries(checkedIngredients)) {
            if (value) {
                ingredientList += key + ", ";
            }
        }
        return ingredientList.trim();
    };

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
