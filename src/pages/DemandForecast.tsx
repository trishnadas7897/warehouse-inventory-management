import { DemandTrendsChart } from "@/components/DemandTrendsChart"
import { RestockCards } from "@/components/RestockCards"
import { ForecastFilters } from "@/components/ForecastFilters"
import { AIFactorsSidebar } from "@/components/AIFactorsSidebar"

const DemandForecast = () => {
  return (
    <div className="flex-1 flex gap-6 p-6">
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Demand Forecasting</h1>
          <p className="text-muted-foreground">
            Predict demand patterns with AI-powered analytics
          </p>
        </div>
        
        <ForecastFilters />
        
        <DemandTrendsChart />
        
        <RestockCards />
      </div>
      
      <AIFactorsSidebar />
    </div>
  );
};

export default DemandForecast;