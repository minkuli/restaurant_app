import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>The Restaurant at the End of the Universe</h2>
      <p>
        Taste our specialty - space-whale steak! Eat like the President of the
        Galaxy!
      </p>
      <p>
        All our meals are cooked by master chefs from the planet of Dentrass!
      </p>
    </section>
  );
};

export default MealsSummary;
