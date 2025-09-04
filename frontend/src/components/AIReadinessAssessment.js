import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, AlertTriangle, TrendingUp, Download } from 'lucide-react';
import { toast } from 'sonner';

const AIReadinessAssessment = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'strategy',
      title: 'AI Strategy & Leadership',
      question: 'How would you describe your organization\'s AI strategy maturity?',
      options: [
        { value: 1, label: 'No formal AI strategy exists', weight: 1 },
        { value: 2, label: 'Basic AI awareness, exploring opportunities', weight: 2 },
        { value: 3, label: 'Defined AI strategy with some pilot projects', weight: 3 },
        { value: 4, label: 'Comprehensive AI roadmap with active initiatives', weight: 4 },
        { value: 5, label: 'AI-first organization with proven ROI', weight: 5 }
      ]
    },
    {
      id: 'data',
      title: 'Data Infrastructure',
      question: 'How would you rate your data quality and accessibility?',
      options: [
        { value: 1, label: 'Data is siloed and difficult to access', weight: 1 },
        { value: 2, label: 'Some data integration, quality issues exist', weight: 2 },
        { value: 3, label: 'Decent data infrastructure, some gaps', weight: 3 },
        { value: 4, label: 'Good data quality and accessibility', weight: 4 },
        { value: 5, label: 'Excellent data infrastructure and governance', weight: 5 }
      ]
    },
    {
      id: 'governance',
      title: 'AI Governance & Compliance',
      question: 'What is your current approach to AI governance and compliance?',
      options: [
        { value: 1, label: 'No formal governance framework', weight: 1 },
        { value: 2, label: 'Basic compliance awareness', weight: 2 },
        { value: 3, label: 'Some governance policies in development', weight: 3 },
        { value: 4, label: 'Established governance framework', weight: 4 },
        { value: 5, label: 'Comprehensive governance with regular audits', weight: 5 }
      ]
    },
    {
      id: 'talent',
      title: 'AI Talent & Skills',
      question: 'How would you assess your team\'s AI capabilities?',
      options: [
        { value: 1, label: 'Limited AI knowledge across the organization', weight: 1 },
        { value: 2, label: 'Some AI awareness, need significant training', weight: 2 },
        { value: 3, label: 'Mixed capabilities, some AI-savvy team members', weight: 3 },
        { value: 4, label: 'Good AI skills in key areas', weight: 4 },
        { value: 5, label: 'Strong AI capabilities across the organization', weight: 5 }
      ]
    },
    {
      id: 'technology',
      title: 'Technology Infrastructure',
      question: 'How ready is your technology infrastructure for AI deployment?',
      options: [
        { value: 1, label: 'Legacy systems, significant modernization needed', weight: 1 },
        { value: 2, label: 'Some modern systems, integration challenges', weight: 2 },
        { value: 3, label: 'Decent infrastructure, some cloud adoption', weight: 3 },
        { value: 4, label: 'Modern infrastructure with cloud capabilities', weight: 4 },
        { value: 5, label: 'AI-ready infrastructure with MLOps capabilities', weight: 5 }
      ]
    }
  ];

  const handleAnswer = (questionId, value, weight) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { value, weight }
    }));
  };

  const calculateScore = () => {
    const totalWeight = Object.values(answers).reduce((sum, answer) => sum + answer.weight, 0);
    const maxWeight = questions.length * 5;
    return Math.round((totalWeight / maxWeight) * 100);
  };

  const getScoreLevel = (score) => {
    if (score >= 80) return { level: 'Advanced', color: 'green', description: 'Your organization is well-positioned for AI transformation' };
    if (score >= 60) return { level: 'Intermediate', color: 'blue', description: 'Good foundation with some areas for improvement' };
    if (score >= 40) return { level: 'Developing', color: 'yellow', description: 'Basic readiness with significant opportunities' };
    return { level: 'Beginning', color: 'red', description: 'Early stage - focus on foundational elements first' };
  };

  const getRecommendations = (score) => {
    if (score >= 80) {
      return [
        'Focus on advanced AI implementations and scaling',
        'Consider GenAI and copilot development',
        'Implement advanced MLOps and monitoring',
        'Explore industry-specific AI solutions'
      ];
    }
    if (score >= 60) {
      return [
        'Strengthen data governance and quality',
        'Expand AI training programs',
        'Pilot AI projects in high-value areas',
        'Develop comprehensive AI governance'
      ];
    }
    if (score >= 40) {
      return [
        'Create formal AI strategy and roadmap',
        'Invest in data infrastructure improvements',
        'Build AI literacy across the organization',
        'Establish basic governance framework'
      ];
    }
    return [
      'Start with AI strategy development',
      'Assess and improve data quality',
      'Begin AI education and awareness programs',
      'Focus on foundational technology upgrades'
    ];
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const downloadResults = () => {
    const score = calculateScore();
    const scoreLevel = getScoreLevel(score);
    const recommendations = getRecommendations(score);
    
    const content = `
KaleidoSpark AI Readiness Assessment Results

Overall Score: ${score}/100 (${scoreLevel.level})
${scoreLevel.description}

Detailed Scores:
${questions.map(q => {
  const answer = answers[q.id];
  return `${q.title}: ${answer ? answer.weight : 0}/5`;
}).join('\n')}

Recommendations:
${recommendations.map(rec => `• ${rec}`).join('\n')}

Next Steps:
Contact KaleidoSpark for a personalized consultation to discuss your AI transformation roadmap.
Email: hello@kaleidospark.com
Phone: +1 (555) 123-4567
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai_readiness_assessment_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Assessment results downloaded!');
  };

  if (!isOpen) return null;

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {!showResults ? (
          <>
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">AI Readiness Assessment</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Question {currentStep + 1} of {questions.length}
              </p>
            </div>

            {/* Question */}
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentQuestion.title}</h3>
                <p className="text-gray-700">{currentQuestion.question}</p>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentQuestion.id, option.value, option.weight)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      answers[currentQuestion.id]?.value === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">{option.label}</span>
                      {answers[currentQuestion.id]?.value === option.value && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="p-6 border-t border-gray-200 flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="btn-secondary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
              
              <button
                onClick={nextStep}
                disabled={!answers[currentQuestion.id]}
                className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === questions.length - 1 ? 'View Results' : 'Next'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </>
        ) : (
          /* Results */
          <div className="p-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your AI Readiness Score</h2>
              
              {(() => {
                const score = calculateScore();
                const scoreLevel = getScoreLevel(score);
                return (
                  <div className="mb-6">
                    <div className={`text-6xl font-bold mb-2 ${
                      scoreLevel.color === 'green' ? 'text-green-600' :
                      scoreLevel.color === 'blue' ? 'text-blue-600' :
                      scoreLevel.color === 'yellow' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {score}
                    </div>
                    <div className="text-lg text-gray-600">out of 100</div>
                    <div className={`inline-flex px-4 py-2 rounded-full text-sm font-medium mt-4 ${
                      scoreLevel.color === 'green' ? 'bg-green-100 text-green-800' :
                      scoreLevel.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                      scoreLevel.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {scoreLevel.level} Readiness
                    </div>
                    <p className="text-gray-600 mt-4">{scoreLevel.description}</p>
                  </div>
                );
              })()}
            </div>

            {/* Detailed Breakdown */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Breakdown</h3>
              <div className="space-y-3">
                {questions.map(question => {
                  const answer = answers[question.id];
                  const percentage = answer ? (answer.weight / 5) * 100 : 0;
                  
                  return (
                    <div key={question.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{question.title}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              percentage >= 80 ? 'bg-green-500' :
                              percentage >= 60 ? 'bg-blue-500' :
                              percentage >= 40 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">{answer?.weight || 0}/5</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Next Steps</h3>
              <div className="space-y-3">
                {getRecommendations(calculateScore()).map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{recommendation}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={downloadResults}
                className="btn-secondary flex items-center justify-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Results
              </button>
              <button
                onClick={resetAssessment}
                className="btn-secondary flex items-center justify-center"
              >
                Retake Assessment
              </button>
              <button
                onClick={onClose}
                className="btn-primary flex items-center justify-center"
              >
                Book Strategy Session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIReadinessAssessment;