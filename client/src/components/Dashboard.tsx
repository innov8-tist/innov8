
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "./Layout";
import MetricCard from "./MetricCard";
import CircularProgress from "./CircularProgress";
import ExpenseDonut from "./ExpenseDonut";
import BalanceChart from "./BalanceChart";
import PlanningList from "./PlanningList";
import IncomeBarChart from "./IncomeBarChart";
import TransactionList from "./TransactionList";
import CreditCard from "./CreditCard";
import {
    fetchMetrics,
    fetchExpenseCategories,
    fetchLimits,
    fetchTotalBalanceData,
    fetchPlanningItems,
    fetchIncomeSources,
    fetchTransactions,
    fetchCards
} from "../lib/data/financeData";
import {
    ChartDataPoint,
    ExpenseCategory,
    FinancialMetric,
    IncomeSource,
    Limit,
    PlanningItem,
    Transaction,
    Card as CardType
} from "@/types/finance";


const Dashboard = () => {
    const [metrics, setMetrics] = useState<FinancialMetric[] | null>(null);
    const [expenses, setExpenses] = useState<ExpenseCategory[] | null>(null);
    const [limits, setLimits] = useState<Limit[] | null>(null);
    const [balanceData, setBalanceData] = useState<ChartDataPoint[] | null>(null);
    const [planningItems, setPlanningItems] = useState<PlanningItem[] | null>(null);
    const [incomeSources, setIncomeSources] = useState<IncomeSource[] | null>(null);
    const [transactions, setTransactions] = useState<Transaction[] | null>(null);
    const [cards, setCards] = useState<CardType[] | null>(null);

    const [loading, setLoading] = useState({
        metrics: true,
        expenses: true,
        limits: true,
        balanceData: true,
        planningItems: true,
        incomeSources: true,
        transactions: true,
        cards: true
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                // Fetch all data with timeouts to simulate API calls
                fetchMetrics().then(data => {
                    setMetrics(data);
                    setLoading(prev => ({ ...prev, metrics: false }));
                });

                fetchExpenseCategories().then(data => {
                    setExpenses(data);
                    setLoading(prev => ({ ...prev, expenses: false }));
                });

                fetchLimits().then(data => {
                    setLimits(data);
                    setLoading(prev => ({ ...prev, limits: false }));
                });

                fetchTotalBalanceData().then(data => {
                    setBalanceData(data);
                    setLoading(prev => ({ ...prev, balanceData: false }));
                });

                fetchPlanningItems().then(data => {
                    setPlanningItems(data);
                    setLoading(prev => ({ ...prev, planningItems: false }));
                });

                fetchIncomeSources().then(data => {
                    setIncomeSources(data);
                    setLoading(prev => ({ ...prev, incomeSources: false }));
                });

                fetchTransactions().then(data => {
                    setTransactions(data);
                    setLoading(prev => ({ ...prev, transactions: false }));
                });

                fetchCards().then(data => {
                    setCards(data);
                    setLoading(prev => ({ ...prev, cards: false }));
                });
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        loadData();
    }, []);

    const totalBalanceMetric = metrics?.find(m => m.id === "total-balance") || null;
    const incomeMetric = metrics?.find(m => m.id === "income") || null;
    const expensesMetric = metrics?.find(m => m.id === "expenses") || null;

    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {/* Top row metrics */}
                <div>
                    <MetricCard
                        metric={totalBalanceMetric}
                        color="#9b87f5"
                        gradientId="purpleGradient"
                        isLoading={loading.metrics}
                    />
                </div>
                <div>
                    <MetricCard
                        metric={incomeMetric}
                        color="#e76ac3"
                        gradientId="pinkGradient"
                        isLoading={loading.metrics}
                    />
                </div>
                <div>
                    <MetricCard
                        metric={expensesMetric}
                        color="#0EA5E9"
                        gradientId="blueGradient"
                        isLoading={loading.metrics}
                    />
                </div>
                <div>
                    <Card className="card-hover">
                        <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-base">Limits</CardTitle>
                                <Button variant="ghost" size="sm" className="h-8 p-0">
                                    Edit limits ▾
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2 space-y-4">
                            {loading.limits ? (
                                <>
                                    <div className="space-y-1">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-2 w-full" />
                                        <div className="flex justify-between">
                                            <Skeleton className="h-3 w-16" />
                                            <Skeleton className="h-3 w-16" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-2 w-full" />
                                        <div className="flex justify-between">
                                            <Skeleton className="h-3 w-16" />
                                            <Skeleton className="h-3 w-16" />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                limits?.map(limit => (
                                    <div key={limit.id} className="space-y-1">
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: limit.color }}></div>
                                            <div className="text-sm font-medium">{limit.title}</div>
                                        </div>
                                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: `${(limit.current / limit.max) * 100}%`,
                                                    backgroundColor: limit.color
                                                }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span>${limit.current}</span>
                                            <span>${limit.max}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-4 mb-6">
                {/* Middle row */}
                <div className="lg:col-span-3">
                    <ExpenseDonut
                        categories={expenses}
                        isLoading={loading.expenses}
                    />
                </div>
                <div className="lg:col-span-6">
                    {
                        balanceData && 
                        <BalanceChart
                            data={balanceData}
                            isLoading={loading.balanceData}
                        />
                    }
                </div>
                <div className="lg:col-span-3">
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <div className="text-base font-medium">My Cards</div>
                                <Button variant="ghost" size="sm" className="h-6 p-0 text-xs">
                                    Add new +
                                </Button>
                            </div>
                            <CreditCard
                                card={cards ? cards[0] : null}
                                isLoading={loading.cards}
                            />
                        </div>

                        <div>
                            <TransactionList
                                transactions={transactions}
                                isLoading={loading.transactions}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bottom row */}
                <div>
                    <IncomeBarChart
                        incomeSources={incomeSources}
                        isLoading={loading.incomeSources}
                    />
                </div>
                <div>
                    <PlanningList
                        items={planningItems}
                        isLoading={loading.planningItems}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;

