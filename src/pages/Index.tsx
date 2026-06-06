
import { StockOverviewCards } from "@/components/StockOverviewCards"
import { TopProductsCard } from "@/components/TopProductsCard"
import { RestockForecastChart } from "@/components/RestockForecastChart"
import { MobileScannerCard } from "@/components/MobileScannerCard"
import { StockAlertPanel } from "@/components/StockAlertPanel"
import { DetectedOnShelfPanel } from "@/components/DetectedOnShelfPanel"

const Index = () => {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Inventory Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your inventory levels and forecast restocking needs
        </p>
      </div>
      
      <StockOverviewCards />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <MobileScannerCard />
        <TopProductsCard />
        <RestockForecastChart />
      </div>

      <DetectedOnShelfPanel />

      <StockAlertPanel />
    </div>
  );
};

export default Index;
