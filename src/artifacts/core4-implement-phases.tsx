import React, { useState, useEffect, useRef } from 'react';

// Enhanced type definitions
type ActivityDetail = {
  description: string;
  metrics: string[];
};

type ActivityDetails = {
  [key: string]: ActivityDetail;
};

type Dimension = {
  id: string;
  title: string;
  description: string;
  keyMetric: string;
  secondaryMetrics: string[];
};

// Add new type for metric details
type MetricDetail = {
  name: string;
  description: string;
  examples: string[];
  bestPractices?: string[];
};

export default function DXCoreFramework() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('roles');
  const [activeDimension, setActiveDimension] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const expandedCardRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the expanded card
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (expandedCardRef.current && !expandedCardRef.current.contains(event.target as Node)) {
        setExpandedCard(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // DX Core 4 Dimensions
  const dxCore4Dimensions: Dimension[] = [
    {
      id: 'speed',
      title: 'Speed',
      description: 'Measures the velocity and efficiency of the software delivery process',
      keyMetric: 'Diffs per engineer',
      secondaryMetrics: [
        'Lead time',
        'Deployment frequency',
        'Perceived rate of delivery',
        'Time to 10th PR'
      ]
    },
    {
      id: 'effectiveness',
      title: 'Effectiveness',
      description: 'Evaluates the degree to which engineers can work efficiently and with minimal friction',
      keyMetric: 'Developer Experience Index (DXI)',
      secondaryMetrics: [
        'Ease of delivery',
        'Regrettable attrition'
      ]
    },
    {
      id: 'quality',
      title: 'Quality',
      description: 'Assesses the reliability, stability, and maintainability of the software being delivered',
      keyMetric: 'Change failure rate',
      secondaryMetrics: [
        'Failed deployment recovery time',
        'Perceived software quality',
        'Operational health metrics',
        'Security metrics'
      ]
    },
    {
      id: 'impact',
      title: 'Impact',
      description: 'Measures the business value and outcomes delivered by engineering efforts',
      keyMetric: 'Percentage of time spent on new capabilities',
      secondaryMetrics: [
        'Initiative progress and ROI',
        'Revenue per engineer',
        'R&D as percentage of revenue'
      ]
    }
  ];

  // Framework data structure
  const phases = [
    { id: 'p1', title: 'Phase 1: Metric Definition and Tooling Setup' },
    { id: 'p2', title: 'Phase 2: Baseline Measurement' },
    { id: 'p3', title: 'Phase 3: Targeted Improvement Initiatives' },
    { id: 'p4', title: 'Phase 4: Continuous Optimization' }
  ];

  // Updated stakeholders with Core 4 metrics
  const stakeholders = [
    {
      id: 's1',
      title: 'Head of Department (HoD)',
      color: 'bg-blue-100 border-blue-400',
      description: 'Responsible for strategic direction, resource allocation, and ensuring alignment between technical performance and business objectives.',
      primaryDimensions: ['impact', 'effectiveness'],
      metrics: [
        // Impact metrics
        'Percentage of time spent on new capabilities',
        'Initiative progress and ROI',
        'Revenue per engineer',
        'R&D as percentage of revenue',
        // Effectiveness metrics
        'Developer Experience Index (DXI)',
        'Regrettable attrition'
      ]
    },
    {
      id: 's2',
      title: 'Engineering Manager (EM)',
      color: 'bg-indigo-100 border-indigo-400',
      description: 'Oversees team performance, coordinates measurement initiatives, and implements process improvements to boost productivity.',
      primaryDimensions: ['speed', 'effectiveness'],
      metrics: [
        // Speed metrics
        'Diffs per engineer',
        'Lead time',
        'Deployment frequency',
        // Effectiveness metrics
        'Developer Experience Index (DXI)',
        'Ease of delivery',
        // Quality metrics
        'Change failure rate'
      ]
    },
    {
      id: 's3',
      title: 'Technical Lead',
      color: 'bg-purple-100 border-purple-400',
      description: 'Focuses on technical implementation, architecture decisions, and engineering best practices.',
      primaryDimensions: ['quality', 'effectiveness'],
      metrics: [
        // Quality metrics
        'Change failure rate',
        'Failed deployment recovery time',
        'Perceived software quality',
        // Effectiveness metrics
        'Developer Experience Index (DXI)',
        'Ease of delivery',
        // Speed metrics
        'Lead time'
      ]
    },
    {
      id: 's4',
      title: 'Product Manager/Owner (PM/PO)',
      color: 'bg-orange-100 border-orange-400',
      description: 'Ensures alignment between engineering efforts and business goals, manages product roadmap, and drives data-informed prioritization decisions.',
      primaryDimensions: ['impact', 'effectiveness'],
      metrics: [
        // Impact metrics
        'Percentage of time spent on new capabilities',
        'Initiative progress and ROI',
        'Revenue per engineer',
        // Effectiveness metrics
        'Developer Experience Index (DXI)',
        'Ease of delivery'
      ]
    },
    {
      id: 's5',
      title: 'Engineers',
      color: 'bg-green-100 border-green-400',
      description: 'Front-line implementers who provide direct feedback on tooling, processes, and metrics relevance.',
      primaryDimensions: ['speed', 'effectiveness'],
      metrics: [
        // Speed metrics
        'Time to 10th PR',
        'Perceived rate of delivery',
        // Effectiveness metrics
        'Developer Experience Index (DXI)',
        'Ease of delivery',
        // Quality metrics
        'Change failure rate'
      ]
    }
  ];

  const activities = [
    // HoD Activities
    { id: 'a1', phase: 'p1', stakeholder: 's1', description: 'Approve metric framework and tooling budget', dimensions: ['impact', 'effectiveness'] },
    { id: 'a2', phase: 'p3', stakeholder: 's1', description: 'Prioritize improvement areas based on ROI', dimensions: ['impact'] },

    // EM Activities
    { id: 'a3', phase: 'p1', stakeholder: 's2', description: 'Select specific metrics aligned with business goals', dimensions: ['impact', 'speed', 'effectiveness'] },
    { id: 'a4', phase: 'p2', stakeholder: 's2', description: 'Oversee collection of baseline performance data', dimensions: ['speed', 'effectiveness', 'quality', 'impact'] },
    { id: 'a5', phase: 'p3', stakeholder: 's2', description: 'Create team-specific improvement plans,  Provide direction to Technical Leads on solution design', dimensions: ['effectiveness', 'speed'] },
    { id: 'a6', phase: 'p4', stakeholder: 's2', description: 'Regular progress reviews and adjustment', dimensions: ['speed', 'effectiveness', 'quality', 'impact'] },

    // Tech Lead Activities
    { id: 'a7', phase: 'p1', stakeholder: 's3', description: 'Evaluate technical feasibility of metric collection', dimensions: ['effectiveness', 'quality'] },
    { id: 'a8', phase: 'p2', stakeholder: 's3', description: 'Ensure accurate technical metric collection', dimensions: ['quality', 'effectiveness'] },
    { id: 'a9', phase: 'p3', stakeholder: 's3', description: 'Design technical solutions under EM guidance', dimensions: ['quality', 'effectiveness'] },
    { id: 'a10', phase: 'p4', stakeholder: 's3', description: 'Technical refinement of tools and practices', dimensions: ['quality', 'effectiveness', 'speed'] },

    // PM/PO Activities
    { id: 'a11', phase: 'p1', stakeholder: 's4', description: 'Define business goals and success metrics', dimensions: ['impact'] },
    { id: 'a12', phase: 'p2', stakeholder: 's4', description: 'Establish baseline for business impact metrics', dimensions: ['impact'] },
    { id: 'a13', phase: 'p3', stakeholder: 's4', description: 'Align improvement initiatives with business goals', dimensions: ['impact', 'effectiveness'] },
    { id: 'a14', phase: 'p4', stakeholder: 's4', description: 'Monitor business impact and adjust priorities', dimensions: ['impact', 'effectiveness'] },

    // Engineers Activities
    { id: 'a15', phase: 'p1', stakeholder: 's5', description: 'Provide feedback on metric relevance', dimensions: ['effectiveness'] },
    { id: 'a16', phase: 'p2', stakeholder: 's5', description: 'Document current workflows and pain points', dimensions: ['effectiveness', 'speed'] },
    { id: 'a17', phase: 'p3', stakeholder: 's5', description: 'Implement improved practices', dimensions: ['speed', 'effectiveness', 'quality'] },
    { id: 'a18', phase: 'p4', stakeholder: 's5', description: 'Feedback on effectiveness and suggestions', dimensions: ['effectiveness', 'speed', 'quality'] }
  ];

  // Detailed information for expanded cards - updated with Core 4 metrics
  const activityDetails: ActivityDetails = {
    'a1': {
      description: 'Allocate appropriate budget and resources for metric collection tools and infrastructure. Review and approve the proposed metrics framework ensuring alignment with organizational objectives.',
      metrics: ['Initiative progress and ROI', 'Percentage of time spent on new capabilities', 'Developer Experience Index (DXI)']
    },
    'a2': {
      description: 'Analyze collected data to identify areas with highest potential impact. Prioritize improvement initiatives based on estimated return on investment and strategic alignment.',
      metrics: ['Percentage of time spent on new capabilities', 'Initiative progress and ROI', 'Revenue per engineer']
    },
    'a3': {
      description: 'Identify and define concrete metrics that reflect engineering productivity, quality, and alignment with business goals. Ensure metrics are objective, measurable, and actionable.',
      metrics: ['Diffs per engineer', 'Lead time', 'Deployment frequency', 'Developer Experience Index (DXI)']
    },
    'a4': {
      description: 'Coordinate the systematic collection of performance data across teams to establish current state. Ensure consistent methodology and statistical significance.',
      metrics: ['Diffs per engineer', 'Developer Experience Index (DXI)', 'Change failure rate', 'Percentage of time spent on new capabilities']
    },
    'a5': {
      description: 'Develop tailored improvement plans for each team based on their specific baseline metrics and identified improvement opportunities.',
      metrics: ['Developer Experience Index (DXI)', 'Ease of delivery', 'Lead time', 'Deployment frequency']
    },
    'a6': {
      description: 'Conduct regular reviews of performance metrics, adjusting improvement strategies based on empirical results and emerging priorities.',
      metrics: ['Diffs per engineer', 'Developer Experience Index (DXI)', 'Change failure rate', 'Percentage of time spent on new capabilities']
    },
    'a7': {
      description: 'Assess the technical feasibility of collecting proposed metrics. Evaluate existing tools and infrastructure, identifying potential implementation challenges.',
      metrics: ['Ease of delivery', 'Developer Experience Index (DXI)']
    },
    'a8': {
      description: 'Configure and manage tools for accurate technical metric collection. Ensure data integrity and implement validation mechanisms.',
      metrics: ['Change failure rate', 'Failed deployment recovery time', 'Operational health metrics', 'Security metrics']
    },
    'a9': {
      description: 'Design and architect technical solutions that address identified improvement areas, working under EM guidance and requiring approval before implementation. Focus on automation, efficiency, and developer experience with measurable outcomes.',
      metrics: ['Developer Experience Index (DXI)', 'Change failure rate', 'Lead time', 'Ease of delivery']
    },
    'a10': {
      description: 'Continuously refine tools, practices, and technical approaches based on measured impact and feedback.',
      metrics: ['Failed deployment recovery time', 'Perceived software quality', 'Developer Experience Index (DXI)', 'Lead time']
    },
    'a11': {
      description: 'Work with stakeholders to define clear business objectives and establish metrics that align engineering efforts with business goals. Create a framework for measuring the business impact of engineering initiatives.',
      metrics: ['Percentage of time spent on new capabilities', 'Initiative progress and ROI', 'Revenue per engineer']
    },
    'a12': {
      description: 'Analyze current state of business impact metrics, including time allocation, ROI of initiatives, and engineering productivity in terms of business value delivered.',
      metrics: ['Percentage of time spent on new capabilities', 'Initiative progress and ROI', 'Revenue per engineer']
    },
    'a13': {
      description: 'Ensure improvement initiatives are tied to business outcomes. Balance technical improvements with feature development needs. Guide prioritization decisions based on data.',
      metrics: ['Percentage of time spent on new capabilities', 'Initiative progress and ROI', 'Developer Experience Index (DXI)']
    },
    'a14': {
      description: 'Continuously track business impact metrics, adjust priorities based on data, and ensure engineering improvements translate to business value. Maintain alignment between technical and business objectives.',
      metrics: ['Initiative progress and ROI', 'Revenue per engineer', 'Developer Experience Index (DXI)', 'Ease of delivery']
    },
    'a15': {
      description: 'Provide practical feedback on proposed metrics to ensure they capture meaningful aspects of the development process and developer experience.',
      metrics: ['Developer Experience Index (DXI)', 'Perceived rate of delivery', 'Ease of delivery']
    },
    'a16': {
      description: 'Document current workflows, procedures, and pain points to provide context for baseline measurements and identify improvement opportunities.',
      metrics: ['Developer Experience Index (DXI)', 'Time to 10th PR', 'Perceived rate of delivery']
    },
    'a17': {
      description: 'Actively implement improved practices, tools, and processes as defined in the improvement plans.',
      metrics: ['Time to 10th PR', 'Perceived rate of delivery', 'Developer Experience Index (DXI)', 'Change failure rate']
    },
    'a18': {
      description: 'Provide feedback on the effectiveness of implemented changes and suggest further refinements based on day-to-day experience.',
      metrics: ['Developer Experience Index (DXI)', 'Perceived rate of delivery', 'Ease of delivery', 'Perceived software quality']
    },
    'a19': {
      description: 'Provide direction to Technical Leads on solution design, review proposed technical solutions, and grant approval based on alignment with team improvement goals and business objectives. Ensure solutions have measurable success criteria.',
      metrics: ['Diffs per engineer', 'Developer Experience Index (DXI)', 'Ease of delivery', 'Lead time', 'Initiative progress and ROI']
    }
  };

  // Metric collection methods
  const metricCollectionMethods = [
    {
      id: 'system',
      name: 'System Metrics',
      description: 'Objective metrics collected automatically from development tools and systems',
      benefits: 'Precise, continuous data collection; minimal developer interruption',
      challenges: 'Cross-system visibility and data normalization',
      examples: [
        'Diffs per engineer',
        'Lead time',
        'Deployment frequency',
        'Change failure rate'
      ]
    },
    {
      id: 'self-report',
      name: 'Self-reported Metrics',
      description: 'Data collected through surveys and questionnaires completed by developers',
      benefits: 'Rapid data collection; captures experience metrics',
      challenges: 'Question design, participation rates',
      examples: [
        'Developer Experience Index (DXI)',
        'Perceived software quality',
        'Perceived rate of delivery',
        'Ease of delivery'
      ]
    },
    {
      id: 'experience',
      name: 'Experience Sampling',
      description: 'In-the-moment feedback collected during specific activities',
      benefits: 'Targeted in-the-moment insights',
      challenges: 'Complexity of setup, time to collect data',
      examples: [
        'Time savings from tools like Copilot',
        'Friction points in real-time workflows'
      ]
    }
  ];

  // Add metric details data
  const metricDetails: { [key: string]: MetricDetail } = {
    'Ease of delivery': {
      name: 'Ease of delivery',
      description: 'Đánh giá mức độ dễ dàng trong việc triển khai mã vào môi trường sản xuất. Ví dụ như các đường ống CI/CD tự động cho phép nhà phát triển triển khai tính năng mới chỉ với một lệnh.',
      examples: [
        'Tự động hóa quy trình triển khai',
        'Kiểm tra tự động trước khi triển khai',
        'Khả năng rollback dễ dàng',
        'Môi trường staging giống production'
      ],
      bestPractices: [
        'Sử dụng CI/CD pipelines',
        'Automated testing trước khi deploy',
        'Feature flags để kiểm soát triển khai',
        'Monitoring và alerting sau khi deploy'
      ]
    },
    'Lead time': {
      name: 'Lead time',
      description: 'Thời gian từ khi bắt đầu làm việc trên một tính năng đến khi nó được triển khai vào môi trường sản xuất.',
      examples: [
        'Thời gian từ commit đầu tiên đến khi merge',
        'Thời gian từ tạo PR đến khi được approve',
        'Thời gian từ approve đến khi deploy'
      ],
      bestPractices: [
        'Chia nhỏ công việc thành các PR nhỏ',
        'Tự động hóa quy trình review',
        'Sử dụng templates cho PR',
        'Thiết lập SLA cho review process'
      ]
    },
    // Add more metric details as needed
  };

  // Add drawer component
  const MetricDrawer = ({ metric, onClose }: { metric: string; onClose: () => void }) => {
    const details = metricDetails[metric];
    if (!details) return null;

    return (
      <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 border-l border-gray-200">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-blue-50">
            <h2 className="text-xl font-bold text-blue-900">{details.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-100 rounded-full transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Mô tả</h3>
              <p className="text-gray-700">{details.description}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Ví dụ</h3>
              <ul className="list-disc pl-5 space-y-2">
                {details.examples.map((example, index) => (
                  <li key={index} className="text-gray-700">{example}</li>
                ))}
              </ul>
            </div>
            {details.bestPractices && (
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Best Practices</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {details.bestPractices.map((practice, index) => (
                    <li key={index} className="text-gray-700">{practice}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Handle card click to toggle expanded view
  const handleCardClick = (activityId: string) => {
    if (expandedCard === activityId) {
      setExpandedCard(null);
    } else {
      setExpandedCard(activityId);
    }
  };

  // Handle dimension click to filter by dimension
  const handleDimensionClick = (dimensionId: string) => {
    if (activeDimension === dimensionId) {
      setActiveDimension(null);
    } else {
      setActiveDimension(dimensionId);
    }
  };

  // Filter activities by dimension if a dimension is selected
  const filteredActivities = activeDimension
    ? activities.filter(activity => activity.dimensions && activity.dimensions.includes(activeDimension))
    : activities;

  // Get dimension color class
  const getDimensionColor = (dimensionId: string) => {
    switch (dimensionId) {
      case 'speed': return 'bg-green-100 border-green-400 text-green-800';
      case 'effectiveness': return 'bg-blue-100 border-blue-400 text-blue-800';
      case 'quality': return 'bg-purple-100 border-purple-400 text-purple-800';
      case 'impact': return 'bg-orange-100 border-orange-400 text-orange-800';
      default: return 'bg-gray-100 border-gray-400 text-gray-800';
    }
  };

  // Get dimension badge for an activity
  const getDimensionBadges = (dimensions: string[]) => {
    return dimensions.map(dim => {
      const dimension = dxCore4Dimensions.find(d => d.id === dim);
      return dimension ? (
        <span
          key={dim}
          className={`${getDimensionColor(dim)} text-xs px-2 py-0.5 rounded-full mr-1 border`}
        >
          {dimension.title}
        </span>
      ) : null;
    });
  };

  // Get metric dimension
  const getMetricDimension = (metric: string): string => {
    for (const dim of dxCore4Dimensions) {
      if (dim.keyMetric === metric || dim.secondaryMetrics.includes(metric)) {
        return dim.id;
      }
    }
    return '';
  };

  // Update metric click handlers
  const handleMetricClick = (metric: string) => {
    setSelectedMetric(metric);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-blue-900 mb-4">
        DX Core 4: Engineer Performance Measurement & Improvement Framework
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mr-2 rounded-md ${activeTab === 'roles' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('roles')}
        >
          Role Matrix
        </button>
        <button
          className={`px-4 py-2 mr-2 rounded-md ${activeTab === 'metrics' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('metrics')}
        >
          Metrics Dashboard
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'core4' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('core4')}
        >
          Core 4 Dimensions
        </button>
      </div>

      {/* Core 4 Dimension Filters */}
      {activeTab !== 'core4' && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2 text-gray-600">Filter by Core 4 Dimension:</h3>
          <div className="flex flex-wrap gap-2">
            {dxCore4Dimensions.map(dimension => (
              <button
                key={dimension.id}
                className={`px-3 py-1 rounded-full text-sm ${activeDimension === dimension.id
                  ? `bg-${dimension.id === 'speed' ? 'green' : dimension.id === 'effectiveness' ? 'blue' : dimension.id === 'quality' ? 'purple' : 'orange'}-500 text-white`
                  : getDimensionColor(dimension.id)
                  }`}
                onClick={() => handleDimensionClick(dimension.id)}
              >
                {dimension.title}
              </button>
            ))}
            {activeDimension && (
              <button
                className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-700"
                onClick={() => setActiveDimension(null)}
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <>
          {/* Main grid container */}
          <div className="grid grid-cols-5 gap-4">
            {/* Empty top-left cell */}
            <div className="col-span-1"></div>

            {/* Phase headers */}
            {phases.map(phase => (
              <div
                key={phase.id}
                className="bg-blue-800 text-white p-2 rounded-md text-center font-semibold text-sm flex items-center justify-center"
              >
                {phase.title}
              </div>
            ))}

            {/* Row for each stakeholder */}
            {stakeholders.map(stakeholder => (
              <React.Fragment key={stakeholder.id}>
                {/* Stakeholder label */}
                <div className="bg-blue-700 text-white p-2 rounded-md flex items-center font-semibold">
                  {stakeholder.title}
                  <div className="ml-2 flex gap-1">
                    {stakeholder.primaryDimensions?.map(dim => (
                      <span
                        key={dim}
                        className={`${getDimensionColor(dim)} text-xs px-1.5 py-0.5 rounded-full border text-xs`}
                        style={{ fontSize: '0.65rem' }}
                      >
                        {dim.charAt(0).toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Activity cells for this stakeholder */}
                {phases.map(phase => {
                  // Get all activities for this stakeholder and phase
                  const phaseActivities = filteredActivities.filter(a => a.phase === phase.id && a.stakeholder === stakeholder.id);

                  return (
                    <div key={`${stakeholder.id}-${phase.id}`} className="relative">
                      {phaseActivities.length > 0 ? (
                        <div className="h-full">
                          {phaseActivities.map((activity, idx) => (
                            <div
                              key={activity.id}
                              className={`${stakeholder.color} border p-2 rounded-md shadow-sm hover:shadow-md transition-all cursor-pointer text-sm ${expandedCard === activity.id ? 'ring-2 ring-blue-500' : ''} ${idx > 0 ? 'mt-1' : ''}`}
                              onClick={() => handleCardClick(activity.id)}
                            >
                              <div className="flex flex-col">
                                <span>{activity.description}</span>
                                {activity.dimensions && (
                                  <div className="mt-1 flex flex-wrap gap-1">
                                    {getDimensionBadges(activity.dimensions)}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="border border-gray-200 p-2 rounded-md bg-gray-50 h-full"></div>
                      )}

                      {/* Expanded card for details */}
                      {phaseActivities.map(activity => (
                        expandedCard === activity.id && (
                          <div
                            key={`expanded-${activity.id}`}
                            ref={expandedCardRef}
                            className="absolute z-50 bg-white border border-gray-300 shadow-lg rounded-md p-3 w-80 text-sm top-full left-0 mt-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <h3 className="font-bold mb-2 text-blue-900">{activity.description}</h3>
                            <p className="mb-3">{activityDetails[activity.id].description}</p>
                            <div className="border-t pt-2">
                              <h4 className="font-semibold text-blue-800 mb-2">DX Core 4 Metrics:</h4>
                              <div className="grid grid-cols-1 gap-1">
                                {activityDetails[activity.id].metrics.map((metric, idx) => {
                                  const metricDimension = getMetricDimension(metric);
                                  const dimensionColor = getDimensionColor(metricDimension);

                                  return (
                                    <div
                                      key={idx}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleMetricClick(metric);
                                      }}
                                      className={`flex items-center p-1 rounded ${dimensionColor} border cursor-pointer hover:opacity-80 transition-opacity duration-200`}
                                    >
                                      <span className="text-sm font-medium">{metric}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                              Phase {activity.phase.substring(1)} • {stakeholders.find(s => s.id === activity.stakeholder)?.title}
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </>
      )}

      {activeTab === 'metrics' && (
        <div>
          {stakeholders.map(stakeholder => (
            <div key={stakeholder.id} className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
              <div className={`p-3 ${stakeholder.color} border-b`}>
                <h3 className="font-bold text-lg">{stakeholder.title}</h3>
                <p className="text-sm">{stakeholder.description}</p>
                {stakeholder.primaryDimensions && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    <span className="text-sm font-medium mr-2">Primary focus:</span>
                    {getDimensionBadges(stakeholder.primaryDimensions)}
                  </div>
                )}
              </div>

              <div className="p-4">
                <h4 className="font-semibold mb-2 text-blue-800">Key Metrics Contributed:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {stakeholder.metrics.map((metric, idx) => {
                    const metricDimension = getMetricDimension(metric);
                    return (
                      <div key={idx} className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${metricDimension === 'speed' ? 'bg-green-500' :
                          metricDimension === 'effectiveness' ? 'bg-blue-500' :
                            metricDimension === 'quality' ? 'bg-purple-500' :
                              metricDimension === 'impact' ? 'bg-orange-500' :
                                'bg-gray-500'
                          }`}></div>
                        <span
                          className="text-sm cursor-pointer hover:opacity-80 transition-opacity duration-200"
                          onClick={() => handleMetricClick(metric)}
                        >{metric}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="px-4 pb-4">
                <h4 className="font-semibold mb-2 text-blue-800">Activities by Phase:</h4>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {phases.map(phase => {
                    const phaseActivities = filteredActivities.filter(a => a.phase === phase.id && a.stakeholder === stakeholder.id);
                    return (
                      <div key={phase.id} className="border rounded p-2">
                        <div className="font-semibold text-gray-700">Phase {phase.id.substring(1)}:</div>
                        {phaseActivities.length > 0 ? (
                          phaseActivities.map((activity, idx) => (
                            <div key={idx} className={idx > 0 ? 'mt-1 pt-1 border-t' : ''}>
                              {activity.description}
                              {activity.dimensions && (
                                <div className="mt-0.5 flex flex-wrap gap-0.5">
                                  {activity.dimensions.map(dim => (
                                    <span
                                      key={dim}
                                      className={`${getDimensionColor(dim)} text-xs px-1 py-0 rounded text-xs inline-block`}
                                      style={{ fontSize: '0.6rem' }}
                                    >
                                      {dim.charAt(0).toUpperCase()}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div>No direct activity</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'core4' && (
        <div>
          <p className="text-center mb-4 text-gray-600">The DX Core 4 framework identifies four fundamental dimensions for measuring engineering productivity.</p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {dxCore4Dimensions.map(dimension => (
              <div key={dimension.id} className={`rounded-lg shadow-md overflow-hidden border-t-4 ${dimension.id === 'speed' ? 'border-green-500' :
                dimension.id === 'effectiveness' ? 'border-blue-500' :
                  dimension.id === 'quality' ? 'border-purple-500' :
                    'border-orange-500'
                }`}>
                <div className={`p-4 ${dimension.id === 'speed' ? 'bg-green-50' :
                  dimension.id === 'effectiveness' ? 'bg-blue-50' :
                    dimension.id === 'quality' ? 'bg-purple-50' :
                      'bg-orange-50'
                  }`}>
                  <h3 className={`text-xl font-bold mb-2 ${dimension.id === 'speed' ? 'text-green-800' :
                    dimension.id === 'effectiveness' ? 'text-blue-800' :
                      dimension.id === 'quality' ? 'text-purple-800' :
                        'text-orange-800'
                    }`}>{dimension.title}</h3>
                  <p className="text-gray-700">{dimension.description}</p>
                </div>
                <div className="p-4 bg-white">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Key Metric:</h4>
                    <div
                      onClick={() => handleMetricClick(dimension.keyMetric)}
                      className={`inline-block px-3 py-1 rounded-full font-medium cursor-pointer hover:opacity-80 ${dimension.id === 'speed' ? 'bg-green-100 text-green-800' :
                        dimension.id === 'effectiveness' ? 'bg-blue-100 text-blue-800' :
                          dimension.id === 'quality' ? 'bg-purple-100 text-purple-800' :
                            'bg-orange-100 text-orange-800'
                        }`}>
                      {dimension.keyMetric}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Secondary Metrics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {dimension.secondaryMetrics.map(metric => (
                        <span
                          key={metric}
                          onClick={() => handleMetricClick(metric)}
                          className={`px-2 py-1 text-sm rounded cursor-pointer hover:opacity-80 ${dimension.id === 'speed' ? 'bg-green-50 text-green-700' :
                            dimension.id === 'effectiveness' ? 'bg-blue-50 text-blue-700' :
                              dimension.id === 'quality' ? 'bg-purple-50 text-purple-700' :
                                'bg-orange-50 text-orange-700'
                            } border ${dimension.id === 'speed' ? 'border-green-200' :
                              dimension.id === 'effectiveness' ? 'border-blue-200' :
                                dimension.id === 'quality' ? 'border-purple-200' :
                                  'border-orange-200'
                            }`}>
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-4 text-blue-900">Metric Collection Methods</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {metricCollectionMethods.map(method => (
              <div key={method.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <h4 className="font-bold text-blue-800 mb-2">{method.name}</h4>
                <p className="text-sm text-gray-700 mb-3">{method.description}</p>
                <div className="mb-2">
                  <h5 className="text-sm font-semibold text-green-700">Benefits:</h5>
                  <p className="text-xs text-gray-600">{method.benefits}</p>
                </div>
                <div className="mb-3">
                  <h5 className="text-sm font-semibold text-red-700">Challenges:</h5>
                  <p className="text-xs text-gray-600">{method.challenges}</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-blue-700">Examples:</h5>
                  <ul className="text-xs text-gray-600 list-disc pl-4">
                    {method.examples.map((ex, idx) => (
                      <li key={idx}>{ex}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 mb-6">
            <h3 className="text-xl font-bold mb-3 text-blue-900">The DXI (Developer Experience Index)</h3>
            <p className="mb-4">The DXI is a composite metric measuring 14 dimensions of developer experience predictive of productivity:</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-md">
                <ul className="list-disc pl-5 text-blue-800">
                  <li>Deep work</li>
                  <li>Local iteration speed</li>
                  <li>Release process</li>
                  <li>Confidence in making changes</li>
                  <li>Technical debt</li>
                  <li>Architecture clarity</li>
                  <li>Tooling adequacy</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <ul className="list-disc pl-5 text-blue-800">
                  <li>Documentation</li>
                  <li>Onboarding</li>
                  <li>Team processes</li>
                  <li>Collaboration</li>
                  <li>Vision clarity</li>
                  <li>Requirements quality</li>
                  <li>Product management</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-700">Each one-point gain in the DXI score translates to saving approximately 13 minutes per developer per week (10 hours annually).</p>
          </div>

        </div>
      )}

      {/* Add drawer */}
      {selectedMetric && (
        <MetricDrawer
          metric={selectedMetric}
          onClose={() => setSelectedMetric(null)}
        />
      )}

      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">Legend - Stakeholder Roles</h2>
        <div className="grid grid-cols-2 gap-4">
          {stakeholders.map(stakeholder => (
            <div key={stakeholder.id} className="flex items-center">
              <div className={`w-4 h-4 flex-shrink-0 ${stakeholder.color} border rounded-sm mr-2`}></div>
              <span>{stakeholder.title} - {stakeholder.id === 's1' ? 'Strategic direction' :
                stakeholder.id === 's2' ? 'Team coordination' :
                  stakeholder.id === 's3' ? 'Technical implementation' :
                    stakeholder.id === 's4' ? 'Product management' :
                      'Implementation and feedback'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Click on any activity card to view detailed information and related metrics. Switch tabs to see metrics dashboard and Core 4 dimensions.</p>
      </div>
    </div>
  );
}