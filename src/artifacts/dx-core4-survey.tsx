import React, { useState, useEffect, useRef } from 'react';
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

type CategoryColors = {
  [key: string]: string;
};

export default function DXCore4Survey() {
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState<SurveyResults>({});
  const [teamName, setTeamName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'intro' | 'survey' | 'results'>('intro');
  const popupRef = useRef<HTMLDivElement>(null);

  // Category colors for visual grouping
  const categoryColors: CategoryColors = {
    technical: 'bg-blue-500',
    team: 'bg-purple-500',
    product: 'bg-orange-500'
  };

  const categoryTextColors: CategoryColors = {
    technical: 'text-blue-700',
    team: 'text-purple-700',
    product: 'text-orange-700'
  };

  // DX Core 4 survey questions
  const surveyQuestions: DimensionQuestion[] = [
    {
      id: 'deep_work',
      dimension: 'Deep Work',
      question: 'How often are you able to focus without interruption for 2+ hours?',
      description: 'Ability to concentrate on complex tasks without interruptions or context switching',
      category: 'team',
      weight: 2.5 // Very high priority - currently main team focus
    },
    {
      id: 'local_iteration',
      dimension: 'Local Iteration',
      question: 'How quick and reliable is local development/testing?',
      description: 'Speed and reliability of local development environment for iterative work',
      category: 'technical',
      weight: 1.0 // Standard priority
    },
    {
      id: 'release_process',
      dimension: 'Release Process',
      question: 'How reliable is the process for delivering code to production?',
      description: 'Efficiency and reliability of the deployment pipeline',
      category: 'technical',
      weight: 1.0 // Standard priority
    },
    {
      id: 'making_changes',
      dimension: 'Making Changes',
      question: 'How confident are you in making changes to unfamiliar code?',
      description: 'Level of comfort when modifying code you didn\'t write or aren\'t familiar with',
      category: 'technical',
      weight: 1.0 // Standard priority
    },
    {
      id: 'technical_debt',
      dimension: 'Technical Debt',
      question: 'How much does technical debt slow down development?',
      description: 'Impact of legacy code, poor design decisions, or shortcuts on development velocity',
      category: 'technical',
      weight: 1.0 // Standard priority
    },
    {
      id: 'architecture',
      dimension: 'Architecture',
      question: 'How clear is the system architecture to the team?',
      description: 'Understanding of system components, boundaries, and interactions',
      category: 'technical',
      weight: 1.0 // Standard priority
    },
    {
      id: 'tooling',
      dimension: 'Tooling',
      question: 'How well do dev tools support your daily work?',
      description: 'Effectiveness of tooling for development, testing, and debugging',
      category: 'technical',
      weight: 1.0 // Standard priority
    },
    {
      id: 'documentation',
      dimension: 'Documentation',
      question: 'How helpful is existing documentation for your work?',
      description: 'Quality and accessibility of documentation for codebase and processes',
      category: 'technical',
      weight: 1.0 // Standard priority
    },
    {
      id: 'onboarding',
      dimension: 'Onboarding',
      question: 'How effective is the onboarding process for new team members?',
      description: 'Ease of getting new engineers productive on the team',
      category: 'team',
      weight: 2.0 // High priority - currently focusing on team dimensions
    },
    {
      id: 'team_processes',
      dimension: 'Team Processes',
      question: 'How well do team processes support productivity?',
      description: 'Effectiveness of team ceremonies, communication channels, and workflows',
      category: 'team',
      weight: 2.2 // High priority - currently focusing on team dimensions
    },
    {
      id: 'collaboration',
      dimension: 'Collaboration',
      question: 'How effectively does the team collaborate on projects?',
      description: 'Quality of cross-functional teamwork and knowledge sharing',
      category: 'team',
      weight: 2.3 // High priority - currently focusing on team dimensions
    },
    {
      id: 'vision',
      dimension: 'Vision',
      question: 'How clear is the product vision to the engineering team?',
      description: 'Understanding of long-term product goals and strategy',
      category: 'product',
      weight: 1.0 // Standard priority
    },
    {
      id: 'requirements',
      dimension: 'Requirements',
      question: 'How clear and complete are requirements before implementation?',
      description: 'Quality of specifications and requirements provided before work begins',
      category: 'product',
      weight: 1.0 // Standard priority
    },
    {
      id: 'product_management',
      dimension: 'Product Management',
      question: 'How effective is collaboration with product management?',
      description: 'Working relationship between engineering and product management',
      category: 'product',
      weight: 1.0 // Standard priority
    }
  ];

  // Handle clicks outside any popups
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        // Close any open popups or dialogs here
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Survey steps including intro and results
  const steps = [
    ...surveyQuestions.map(q => q.id)
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
      // If last question, show results
      if (currentStep >= surveyQuestions.length - 1) {
        setActiveTab('results');
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }, 300);
  };

  // Handle survey submission
  const handleSubmit = () => {
    // Here you would typically save the results to a backend
    setIsSubmitted(true);
    // In a real app, you might send this data to an API
    console.log('Survey submitted:', {
      teamName,
      results,
      dxiScore: calculateDXI(results)
    });
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

  // Render the intro tab
  const renderIntroTab = () => {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">Developer Experience (DX) Core 4 Survey</h1>
        <p className="mb-6 text-gray-700 max-w-3xl mx-auto">
          This survey measures the 14 dimensions of developer experience that make up the Developer Experience Index (DXI),
          a key component of the Effectiveness dimension in the DX Core 4 framework.
          Some dimensions have higher weights as they impact developer productivity more significantly.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
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
        
        <div className="bg-blue-50 p-4 rounded-lg max-w-md mx-auto mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
          <ul className="text-left text-sm text-blue-900 space-y-2">
            <li>• Rate each dimension on a scale from 0 (very poor) to 10 (excellent)</li>
            <li>• Be honest - this data helps identify real improvement areas</li>
            <li>• Consider your experience over the past 3 months</li>
            <li>• Pay attention to high-priority dimensions (marked with weight multiplier)</li>
            <li>• The survey takes approximately 5-7 minutes to complete</li>
          </ul>
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
    
    return (
      <div className="max-w-3xl mx-auto">
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">Your DX Core 4 Results</h1>
        
        {teamName && (
          <p className="text-center text-gray-700 mb-4">Team: {teamName}</p>
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
        
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">What This Means for Your Team</h2>
          <p className="text-gray-700 mb-4">
            Your DXI score of <span className="font-bold">{dxiScore}</span> translates to approximately <span className="font-bold">{Math.round(dxiScore * 1.3)}</span> minutes saved per developer per week,
            or about <span className="font-bold">{Math.round(dxiScore * 1.3 * 50)}</span> hours per developer annually.
          </p>
          
          <h3 className="font-medium text-blue-800 mb-2">Recommendations:</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Focus first on addressing your lowest-scoring <strong>high-priority dimensions</strong> for maximum impact</li>
            <li>Target one dimension at a time with specific improvement initiatives</li>
            <li>Pay special attention to dimensions with higher weights (1.5x or higher)</li>
            <li>Resurvey every 3-6 months to track progress</li>
            <li>Use your strengths to help improve other dimensions</li>
          </ul>
        </div>
        
        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mr-3"
            onClick={handleSubmit}
            disabled={isSubmitted}
          >
            {isSubmitted ? 'Submitted' : 'Submit Results'}
          </button>
          
          <button
            className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            onClick={() => {
              setResults({});
              setCurrentStep(0);
              setIsSubmitted(false);
              setActiveTab('intro');
            }}
          >
            Start New Survey
          </button>
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

      <div className="container mx-auto px-4 py-6">
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