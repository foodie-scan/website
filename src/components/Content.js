import CalorieIntake from "./CalorieIntake";
import DropArea from "./DropArea";
import RecentFoods from "./RecentFoods";

export default function Content() {
  return (
    <div className="d-flex gap-5 mb-5 w-100">
      <RecentFoods />
      <DropArea />
      <CalorieIntake />
    </div>
  );
}
