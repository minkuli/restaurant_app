import { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("/menu/");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      console.log("resssss*******???", responseData);

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: parseInt(responseData[key].id),
          name: responseData[key].name,
          price: parseFloat(responseData[key].price),
          category: responseData[key].category,
          description: responseData[key].description,
        });
      }
      console.log(loadedMeals);
      setMenuItems(loadedMeals);
      setLoading(false);
    };

    fetchMeals()
      .then()
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <section>
        <p className={classes.MealsError}>{error}</p>
      </section>
    );
  }

  if (loading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  const meals = menuItems.filter((item) => item.category === "Food");
  const drinks = menuItems.filter((item) => item.category === "Drink");

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        price={meal.price}
        description={meal.description}
      />
    );
  });

  const drinksList = drinks.map((drink) => {
    return (
      <MealItem
        id={drink.id}
        key={drink.id}
        name={drink.name}
        price={drink.price}
        description={drink.description}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <h2>Food</h2>
        <ul>{mealsList}</ul>
        <h2>Drinks</h2>
        <ul>{drinksList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
