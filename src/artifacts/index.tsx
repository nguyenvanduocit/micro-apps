import React, { useState } from 'react';

// Add type definitions
type ActivityDetail = {
  description: string;
  metrics: string[];
};

type ActivityDetails = {
  [key: string]: ActivityDetail;
};

export default function DXCoreFramework() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('roles');

  // Framework data structure
  const phases = [
    { id: 'p1', title: 'Phase 1: Metric Definition and Tooling Setup' },
    { id: 'p2', title: 'Phase 2: Baseline Measurement' },
    { id: 'p3', title: 'Phase 3: Targeted Improvement Initiatives' },
    { id: 'p4', title: 'Phase 4: Continuous Optimization' }
  ];

  const stakeholders = [
    {
      id: 's1',
      title: 'Head of Department (HoD)',
      color: 'bg-blue-100 border-blue-400',
      description: 'Responsible for strategic direction, resource allocation, and ensuring alignment between technical performance and business objectives.',
      metrics: [
        'Strategic Alignment Index',
        'Investment ROI',
        'Resource Allocation Efficiency',
        'Initiative Success Rate',
        'Budget Utilization'
      ]
    },
    {
      id: 's2',
      title: 'Engineering Manager (EM)',
      color: 'bg-indigo-100 border-indigo-400',
      description: 'Oversees team performance, coordinates measurement initiatives, and implements process improvements to boost productivity.',
      metrics: [
        'Team Velocity',
        'Sprint Completion Rate',
        'Cycle Time',
        'Release Frequency',
        'Team Satisfaction Score',
        'Technical Debt Ratio',
        'Onboarding Efficiency'
      ]
    },
    {
      id: 's3',
      title: 'Technical Lead',
      color: 'bg-purple-100 border-purple-400',
      description: 'Focuses on technical implementation, architecture decisions, and engineering best practices.',
      metrics: [
        'Code Quality Score',
        'Architecture Stability',
        'Build Pipeline Efficiency',
        'Integration Success Rate',
        'API Reliability',
        'System Performance',
        'Technology Adoption Rate'
      ]
    },
    {
      id: 's4',
      title: 'Quality Control (QC)',
      color: 'bg-orange-100 border-orange-400',
      description: 'Ensures quality standards are established, measured, and maintained. Focuses on testing processes, defect prevention, and quality gate enforcement.',
      metrics: [
        'Defect Density',
        'Test Coverage',
        'Quality Gate Pass Rate',
        'SLA Compliance',
        'Documentation Completeness',
        'Code Review Thoroughness',
        'Regression Rate',
        'Security Vulnerability Score'
      ]
    },
    {
      id: 's5',
      title: 'Engineers',
      color: 'bg-green-100 border-green-400',
      description: 'Front-line implementers who provide direct feedback on tooling, processes, and metrics relevance.',
      metrics: [
        'Individual Velocity',
        'Code Commit Frequency',
        'Pull Request Cycle Time',
        'Bug Fix Rate',
        'Documentation Contributions',
        'Knowledge Sharing Activity',
        'Skill Progression',
        'Tool Adoption Rate'
      ]
    }
  ];

  const activities = [
    // HoD Activities
    { id: 'a1', phase: 'p1', stakeholder: 's1', description: 'Approve metric framework and tooling budget' },
    { id: 'a2', phase: 'p3', stakeholder: 's1', description: 'Prioritize improvement areas based on ROI' },

    // EM Activities
    { id: 'a3', phase: 'p1', stakeholder: 's2', description: 'Select specific metrics aligned with business goals' },
    { id: 'a4', phase: 'p2', stakeholder: 's2', description: 'Oversee collection of baseline performance data' },
    { id: 'a5', phase: 'p3', stakeholder: 's2', description: 'Create team-specific improvement plans' },
    { id: 'a6', phase: 'p4', stakeholder: 's2', description: 'Regular progress reviews and adjustment' },

    // Tech Lead Activities
    { id: 'a7', phase: 'p1', stakeholder: 's3', description: 'Evaluate technical feasibility of metric collection' },
    { id: 'a8', phase: 'p2', stakeholder: 's3', description: 'Ensure accurate technical metric collection' },
    { id: 'a9', phase: 'p3', stakeholder: 's3', description: 'Design technical solutions for improvement' },
    { id: 'a10', phase: 'p4', stakeholder: 's3', description: 'Technical refinement of tools and practices' },

    // QC Activities
    { id: 'a11', phase: 'p1', stakeholder: 's4', description: 'Define quality thresholds and standards' },
    { id: 'a12', phase: 'p2', stakeholder: 's4', description: 'Establish current quality baseline' },
    { id: 'a13', phase: 'p3', stakeholder: 's4', description: 'Monitor quality impact of changes' },
    { id: 'a14', phase: 'p4', stakeholder: 's4', description: 'Ongoing quality verification' },

    // Engineers Activities
    { id: 'a15', phase: 'p1', stakeholder: 's5', description: 'Provide feedback on metric relevance' },
    { id: 'a16', phase: 'p2', stakeholder: 's5', description: 'Document current workflows and pain points' },
    { id: 'a17', phase: 'p3', stakeholder: 's5', description: 'Implement improved practices' },
    { id: 'a18', phase: 'p4', stakeholder: 's5', description: 'Feedback on effectiveness and suggestions' }
  ];

  // Detailed information for expanded cards
  const activityDetails: ActivityDetails = {
    'a1': {
      description: 'Allocate appropriate budget and resources for metric collection tools and infrastructure. Review and approve the proposed metrics framework ensuring alignment with organizational objectives.',
      metrics: ['Strategic Alignment Index', 'Budget Utilization', 'Investment ROI']
    },
    'a2': {
      description: 'Analyze collected data to identify areas with highest potential impact. Prioritize improvement initiatives based on estimated return on investment and strategic alignment.',
      metrics: ['Initiative Success Rate', 'Resource Allocation Efficiency', 'Investment ROI']
    },
    'a3': {
      description: 'Identify and define concrete metrics that reflect engineering productivity, quality, and alignment with business goals. Ensure metrics are objective, measurable, and actionable.',
      metrics: ['Team Velocity', 'Cycle Time', 'Release Frequency', 'Technical Debt Ratio']
    },
    'a4': {
      description: 'Coordinate the systematic collection of performance data across teams to establish current state. Ensure consistent methodology and statistical significance.',
      metrics: ['Team Velocity', 'Sprint Completion Rate', 'Team Satisfaction Score', 'Onboarding Efficiency']
    },
    'a5': {
      description: 'Develop tailored improvement plans for each team based on their specific baseline metrics and identified improvement opportunities.',
      metrics: ['Technical Debt Ratio', 'Team Satisfaction Score', 'Cycle Time', 'Release Frequency']
    },
    'a6': {
      description: 'Conduct regular reviews of performance metrics, adjusting improvement strategies based on empirical results and emerging priorities.',
      metrics: ['Team Velocity', 'Sprint Completion Rate', 'Cycle Time', 'Technical Debt Ratio']
    },
    'a7': {
      description: 'Assess the technical feasibility of collecting proposed metrics. Evaluate existing tools and infrastructure, identifying potential implementation challenges.',
      metrics: ['Build Pipeline Efficiency', 'Architecture Stability', 'API Reliability', 'Technology Adoption Rate']
    },
    'a8': {
      description: 'Configure and manage tools for accurate technical metric collection. Ensure data integrity and implement validation mechanisms.',
      metrics: ['Code Quality Score', 'Build Pipeline Efficiency', 'Integration Success Rate', 'System Performance']
    },
    'a9': {
      description: 'Design and architect technical solutions that address identified improvement areas, focusing on automation, efficiency, and developer experience.',
      metrics: ['Architecture Stability', 'API Reliability', 'Code Quality Score', 'Technology Adoption Rate']
    },
    'a10': {
      description: 'Continuously refine tools, practices, and technical approaches based on measured impact and feedback.',
      metrics: ['Integration Success Rate', 'System Performance', 'Build Pipeline Efficiency', 'Architecture Stability']
    },
    'a11': {
      description: 'Establish clear quality thresholds and standards that will be used to evaluate performance. Define acceptance criteria for successful improvements.',
      metrics: ['Defect Density', 'Test Coverage', 'Quality Gate Pass Rate', 'SLA Compliance', 'Security Vulnerability Score']
    },
    'a12': {
      description: 'Measure and document the current quality levels across teams and projects to establish a reference point for future comparisons.',
      metrics: ['Defect Density', 'Test Coverage', 'Code Review Thoroughness', 'Regression Rate', 'Documentation Completeness']
    },
    'a13': {
      description: 'Implement systematic quality checks to verify that improvement initiatives maintain or enhance product quality. Monitor key quality indicators to ensure changes don\'t negatively impact stability, security, or usability.',
      metrics: ['SLA Compliance', 'Security Vulnerability Score', 'Quality Gate Pass Rate', 'Regression Rate']
    },
    'a14': {
      description: 'Maintain ongoing quality verification processes to ensure sustainable improvements and prevent regression. Continuously refine quality metrics to align with evolving product and technical requirements.',
      metrics: ['Defect Density', 'Test Coverage', 'Code Review Thoroughness', 'Regression Rate', 'Documentation Completeness']
    },
    'a15': {
      description: 'Provide practical feedback on proposed metrics to ensure they capture meaningful aspects of the development process and developer experience.',
      metrics: ['Individual Velocity', 'Code Commit Frequency', 'Pull Request Cycle Time', 'Tool Adoption Rate']
    },
    'a16': {
      description: 'Document current workflows, procedures, and pain points to provide context for baseline measurements and identify improvement opportunities.',
      metrics: ['Bug Fix Rate', 'Documentation Contributions', 'Knowledge Sharing Activity', 'Skill Progression']
    },
    'a17': {
      description: 'Actively implement improved practices, tools, and processes as defined in the improvement plans.',
      metrics: ['Individual Velocity', 'Code Commit Frequency', 'Pull Request Cycle Time', 'Tool Adoption Rate']
    },
    'a18': {
      description: 'Provide feedback on the effectiveness of implemented changes and suggest further refinements based on day-to-day experience.',
      metrics: ['Bug Fix Rate', 'Documentation Contributions', 'Knowledge Sharing Activity', 'Skill Progression']
    }
  };

  // Handle card click to toggle expanded view
  const handleCardClick = (activityId: string) => {
    if (expandedCard === activityId) {
      setExpandedCard(null);
    } else {
      setExpandedCard(activityId);
    }
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
          className={`px-4 py-2 rounded-md ${activeTab === 'metrics' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('metrics')}
        >
          Metrics Dashboard
        </button>
      </div>

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
                </div>

                {/* Activity cells for this stakeholder */}
                {phases.map(phase => {
                  const activity = activities.find(a => a.phase === phase.id && a.stakeholder === stakeholder.id);

                  return (
                    <div key={`${stakeholder.id}-${phase.id}`} className="relative">
                      {activity ? (
                        <div
                          className={`${stakeholder.color} border p-2 rounded-md shadow-sm hover:shadow-md transition-all cursor-pointer h-full flex items-center text-sm ${expandedCard === activity.id ? 'ring-2 ring-blue-500' : ''}`}
                          onClick={() => handleCardClick(activity.id)}
                        >
                          {activity.description}
                        </div>
                      ) : (
                        <div className="border border-gray-200 p-2 rounded-md bg-gray-50 h-full"></div>
                      )}

                      {/* Expanded card for details */}
                      {expandedCard === activity?.id && (
                        <div className="absolute z-50 bg-white border border-gray-300 shadow-lg rounded-md p-3 w-80 text-sm top-full left-0 mt-1">
                          <h3 className="font-bold mb-2 text-blue-900">{activity.description}</h3>
                          <p className="mb-3">{activityDetails[activity.id].description}</p>
                          <div className="border-t pt-2">
                            <h4 className="font-semibold text-blue-800 mb-2">DX Core 4 Metrics:</h4>
                            <div className="grid grid-cols-1 gap-1">
                              {activityDetails[activity.id].metrics.map((metric: string, idx: number) => {
                                const stakeholderId = activity.stakeholder;
                                let metricColor;
                                switch (stakeholderId) {
                                  case 's1': metricColor = 'bg-blue-100 border-blue-400'; break;
                                  case 's2': metricColor = 'bg-indigo-100 border-indigo-400'; break;
                                  case 's3': metricColor = 'bg-purple-100 border-purple-400'; break;
                                  case 's4': metricColor = 'bg-orange-100 border-orange-400'; break;
                                  case 's5': metricColor = 'bg-green-100 border-green-400'; break;
                                  default: metricColor = 'bg-gray-100 border-gray-400';
                                }
                                return (
                                  <div key={idx} className={`flex items-center p-1 rounded ${metricColor} border`}>
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
                      )}
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
          <p className="text-center mb-4 text-gray-600">Below are the key metrics contributed by each role in the DX Core 4 framework.</p>

          {stakeholders.map(stakeholder => (
            <div key={stakeholder.id} className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
              <div className={`p-3 ${stakeholder.color.replace('bg-', 'bg-').replace('100', '200')} border-b`}>
                <h3 className="font-bold text-lg">{stakeholder.title}</h3>
                <p className="text-sm">{stakeholder.description}</p>
              </div>

              <div className="p-4">
                <h4 className="font-semibold mb-2 text-blue-800">Key Metrics Contributed:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {stakeholder.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${stakeholder.id === 's1' ? 'bg-blue-500' :
                        stakeholder.id === 's2' ? 'bg-indigo-500' :
                          stakeholder.id === 's3' ? 'bg-purple-500' :
                            stakeholder.id === 's4' ? 'bg-orange-500' :
                              'bg-green-500'
                        }`}></div>
                      <span className="text-sm">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-4 pb-4">
                <h4 className="font-semibold mb-2 text-blue-800">Activities by Phase:</h4>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {phases.map(phase => {
                    const activity = activities.find(a => a.phase === phase.id && a.stakeholder === stakeholder.id);
                    return (
                      <div key={phase.id} className="border rounded p-2">
                        <div className="font-semibold text-gray-700">Phase {phase.id.substring(1)}:</div>
                        <div>{activity ? activity.description : 'No direct activity'}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-100 rounded-md">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">Legend - Stakeholder Roles</h2>
        <div className="grid grid-cols-2 gap-4">
          {stakeholders.map(stakeholder => (
            <div key={stakeholder.id} className="flex items-center">
              <div className={`w-4 h-4 ${stakeholder.color} border rounded-sm mr-2`}></div>
              <span>{stakeholder.title} - {stakeholder.id === 's1' ? 'Strategic direction' :
                stakeholder.id === 's2' ? 'Team coordination' :
                  stakeholder.id === 's3' ? 'Technical implementation' :
                    stakeholder.id === 's4' ? 'Quality standards & verification' :
                      'Implementation and feedback'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Click on any activity card to view detailed information and related metrics. Switch tabs to see metrics dashboard.</p>
      </div>
    </div>
  );
}