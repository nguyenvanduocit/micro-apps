import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

type DimensionQuestion = {
  id: string;
  dimension: string;
  question: string;
  description: string;
  category: 'technical' | 'team' | 'product';
  weight?: number; // Optional weight for prioritization
};

type SurveyResults = {
  [key: string]: number;
};

export default function DXCore4Survey() {
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState<SurveyResults>({});
  const [teamName, setTeamName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'intro' | 'survey' | 'results'>('intro');
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // DX Core 4 survey questions
  const surveyQuestions: DimensionQuestion[] = [
    {
      id: 'deep_work',
      dimension: 'Deep Work',
      question: 'Bạn có thể tập trung làm việc không bị gián đoạn trong hơn 2 giờ thường xuyên đến mức nào?',
      description: 'Khả năng tập trung vào các task phức tạp mà không bị gián đoạn hoặc chuyển đổi context',
      category: 'team',
      weight: 2.5 // Very high priority - currently main team focus
    },
    {
      id: 'local_iteration',
      dimension: 'Local Iteration',
      question: 'Môi trường develop/test cục bộ của bạn nhanh và đáng tin cậy đến mức nào?',
      description: 'Tốc độ và độ tin cậy của môi trường develop cục bộ cho công việc lặp đi lặp lại',
      category: 'technical',
      weight: 1.0 // Standard priority
    },
    {
      id: 'release_process',
      dimension: 'Release Process',
      question: 'Quy trình đưa code lên môi trường production đáng tin cậy đến mức nào?',
      description: 'Hiệu quả và độ tin cậy của quy trình deploy',
      category: 'technical',
      weight: 1.0 // Standard priority
    },
    {
      id: 'making_changes',
      dimension: 'Making Changes',
      question: 'Bạn tự tin đến mức nào khi thực hiện thay đổi đối với code không quen thuộc?',
      description: 'Mức độ thoải mái khi sửa đổi code bạn không viết hoặc không quen thuộc',
      category: 'technical',
      weight: 1.0 // Standard priority
    },
    {
      id: 'technical_debt',
      dimension: 'Technical Debt',
      question: 'Nợ kỹ thuật làm chậm quá trình develop đến mức nào?',
      description: 'Tác động của code cũ, quyết định thiết kế kém, hoặc lối tắt đến tốc độ develop',
      category: 'technical',
      weight: 1.0 // Standard priority
    },
    {
      id: 'architecture',
      dimension: 'Architecture',
      question: 'Kiến trúc hệ thống rõ ràng đối với nhóm đến mức nào?',
      description: 'Hiểu biết về các thành phần hệ thống, ranh giới và tương tác',
      category: 'technical',
      weight: 1.0 // Standard priority
    },
    {
      id: 'tooling',
      dimension: 'Tooling',
      question: 'Công cụ develop hỗ trợ công việc hàng ngày của bạn tốt đến mức nào?',
      description: 'Hiệu quả của công cụ cho develop, testing và debug',
      category: 'technical',
      weight: 1.0 // Standard priority
    },
    {
      id: 'documentation',
      dimension: 'Documentation',
      question: 'Tài liệu hiện có hữu ích cho công việc của bạn đến mức nào?',
      description: 'Chất lượng và khả năng tiếp cận của tài liệu cho codebase và quy trình',
      category: 'technical',
      weight: 1.0 // Standard priority
    },
    {
      id: 'onboarding',
      dimension: 'Onboarding',
      question: 'Quy trình onboarding cho thành viên mới trong team hiệu quả đến mức nào?',
      description: 'Mức độ dễ dàng giúp engineer mới làm việc hiệu quả trong team',
      category: 'team',
      weight: 2.0 // High priority - currently focusing on team dimensions
    },
    {
      id: 'team_processes',
      dimension: 'Team Processes',
      question: 'Quy trình team hỗ trợ productivity tốt đến mức nào?',
      description: 'Hiệu quả của các nghi thức team, kênh communication và quy trình làm việc',
      category: 'team',
      weight: 2.2 // High priority - currently focusing on team dimensions
    },
    {
      id: 'collaboration',
      dimension: 'Collaboration',
      question: 'Team cộng tác hiệu quả trên các project đến mức nào?',
      description: 'Chất lượng làm việc nhóm cross-functional và knowledge sharing',
      category: 'team',
      weight: 2.3 // High priority - currently focusing on team dimensions
    },
    {
      id: 'vision',
      dimension: 'Vision',
      question: 'Tầm nhìn sản phẩm rõ ràng đối với đội ngũ technical đến mức nào?',
      description: 'Hiểu biết về mục tiêu và chiến lược sản phẩm dài hạn',
      category: 'product',
      weight: 1.0 // Standard priority
    },
    {
      id: 'requirements',
      dimension: 'Requirements',
      question: 'Yêu cầu rõ ràng và đầy đủ trước khi implement đến mức nào?',
      description: 'Chất lượng của đặc tả và yêu cầu được cung cấp trước khi bắt đầu công việc',
      category: 'product',
      weight: 1.0 // Standard priority
    },
    {
      id: 'product_management',
      dimension: 'Product Management',
      question: 'Sự hợp tác với quản lý sản phẩm hiệu quả đến mức nào?',
      description: 'Mối quan hệ làm việc giữa technical và quản lý sản phẩm',
      category: 'product',
      weight: 1.0 // Standard priority
    }
  ];

  // Calculate DXI score (0-100)
  const calculateDXI = (results: SurveyResults): number => {
    if (Object.keys(results).length === 0) return 0;
    
    // Calculate weighted sum using question weights
    let weightedSum = 0;
    let totalWeight = 0;
    
    surveyQuestions.forEach(question => {
      const score = results[question.id] || 0;
      const weight = question.weight || 1.0; // Default weight of 1.0 if not specified
      
      weightedSum += score * weight;
      totalWeight += weight;
    });
    
    // Calculate weighted average (out of 10) and convert to 0-100 scale
    const weightedAverage = totalWeight > 0 ? weightedSum / totalWeight : 0;
    return Math.round((weightedAverage / 10) * 100);
  };

  // Get dimension score category
  const getScoreCategory = (score: number): string => {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Needs Improvement';
    return 'Critical Attention Required';
  };

  // Handle rating selection
  const handleRatingSelect = (questionId: string, rating: number) => {
    setResults(prev => ({
      ...prev,
      [questionId]: rating
    }));
    
    // Move to next question with a slight delay for UX
    setTimeout(() => {
      // If last question, show results and auto-submit
      if (currentStep >= surveyQuestions.length - 1) {
        setActiveTab('results');
        // Auto-submit when finishing the survey
        if (!isSubmitted && submissionStatus !== 'submitting') {
          handleSubmit();
        }
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }, 300);
  };

  // Handle survey submission
  const handleSubmit = async () => {
    // Prepare data to send
    const submissionData = {
      teamName,
      results,
      dxiScore: calculateDXI(results),
      timestamp: new Date().toISOString(),
      categoryScores: getCategoryScores()
    };

    try {
      setIsSubmitted(true);
      setSubmissionStatus('submitting');

      // Send data to webhook
      const response = await fetch('https://n10n.aiocean.dev/webhook/c67dc58a-b20e-4ebf-bfe3-3b5c11352c8f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error(`Submission failed: ${response.status}`);
      }

      setSubmissionStatus('success');
      console.log('Survey submitted successfully');
    } catch (error) {
      console.error('Error submitting survey:', error);
      // Reset submitted state if there was an error
      setSubmissionStatus('error');
      setIsSubmitted(false);
    }
  };

  // Prepare data for radar chart
  const prepareRadarData = () => {
    return surveyQuestions.map(q => ({
      dimension: q.dimension,
      value: results[q.id] || 0,
      fullMark: 10,
      category: q.category
    }));
  };

  // Get category-specific scores (with weights)
  const getCategoryScores = () => {
    const categories = {
      technical: { score: 0, totalWeight: 0, dimensions: [] as string[] },
      team: { score: 0, totalWeight: 0, dimensions: [] as string[] },
      product: { score: 0, totalWeight: 0, dimensions: [] as string[] }
    };

    surveyQuestions.forEach(q => {
      const score = results[q.id] || 0;
      const weight = q.weight || 1.0; // Default weight of 1.0 if not specified
      
      categories[q.category].score += score * weight;
      categories[q.category].totalWeight += weight;
      categories[q.category].dimensions.push(q.dimension);
    });

    return {
      technical: categories.technical.totalWeight > 0 ? 
        Math.round((categories.technical.score / categories.technical.totalWeight) * 10) : 0,
      team: categories.team.totalWeight > 0 ? 
        Math.round((categories.team.score / categories.team.totalWeight) * 10) : 0,
      product: categories.product.totalWeight > 0 ? 
        Math.round((categories.product.score / categories.product.totalWeight) * 10) : 0,
      dimensions: {
        technical: categories.technical.dimensions,
        team: categories.team.dimensions,
        product: categories.product.dimensions
      }
    };
  };

  // Modify setActiveTab to trigger submission when viewing results
  useEffect(() => {
    if (activeTab === 'results' && !isSubmitted && submissionStatus !== 'submitting' && Object.keys(results).length > 0) {
      handleSubmit();
    }
  }, [activeTab, isSubmitted, submissionStatus, results]);

  // Render the intro tab
  const renderIntroTab = () => {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">Developer Experience (DX) Core 4 Survey</h1>
        <p className="mb-6 text-gray-700 max-w-4xl mx-auto">
          This survey measures the 14 dimensions of developer experience that make up the Developer Experience Index (DXI),
          a key component of the Effectiveness dimension in the DX Core 4 framework.
          Some dimensions have higher weights as they impact developer productivity more significantly.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
              <div className="h-4 w-4 bg-blue-500 rounded-full mr-2"></div>
              Technical Dimensions
            </h3>
            <ul className="text-sm text-left text-gray-700 space-y-2">
              {surveyQuestions.filter(q => q.category === 'technical').map(q => (
                <li key={q.id} className="flex items-center">
                  <span className="text-blue-400 mr-2">•</span>
                  {q.dimension}
                  {q.weight && q.weight > 1.0 && (
                    <span className="ml-2 text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
                      {q.weight}x
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <h3 className="font-semibold text-purple-800 mb-3 flex items-center">
              <div className="h-4 w-4 bg-purple-500 rounded-full mr-2"></div>
              Team Dimensions
            </h3>
            <ul className="text-sm text-left text-gray-700 space-y-2">
              {surveyQuestions.filter(q => q.category === 'team').map(q => (
                <li key={q.id} className="flex items-center">
                  <span className="text-purple-400 mr-2">•</span>
                  {q.dimension}
                  {q.weight && q.weight > 1.0 && (
                    <span className="ml-2 text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
                      {q.weight}x
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <h3 className="font-semibold text-orange-800 mb-3 flex items-center">
              <div className="h-4 w-4 bg-orange-500 rounded-full mr-2"></div>
              Product Dimensions
            </h3>
            <ul className="text-sm text-left text-gray-700 space-y-2">
              {surveyQuestions.filter(q => q.category === 'product').map(q => (
                <li key={q.id} className="flex items-center">
                  <span className="text-orange-400 mr-2">•</span>
                  {q.dimension}
                  {q.weight && q.weight > 1.0 && (
                    <span className="ml-2 text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
                      {q.weight}x
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-1">Team Name (Optional)</label>
          <input
            type="text"
            id="teamName"
            className="w-full max-w-md mx-auto px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter your team name"
          />
        </div>

        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => {
            setActiveTab('survey');
            setCurrentStep(0);
          }}
        >
          Start Survey
        </button>
      </div>
    );
  };

  // Render the survey tab
  const renderSurveyTab = () => {
    const currentQuestion = surveyQuestions[currentStep];
    
    if (!currentQuestion) {
      // Redirect to intro if currentQuestion is undefined
      setActiveTab('intro');
      setCurrentStep(0);
      return null;
    }

    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">DX Core 4 Survey</h1>
          <span className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            Question {currentStep + 1} of {surveyQuestions.length}
          </span>
        </div>
        
        <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
          <div 
            className="h-2 bg-blue-600 rounded-full" 
            style={{ width: `${((currentStep + 1) / surveyQuestions.length) * 100}%` }}
          ></div>
        </div>
        
        <div className={`bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 ${
          currentQuestion.category === 'technical' ? 'border-blue-500' :
          currentQuestion.category === 'team' ? 'border-purple-500' :
          'border-orange-500'
        }`}>
          <div className="flex items-center mb-4">
            <span className={`text-xs px-2 py-0.5 rounded-full mr-2 ${
              currentQuestion.category === 'technical' ? 'bg-blue-100 text-blue-800' :
              currentQuestion.category === 'team' ? 'bg-purple-100 text-purple-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              {currentQuestion.category.charAt(0).toUpperCase() + currentQuestion.category.slice(1)}
            </span>
            <h2 className="text-xl font-bold text-gray-900">
              {currentQuestion.dimension}
            </h2>
          </div>
          
          <p className="text-lg mb-3 text-gray-800 font-medium">{currentQuestion.question}</p>
          <p className="text-sm text-gray-600 mb-6 italic">{currentQuestion.description}</p>
          
          <div className="rating-scale">
            <div className="flex justify-between mb-2 text-sm text-gray-500">
              <span>Not satisfied</span>
              <span>Very satisfied</span>
            </div>
            <div className="grid grid-cols-11 gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rating => (
                <button
                  key={rating}
                  className={`h-12 rounded-md focus:outline-none transition-all ${
                    (results[currentQuestion.id] === rating) 
                      ? `${
                        currentQuestion.category === 'technical' ? 'bg-blue-600' :
                        currentQuestion.category === 'team' ? 'bg-purple-600' :
                        'bg-orange-600'
                      } text-white font-bold` 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => handleRatingSelect(currentQuestion.id, rating)}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => {
              if (currentStep > 0) {
                setCurrentStep(prev => prev - 1);
              } else {
                setActiveTab('intro');
              }
            }}
          >
            {currentStep > 0 ? 'Previous' : 'Back to Intro'}
          </button>
          
          <div>
            <button
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors mr-2"
              onClick={() => {
                // If last question, show results
                if (currentStep >= surveyQuestions.length - 1) {
                  setActiveTab('results');
                } else {
                  setCurrentStep(prev => prev + 1);
                }
              }}
            >
              Skip
            </button>
            
            {currentStep >= surveyQuestions.length - 1 && (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => setActiveTab('results')}
              >
                View Results
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render the results tab
  const renderResultsTab = () => {
    const dxiScore = calculateDXI(results);
    const scoreCategory = getScoreCategory(dxiScore);
    const categoryScores = getCategoryScores();
    const radarData = prepareRadarData();
    
    // Find improvement areas (scores <= 5)
    const improvementAreas = surveyQuestions
      .filter(q => (results[q.id] || 0) <= 5)
      .sort((a, b) => (results[a.id] || 0) - (results[b.id] || 0))
      .slice(0, 3);
    
    // Find strengths (scores >= 8)
    const strengths = surveyQuestions
      .filter(q => (results[q.id] || 0) >= 8)
      .sort((a, b) => (results[b.id] || 0) - (results[a.id] || 0))
      .slice(0, 3);
    
    return (
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">Your DX Core 4 Results</h1>
        
        {teamName && (
          <p className="text-center text-gray-700 mb-4">Team: {teamName}</p>
        )}
        
        {submissionStatus === 'success' && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-800 rounded flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Survey successfully submitted. Thank you for your feedback!
          </div>
        )}

        {submissionStatus === 'error' && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-800 rounded flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            There was an error submitting your survey. Please try again.
          </div>
        )}

        {submissionStatus === 'submitting' && (
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded flex items-center justify-center">
            <svg className="animate-spin w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting your survey...
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500 text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Developer Experience Index</h2>
            <div className="mb-3">
              <span className="text-5xl font-bold text-blue-700">{dxiScore}</span>
              <span className="text-2xl text-gray-500">/100</span>
            </div>
            <p className={`text-lg font-medium mb-2 ${
              dxiScore >= 80 ? 'text-green-600' :
              dxiScore >= 70 ? 'text-blue-600' :
              dxiScore >= 50 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {scoreCategory}
            </p>
            <p className="text-sm text-gray-600">
              Each 1-point improvement = ~13 min saved per developer per week
            </p>
            <div className="mt-2 px-3 py-1 bg-purple-50 rounded-md border border-purple-100 text-xs text-purple-800">
              Current focus: Team dimensions have higher weights
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Dimension Categories</h2>
            <div className="flex flex-wrap justify-around items-center h-full">
              <div className="text-center px-6 py-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="font-bold text-4xl text-blue-700 mb-1">{categoryScores.technical}</div>
                <div className="text-sm text-blue-900 font-medium uppercase tracking-wide">Technical</div>
                <div className="mt-2 w-16 h-1 bg-blue-400 mx-auto rounded-full"></div>
              </div>
              
              <div className="text-center px-6 py-4 bg-purple-50 rounded-lg border border-purple-100">
                <div className="font-bold text-4xl text-purple-700 mb-1">{categoryScores.team}</div>
                <div className="text-sm text-purple-900 font-medium uppercase tracking-wide">Team</div>
                <div className="mt-2 w-16 h-1 bg-purple-400 mx-auto rounded-full"></div>
              </div>
              
              <div className="text-center px-6 py-4 bg-orange-50 rounded-lg border border-orange-100">
                <div className="font-bold text-4xl text-orange-700 mb-1">{categoryScores.product}</div>
                <div className="text-sm text-orange-900 font-medium uppercase tracking-wide">Product</div>
                <div className="mt-2 w-16 h-1 bg-orange-400 mx-auto rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Dimension Breakdown</h2>
            <div className="max-h-96 overflow-y-auto pr-2">
              <div className="space-y-3">
                {surveyQuestions.map(question => {
                  const score = results[question.id] || 0;
                  const percentage = (score / 10) * 100;
                  
                  return (
                    <div key={question.id} className="flex flex-col text-left">
                      <div className="flex justify-between mb-1">
                        <div className="font-medium text-sm flex items-center">
                          {question.dimension}
                          {question.weight && question.weight > 1.0 && (
                            <span className="ml-2 text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
                              {question.weight}x
                            </span>
                          )}
                        </div>
                        <div className={`text-sm font-bold ${
                          score >= 8 ? 'text-green-700' : 
                          score >= 6 ? 'text-blue-700' : 
                          score >= 4 ? 'text-yellow-700' : 
                          'text-red-700'
                        }`}>
                          {score}/10
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            question.category === 'technical' ? 'bg-blue-500' :
                            question.category === 'team' ? 'bg-purple-500' :
                            'bg-orange-500'
                          }`} 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Dimension Radar</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fontSize: 10 }} />
                <Radar
                  name="Developer Experience"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Priority Improvement Areas</h2>
            {improvementAreas.length > 0 ? (
              <ul className="space-y-3">
                {improvementAreas.map(area => (
                  <li key={area.id} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3 mt-1">!</span>
                    <div>
                      <div className="font-medium flex items-center">
                        {area.dimension} 
                        <span className="text-red-700 font-bold ml-1">({results[area.id] || 0}/10)</span>
                        {area.weight && area.weight > 1.0 && (
                          <span className="ml-2 text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
                            {area.weight}x priority
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{area.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No critical improvement areas identified.</p>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Team Strengths</h2>
            {strengths.length > 0 ? (
              <ul className="space-y-3">
                {strengths.map(area => (
                  <li key={area.id} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-1">✓</span>
                    <div>
                      <div className="font-medium flex items-center">
                        {area.dimension} 
                        <span className="text-green-700 font-bold ml-1">({results[area.id] || 0}/10)</span>
                        {area.weight && area.weight > 1.0 && (
                          <span className="ml-2 text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
                            {area.weight}x priority
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{area.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">Complete the survey to identify your team's strengths.</p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          {submissionStatus !== 'success' && (
            <button
              className={`px-6 py-2 ${submissionStatus === 'submitting' ? 'bg-gray-400' :
                submissionStatus === 'error' ? 'bg-red-600' :
                  'bg-blue-600'
                } text-white rounded-md hover:${submissionStatus === 'submitting' ? 'bg-gray-400' :
                  submissionStatus === 'error' ? 'bg-red-700' :
                    'bg-blue-700'
                } transition-colors mr-3 flex items-center`}
              onClick={handleSubmit}
              disabled={isSubmitted || submissionStatus === 'submitting'}
            >
              {submissionStatus === 'submitting' && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {submissionStatus === 'submitting' ? 'Submitting...' :
                submissionStatus === 'error' ? 'Try Again' :
                  'Submit Results'}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header - consistent with dashboard */}
      <header className="bg-white border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">DX Core 4 Survey Tool</h1>
            </div>
            <div className="flex items-center">
              {teamName && (
                <span className="text-sm text-gray-500 mr-4">{teamName}</span>
              )}
              <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                Developer Experience Index (DXI)
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 mr-2 rounded-md ${activeTab === 'intro' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('intro')}
          >
            Introduction
          </button>
          <button
            className={`px-4 py-2 mr-2 rounded-md ${activeTab === 'survey' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
            onClick={() => {
              if (Object.keys(results).length > 0 || activeTab === 'survey') {
                setActiveTab('survey');
              }
            }}
            disabled={activeTab === 'intro' && Object.keys(results).length === 0}
          >
            Survey
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeTab === 'results' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
            onClick={() => {
              if (Object.keys(results).length > 0) {
                setActiveTab('results');
              }
            }}
            disabled={Object.keys(results).length === 0}
          >
            Results
          </button>
        </div>

        {/* Content */}
        {activeTab === 'intro' && renderIntroTab()}
        {activeTab === 'survey' && renderSurveyTab()}
        {activeTab === 'results' && renderResultsTab()}
        
        <div className="mt-10 text-center text-sm text-gray-500">
          <p>The DXI is part of the Effectiveness dimension in the DX Core 4 Framework</p>
        </div>
      </div>
    </div>
  );
}