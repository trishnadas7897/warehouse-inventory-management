import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScanLine, Smartphone } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function MobileScannerCard() {
  const navigate = useNavigate()

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-primary" />
          Mobile Scanner
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Scan incoming inventory with barcode scanner
        </p>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={() => navigate("/scanner")}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12"
        >
          <ScanLine className="h-4 w-4 mr-2" />
          Open Scanner
        </Button>
      </CardContent>
    </Card>
  )
}