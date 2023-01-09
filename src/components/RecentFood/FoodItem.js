export default function FoodItem({ image, name, stats_array }) {
  return (
    <div className="d-flex flex-column">
      <div>{image}</div>
      <div>
        <card>
          <h5 className="card-title">{name}</h5>
          <div className="card-body">
            <div>Energy</div>
            <div>{stats_array.Energy}</div>
            <div>Protein</div>
            <div>{stats_array.Protein}</div>
            <div>Trans Fat</div>
            <div>{stats_array.Trans_Fat}</div>
            <div>Saturated Fat</div>
            <div>{stats_array.Saturated_Fat}</div>
          </div>
        </card>
      </div>
    </div>
  );
}
