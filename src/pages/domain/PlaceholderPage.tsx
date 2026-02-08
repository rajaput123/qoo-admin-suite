import { useLocation } from "react-router-dom";
import { Construction } from "lucide-react";

const PlaceholderPage = () => {
  const location = useLocation();
  const pageName = location.pathname.split("/").pop()?.replace(/-/g, " ") || "Page";

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-8">
      <div className="text-center">
        <div className="inline-flex p-3 rounded-lg bg-gold-light mb-4">
          <Construction className="h-6 w-6 text-accent" />
        </div>
        <h2 className="text-xl font-semibold text-foreground capitalize mb-2">{pageName}</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          This section is under development. Check back soon for updates.
        </p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
