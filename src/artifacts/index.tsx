import { Link } from 'react-router-dom';

type Artifact = {
  id: string;
  title: string;
  description: string;
  path: string;
};

const artifacts: Artifact[] = [
  {
    id: 'core4-implement-phases',
    title: 'DX Core 4 Implementation Phases',
    description: 'A framework for implementing and measuring developer experience using the Core 4 dimensions: Speed, Effectiveness, Quality, and Impact.',
    path: '/core4-implement-phases'
  },
  {
    id: 'dashboard',
    title: 'DX Core 4 Dashboard',
    description: 'Interactive dashboard visualizing Core 4 metrics, insights, and ROI analysis to measure and improve developer experience.',
    path: '/dashboard'
  },
  {
    id: 'case-studies',
    title: 'Case Studies Library',
    description: 'Explore detailed case studies from organizations that have successfully implemented the DX Core 4 framework with measurable outcomes.',
    path: '/case-studies'
  },
  {
    id: 'interactive-tutorial',
    title: 'Interactive Framework Tutorial',
    description: 'Step-by-step interactive guide to understanding and implementing the DX Core 4 framework in your organization with practical exercises.',
    path: '/interactive-tutorial'
  },
  {
    id: 'advanced-visualizations',
    title: 'Advanced Metrics Visualizations',
    description: 'Customizable visualization tools for deeper insights into your DX metrics across different timeframes, teams, and organizational contexts.',
    path: '/advanced-visualizations'
  }
  // Add more artifacts here as they become available
];

export default function ArtifactList() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Available Artifacts
        </h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explore our collection of developer experience resources, frameworks, and tools
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {artifacts.map((artifact) => (
            <Link
              key={artifact.id}
              to={artifact.path}
              className="group block overflow-hidden"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 h-full border border-gray-100">
                <div className="flex flex-col h-full">
                  <h2 className="text-2xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                    {artifact.title}
                  </h2>
                  <p className="text-gray-600 flex-grow">
                    {artifact.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 font-medium">
                    Learn more
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
