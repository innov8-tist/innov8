import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,

    SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MainLayout from "@/components/MainLayout";
import { ArrowRight, Check, X, CreditCard, BadgePercent } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pyServer } from "@/axios/axios.config";

interface FormData {
    Gender: string;
    Married: string;
    Dependents: string;
    Education: string;
    Self_Employed: string;
    ApplicantIncome: number;
    LoanAmount: number;
    Credit_History: number;
    Property_Area: string;
}

interface CreditScoreData {
    income: number;
    debt: number;
    loan_amount: number;
    credit_history: number;
}

const defaultFormData: FormData = {
    Gender: "Male",
    Married: "Married",
    Dependents: "2",
    Education: "Graduate",
    Self_Employed: "No",
    ApplicantIncome: 5000,
    LoanAmount: 200,
    Credit_History: 1,
    Property_Area: "Urban"
};

const defaultCreditScoreData: CreditScoreData = {
    income: 60000,
    debt: 5000,
    loan_amount: 20000,
    credit_history: 3
};


const calculateCreditScore = (data: CreditScoreData): number => {
    let score = 500;

    score += Math.min(100, (data.income / 1000));

    const debtToIncomeRatio = (data.debt / data.income) * 100;
    if (debtToIncomeRatio < 10) score += 100;
    else if (debtToIncomeRatio < 20) score += 75;
    else if (debtToIncomeRatio < 30) score += 50;
    else if (debtToIncomeRatio < 40) score += 25;
    else score -= 50;

    const loanToIncomeRatio = (data.loan_amount / data.income) * 100;
    if (loanToIncomeRatio < 20) score += 100;
    else if (loanToIncomeRatio < 40) score += 75;
    else if (loanToIncomeRatio < 60) score += 50;
    else if (loanToIncomeRatio < 80) score += 25;
    else score -= 50;

    // Credit history factor (longer history = higher score)
    score += data.credit_history * 25;

    // Clamp score between 300 and 850 (standard credit score range)
    return Math.max(300, Math.min(850, score));
};

const getCreditScoreCategory = (score: number): { category: string; color: string } => {
    if (score >= 750) return { category: "Excellent", color: "text-green-600" };
    if (score >= 700) return { category: "Very Good", color: "text-green-500" };
    if (score >= 650) return { category: "Good", color: "text-blue-500" };
    if (score >= 600) return { category: "Fair", color: "text-yellow-500" };
    if (score >= 550) return { category: "Poor", color: "text-orange-500" };
    return { category: "Very Poor", color: "text-red-600" };
};

