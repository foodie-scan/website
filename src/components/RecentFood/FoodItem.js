export default function FoodItem({ name, stats_array }) {
  return (
    <div className="d-flex flex-column">
      <div>
        <img src={stats_array.image} alt="screw u blind faggots" />
      </div>
      <div>
        <card>
          <h5 className="card-title">{name}</h5>
          <div className="card-body">
            <div>Energy</div>
            <div>{stats_array.energy}</div>
            <div>Protein</div>
            <div>{stats_array.protein}</div>
            <div>Trans Fat</div>
            <div>{stats_array.trans_Fat}</div>
            <div>Saturated Fat</div>
            <div>{stats_array.saturated_Fat}</div>
          </div>
        </card>
      </div>
    </div>
  );
}
