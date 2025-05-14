
import { Feature } from "@/lib/types";

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center">
      <div className="feature-icon-bg">
        <span className="material-symbols-outlined feature-icon">{feature.icon}</span>
      </div>
      <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
      <p className="text-gray-500 text-sm">{feature.description}</p>
    </div>
  );
};

export default FeatureCard;