const FinancialAssistant = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState<FormData>(defaultFormData);
    const [showPrediction, setShowPrediction] = useState<boolean>(false);
    const [isLoanApproved, setisLoanApproved] = useState<boolean>(false)

    const [creditScoreData, setCreditScoreData] = useState<CreditScoreData>(defaultCreditScoreData);
    const [showCreditScore, setShowCreditScore] = useState<boolean>(false);
    const [creditScore,setCreditScore] = useState<number>()
    const creditScoreCategory = getCreditScoreCategory(creditScore);

    const handleInputChange = (field: keyof FormData, value: string | number) => {
        setFormData({
            ...formData,
            [field]: value,
        });

        if (showPrediction) {
            setShowPrediction(false);
        }
    };

    const handleCreditScoreChange = (field: keyof CreditScoreData, value: number) => {
        setCreditScoreData({
            ...creditScoreData,
            [field]: value,
        });

        if (showCreditScore) {
            setShowCreditScore(false);
        }
    };

    const handleLoanSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let data = await pyServer.post("/predict", formData)
        console.log(data.data)
        if (data.data.prediction == "Loan Grand") {
            toast({
                title: "Form Submitted",
            });
            setShowPrediction(true);
            setisLoanApproved(true)
        } else {
            toast({
                title: "Form Submitted",
                variant: "destructive",
            });
        }
    };

    const handleCreditScoreSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        let data = await pyServer.post("/credit-score", creditScoreData)
        console.log(data.data)
        if (data.data.prediction == "Loan Grand") {
            toast({
                title: "Form Submitted",
            });
            setShowPrediction(true);
            setisLoanApproved(true)
        } else {
            toast({
                title: "Form Submitted",
                variant: "destructive",
            });
        }
    };

    return (
        <MainLayout>
            <div className="container p-6 max-w-6xl animate-fade-up">
                <h1 className="text-2xl font-bold mb-6">Financial Services</h1>

                <Tabs defaultValue="financial-profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="financial-profile" className="flex items-center gap-2">
                            <BadgePercent className="w-4 h-4" />
                            <span>Financial Profile</span>
                        </TabsTrigger>
                        <TabsTrigger value="credit-score" className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span>Credit Score</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="financial-profile">
                        <div className="glass-card p-6 animate-fade-in max-w-4xl mx-auto">
                            <h2 className="text-xl font-semibold mb-6">Your Financial Profile</h2>

                            <form onSubmit={handleLoanSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="gender" className="finance-label">Gender</Label>
                                        <Select
                                            value={formData.Gender}
                                            onValueChange={(value) => handleInputChange("Gender", value)}
                                        >
                                            <SelectTrigger className="finance-select">
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent className="z-50">
                                                <SelectItem value="Male">Male</SelectItem>
                                                <SelectItem value="Female">Female</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="married" className="finance-label">Marital Status</Label>
                                        <Select
                                            value={formData.Married}
                                            onValueChange={(value) => handleInputChange("Married", value)}
                                        >
                                            <SelectTrigger className="finance-select">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent className="z-50">
                                                <SelectItem value="Married">Married</SelectItem>
                                                <SelectItem value="Single">Single</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="dependents" className="finance-label">Dependents</Label>
                                        <Select
                                            value={formData.Dependents}
                                            onValueChange={(value) => handleInputChange("Dependents", value)}
                                        >
                                            <SelectTrigger className="finance-select">
                                                <SelectValue placeholder="Select number" />
                                            </SelectTrigger>
                                            <SelectContent className="z-50">
                                                <SelectItem value="0">0</SelectItem>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3+">3+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="education" className="finance-label">Education</Label>
                                        <Select
                                            value={formData.Education}
                                            onValueChange={(value) => handleInputChange("Education", value)}
                                        >
                                            <SelectTrigger className="finance-select">
                                                <SelectValue placeholder="Select education" />
                                            </SelectTrigger>
                                            <SelectContent className="z-50">
                                                <SelectItem value="Graduate">Graduate</SelectItem>
                                                <SelectItem value="Not Graduate">Not Graduate</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="selfEmployed" className="finance-label">Self Employed</Label>
                                        <Select
                                            value={formData.Self_Employed}
                                            onValueChange={(value) => handleInputChange("Self_Employed", value)}
                                        >
                                            <SelectTrigger className="finance-select">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className="z-50">
                                                <SelectItem value="Yes">Yes</SelectItem>
                                                <SelectItem value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="applicantIncome" className="finance-label">Applicant Income</Label>
                                        <Input
                                            id="applicantIncome"
                                            type="number"
                                            className="finance-input"
                                            value={formData.ApplicantIncome}
                                            onChange={(e) => handleInputChange("ApplicantIncome", Number(e.target.value))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="loanAmount" className="finance-label">Loan Amount</Label>
                                        <Input
                                            id="loanAmount"
                                            type="number"
                                            className="finance-input"
                                            value={formData.LoanAmount}
                                            onChange={(e) => handleInputChange("LoanAmount", Number(e.target.value))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="creditHistory" className="finance-label">Credit History</Label>
                                        <Select
                                            value={String(formData.Credit_History)}
                                            onValueChange={(value) => handleInputChange("Credit_History", Number(value))}
                                        >
                                            <SelectTrigger className="finance-select">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className="z-50">
                                                <SelectItem value="1">1 - Good</SelectItem>
                                                <SelectItem value="0">0 - Limited/Bad</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="propertyArea" className="finance-label">Property Area</Label>
                                        <Select
                                            value={formData.Property_Area}
                                            onValueChange={(value) => handleInputChange("Property_Area", value)}
                                        >
                                            <SelectTrigger className="finance-select">
                                                <SelectValue placeholder="Select area" />
                                            </SelectTrigger>
                                            <SelectContent className="z-50">
                                                <SelectItem value="Urban">Urban</SelectItem>
                                                <SelectItem value="Semiurban">Semiurban</SelectItem>
                                                <SelectItem value="Rural">Rural</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-colors group"
                                >
                                    Save Information
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </form>

                            {showPrediction && (
                                <div className={`mt-8 p-6 rounded-lg border animate-fade-up ${isLoanApproved ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                    <h3 className="text-lg font-semibold mb-2">Loan Sanction Prediction</h3>

                                    <div className="flex items-center gap-3">
                                        {isLoanApproved ? (
                                            <>
                                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                                                    <Check className="h-6 w-6 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-green-700">Your loan is likely to be sanctioned</p>
                                                    <p className="text-sm text-green-600 mt-1">Based on your financial profile, you have a good chance of loan approval.</p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                                                    <X className="h-6 w-6 text-red-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-red-700">Your loan may not be sanctioned</p>
                                                    <p className="text-sm text-red-600 mt-1">Consider improving your credit history or reducing the loan amount.</p>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="mt-4 text-sm text-gray-500">
                                        <p>This is a preliminary assessment based on the information provided.</p>
                                        <p>Actual loan approval depends on the lending institution's policies.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="credit-score">
                        <div className="glass-card p-6 animate-fade-in max-w-4xl mx-auto">
                            <h2 className="text-xl font-semibold mb-6">Credit Score Calculator</h2>

                            <form onSubmit={handleCreditScoreSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="income" className="finance-label">Annual Income</Label>
                                        <Input
                                            id="income"
                                            type="number"
                                            className="finance-input"
                                            value={creditScoreData.income}
                                            onChange={(e) => handleCreditScoreChange("income", Number(e.target.value))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="debt" className="finance-label">Current Debt</Label>
                                        <Input
                                            id="debt"
                                            type="number"
                                            className="finance-input"
                                            value={creditScoreData.debt}
                                            onChange={(e) => handleCreditScoreChange("debt", Number(e.target.value))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="loan_amount" className="finance-label">Loan Amount</Label>
                                        <Input
                                            id="loan_amount"
                                            type="number"
                                            className="finance-input"
                                            value={creditScoreData.loan_amount}
                                            onChange={(e) => handleCreditScoreChange("loan_amount", Number(e.target.value))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="credit_history" className="finance-label">Credit History (Years)</Label>
                                        <Input
                                            id="credit_history"
                                            type="number"
                                            className="finance-input"
                                            value={creditScoreData.credit_history}
                                            onChange={(e) => handleCreditScoreChange("credit_history", Number(e.target.value))}
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-colors group"
                                >
                                    Calculate Credit Score
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </form>

                            {showCreditScore && (
                                <div className="mt-8 p-6 rounded-lg border bg-slate-50 border-slate-200 animate-fade-up">
                                    <h3 className="text-lg font-semibold mb-4">Your Credit Score</h3>

                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-48 h-48 rounded-full bg-white border-8 border-blue-200 flex items-center justify-center mb-6 shadow-md">
                                            <div className="text-center">
                                                <div className="text-4xl font-bold text-blue-600">{creditScore}</div>
                                                <div className={`text-sm font-medium mt-1 ${creditScoreCategory.color}`}>
                                                    {creditScoreCategory.category}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full max-w-md bg-white rounded-lg p-4 shadow-sm">
                                            <h4 className="text-sm font-medium text-gray-500 mb-2">Credit Score Breakdown</h4>

                                            <div className="space-y-3">
                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>Payment History</span>
                                                        <span className="font-medium">Very Good</span>
                                                    </div>
                                                    <div className="h-2 bg-gray-200 rounded-full">
                                                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>Credit Utilization</span>
                                                        <span className="font-medium">Good</span>
                                                    </div>
                                                    <div className="h-2 bg-gray-200 rounded-full">
                                                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>Length of Credit History</span>
                                                        <span className="font-medium">{creditScoreData.credit_history} Years</span>
                                                    </div>
                                                    <div className="h-2 bg-gray-200 rounded-full">
                                                        <div
                                                            className="h-2 bg-blue-500 rounded-full"
                                                            style={{ width: `${Math.min(100, creditScoreData.credit_history * 10)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 text-sm text-gray-500 text-center">
                                            <p>This is a simulated credit score calculation.</p>
                                            <p>Actual credit scores depend on many factors and are calculated by credit bureaus.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </MainLayout>
    );
};

export default FinancialAssistant;

