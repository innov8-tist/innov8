import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MainLayout from "@/components/MainLayout";
import { ArrowRight, Check, X, ShieldAlert, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface TransactionData {
  Amount: number;
  Time: number;
  Avg_Transactions_Per_Day: number;
  Num_Failed_Transactions: number;
  Is_Foreign_Transaction: number;
  Is_High_Risk_Country: number;
}

const defaultTransactionData: TransactionData = {
  Amount: 150.75,
  Time: 36000,
  Avg_Transactions_Per_Day: 5.5,
  Num_Failed_Transactions: 3,
  Is_Foreign_Transaction: 1,
  Is_High_Risk_Country: 0
};

const predictFraudTransaction = (data: TransactionData): boolean => {
  // Simple fraud detection logic
  // This is a simplified version - real fraud detection would use more complex algorithms
  
  let riskScore = 0;
  
  // Higher amount increases risk
  if (data.Amount > 1000) riskScore += 25;
  else if (data.Amount > 500) riskScore += 15;
  else if (data.Amount > 200) riskScore += 5;
  
  // Unusual time of day (assuming Time is seconds since midnight)
  // Late night transactions (between 1am and 5am) are higher risk
  const hourOfDay = Math.floor(data.Time / 3600) % 24;
  if (hourOfDay >= 1 && hourOfDay < 5) riskScore += 20;
  
  // High number of failed transactions increases risk
  if (data.Num_Failed_Transactions > 5) riskScore += 30;
  else if (data.Num_Failed_Transactions > 2) riskScore += 15;
  
  // Foreign transactions may have higher risk
  if (data.Is_Foreign_Transaction === 1) riskScore += 10;
  
  // High risk country significantly increases risk
  if (data.Is_High_Risk_Country === 1) riskScore += 30;
  
  // Transaction frequency - unusual patterns increase risk
  if (data.Avg_Transactions_Per_Day < 1 && data.Amount > 100) riskScore += 15;
  else if (data.Avg_Transactions_Per_Day > 10) riskScore += 10;
  
  // Consider fraud if risk score exceeds threshold
  return riskScore >= 50;
};

const FraudTransaction = () => {
  const { toast } = useToast();
  const [transactionData, setTransactionData] = useState<TransactionData>(defaultTransactionData);
  const [showPrediction, setShowPrediction] = useState<boolean>(false);
  const isFraudulent = predictFraudTransaction(transactionData);

  const handleInputChange = (field: keyof TransactionData, value: number) => {
    setTransactionData({
      ...transactionData,
      [field]: value,
    });
    
    if (showPrediction) {
      setShowPrediction(false);
    }
  };
  
  const handleSwitchChange = (field: keyof TransactionData, checked: boolean) => {
    setTransactionData({
      ...transactionData,
      [field]: checked ? 1 : 0,
    });
    
    if (showPrediction) {
      setShowPrediction(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Transaction Analyzed",
      description: "Your transaction has been analyzed for potential fraud.",
    });
    setShowPrediction(true);
    console.log("Transaction data:", transactionData);
  };

  return (
    <MainLayout>
      <div className="container p-6 max-w-6xl animate-fade-up">
        <h1 className="text-2xl font-bold mb-6">Fraud Transaction Detection</h1>
        
        <div className="glass-card p-6 animate-fade-in max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <ShieldAlert className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Transaction Analysis</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="finance-label">Transaction Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  className="finance-input"
                  value={transactionData.Amount}
                  onChange={(e) => handleInputChange("Amount", Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time" className="finance-label">Time (seconds from midnight)</Label>
                <Input
                  id="time"
                  type="number"
                  className="finance-input"
                  value={transactionData.Time}
                  onChange={(e) => handleInputChange("Time", Number(e.target.value))}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {Math.floor(transactionData.Time / 3600).toString().padStart(2, '0')}:
                  {Math.floor((transactionData.Time % 3600) / 60).toString().padStart(2, '0')}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="avgTransactions" className="finance-label">Average Transactions Per Day</Label>
                <Input
                  id="avgTransactions"
                  type="number"
                  step="0.1"
                  className="finance-input"
                  value={transactionData.Avg_Transactions_Per_Day}
                  onChange={(e) => handleInputChange("Avg_Transactions_Per_Day", Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="failedTransactions" className="finance-label">Number of Failed Transactions</Label>
                <Input
                  id="failedTransactions"
                  type="number"
                  className="finance-input"
                  value={transactionData.Num_Failed_Transactions}
                  onChange={(e) => handleInputChange("Num_Failed_Transactions", Number(e.target.value))}
                />
              </div>
              
              <div className="flex items-center justify-between border rounded-md p-3">
                <Label htmlFor="foreignTransaction" className="finance-label cursor-pointer">
                  Is Foreign Transaction
                </Label>
                <Switch
                  id="foreignTransaction"
                  checked={transactionData.Is_Foreign_Transaction === 1}
                  onCheckedChange={(checked) => handleSwitchChange("Is_Foreign_Transaction", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between border rounded-md p-3">
                <Label htmlFor="highRiskCountry" className="finance-label cursor-pointer">
                  Is High Risk Country
                </Label>
                <Switch
                  id="highRiskCountry"
                  checked={transactionData.Is_High_Risk_Country === 1}
                  onCheckedChange={(checked) => handleSwitchChange("Is_High_Risk_Country", checked)}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-6 bg-finance-blue hover:bg-blue-600 transition-colors group"
            >
              Analyze Transaction
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
          
          {showPrediction && (
            <div className={mt-8 p-6 rounded-lg border animate-fade-up ${isFraudulent ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}}>
              <h3 className="text-lg font-semibold mb-2">
                Fraud Detection Result
              </h3>
              
              <div className="flex items-center gap-3">
                {!isFraudulent ? (
                  <>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-700">Transaction appears legitimate</p>
                      <p className="text-sm text-green-600 mt-1">Based on the provided information, this transaction does not show signs of fraud.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-red-700">Potential fraudulent transaction detected</p>
                      <p className="text-sm text-red-600 mt-1">This transaction has unusual patterns that may indicate fraud.</p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-6 space-y-4">
                <h4 className="text-sm font-medium">Key Risk Factors:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className={p-3 rounded-md ${transactionData.Amount > 200 ? 'bg-yellow-50' : 'bg-gray-50'}}>
                    <div className="text-xs text-gray-500">Transaction Amount</div>
                    <div className="font-medium">${transactionData.Amount.toFixed(2)}</div>
                  </div>
                  
                  <div className={p-3 rounded-md ${transactionData.Num_Failed_Transactions > 2 ? 'bg-yellow-50' : 'bg-gray-50'}}>
                    <div className="text-xs text-gray-500">Failed Transactions</div>
                    <div className="font-medium">{transactionData.Num_Failed_Transactions}</div>
                  </div>
                  
                  <div className={p-3 rounded-md ${transactionData.Is_Foreign_Transaction === 1 ? 'bg-yellow-50' : 'bg-gray-50'}}>
                    <div className="text-xs text-gray-500">Foreign Transaction</div>
                    <div className="font-medium">{transactionData.Is_Foreign_Transaction === 1 ? 'Yes' : 'No'}</div>
                  </div>
                  
                  <div className={p-3 rounded-md ${transactionData.Is_High_Risk_Country === 1 ? 'bg-red-50' : 'bg-gray-50'}}>
                    <div className="text-xs text-gray-500">High Risk Country</div>
                    <div className="font-medium">{transactionData.Is_High_Risk_Country === 1 ? 'Yes' : 'No'}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>This is an automated fraud detection assessment based on the data provided.</p>
                <p>Contact your financial institution for further investigation if needed.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default FraudTransaction;