import { useState, useEffect } from "react";
import "./Home.css";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
    const navigate = useNavigate();

    const navToRecipe = () => {
        props.openai()
        navigate("/recipe");
    };


    const handleCheckboxChange = (ingredient, isChecked) => {
        props.setCheckedIngredients({
            ...props.checkedIngredients,
            [ingredient]: isChecked,
        });
    };

    const ingredientsChunks = [];
    for (let i = 0; i < props.ingredientsList.length; i += 3) {
        ingredientsChunks.push(props.ingredientsList.slice(i, i + 3));
    }


    return (
        <div className="home">
            <h2>Transform Pantry Staples into Culinary Masterpieces</h2>
            <h1>
                Discover quick and delicious recipes with the help of an
                AI-powered chef
            </h1>

            <div className="common-ingredients">
                <p className="label">Common Ingredients</p>
                <div className="checkbox-container">
                    {ingredientsChunks.map((chunk, chunkIndex) => (
                        <div className="checkbox-col" key={chunkIndex}>
                            {chunk.map((ingredient, index) => (
                                <div className="ingredient" key={index}>
                                    <Checkbox
                                        onChange={(event) =>
                                            handleCheckboxChange(
                                                ingredient,
                                                event.target.checked
                                            )
                                        }
                                        defaultChecked
                                    />
                                    <p className="text">{ingredient}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="available-ingredients">
                <p className="label padding">
                    Available Ingredients (Seperated by Comma)
                </p>
                <TextField
                    fullWidth
                    multiline
                    id="fullWidth"
                    placeholder="ex. Spam, Ground Pork, Potatoes"
                    onChange={(e) => {props.setUserIngredients(e.target.value)}}
                />
            </div>

            <Button
                className="generate"
                variant="contained"
                size="large"
                onClick={navToRecipe}
            >
                Generate Recipe
            </Button>
        </div>
    );
};

export default Home;
