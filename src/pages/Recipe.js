import Lottie from "lottie-react";
import ani from "../img/hot-food.json";
import "./Recipe.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ani
};

const Recipe = (props) => {
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [name, setName] = useState("");

    const parseRecipe = (recipe) => {
        const lines = recipe.split(/\r?\n/);
        setName(lines[0].trim());
        let onIngredients = false;
        let onInstructions = false;
        let ingredientsOutput = [];
        let instructionsOutput = [];
        lines.forEach((line) => {
            if (line.indexOf("Ingredients") != -1) {
                onIngredients = true;
            } else if (line.indexOf("Instructions") != -1) {
                onIngredients = false;
                onInstructions = true;
            } else {
                if (onIngredients) {
                    ingredientsOutput.push(line.trim() + "\n");
                } else if (onInstructions) {
                    instructionsOutput.push(line.trim() + "\n");
                }
            }
        });
        setIngredients(ingredientsOutput);
        setInstructions(instructionsOutput);
    };

    useEffect(() => {
        parseRecipe(props.recipe);
    }, [props.recipe]);

    const navigate = useNavigate();

    useEffect(() => {
        if (props.recipe.length == 0 && !props.fetchingRecipe) {
            navigate('/')
        }
    }, [])

    return (
        <div className="recipe">
            {props.fetchingRecipe && (
                <div className="fetching-loader">
                    <div className="fetching-content">
                        <Lottie
                            animationData={ani}
                            autoplay={true}
                            loop={true}
                            height={150}
                            width={150}
                        />
                        <p className="fetching-label">
                            Finding you a dank recipe...
                        </p>
                    </div>
                </div>
            )}

            <div className="recipe-container">
                <p className="name">{name}</p>
                <div className="col">
                    <div className="ingredients">
                        <p className="label bold">Ingredients</p>
                        {ingredients.map((line, index) => (
                            <p className="text" key={index}>
                                {line}
                            </p>
                        ))}
                    </div>
                    <div className="instructions">
                        <p className="label bold">Ingredients</p>
                        {instructions.map((line, index) => (
                            <p className="text" key={index}>
                                {line}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recipe;
