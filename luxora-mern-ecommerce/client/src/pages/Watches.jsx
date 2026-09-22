import CategoryPage from "./CategoryPage";
import "../styles/Watches.css";

export default function Watches() {
  return (
    <CategoryPage
      category="watches"
      title="Time, Beautifully Kept"
      subtitle="Chronographs and minimalist dials for men and women who value precision."
      heroImage="https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1400"
      accentClass="watches-page"
    />
  );
}
