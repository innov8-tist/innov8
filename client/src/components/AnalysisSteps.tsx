interface AnalysisStepsProps {
  steps: string[];
  isOpen: boolean;
}

const AnalysisSteps = ({ steps, isOpen }: AnalysisStepsProps) => {
  if (!isOpen) return null;

  return (
    <div className="steps-container animate-fade-down bg-finance-step-bg">
      <div className="p-5 text-sm text-finance-neutral space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="step-item">
            {step === "-----------------------------------------------------" ? (
              <div className="my-3 border-t border-gray-200 dark:border-gray-700"></div>
            ) : (
              <p className="whitespace-pre-line font-mono">{step}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisSteps;

