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

// Enhanced MetricDetail type with optional benchmarks
type MetricDetail = {
  name: string;
  description: string;
  examples: string[];
  bestPractices?: string[];
  benchmarks?: {
    [key: string]: string;
  };
  dimensions?: string[];  // Optional dimensions array for DXI metric
};

// Type for the metricDetails object
type MetricDetailsMap = {
  [key: string]: MetricDetail;
};

export default function DXCoreFramework() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'why' | 'roles' | 'metrics' | 'core4'>('why');
  const [activeDimension, setActiveDimension] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
  const expandedCardRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the expanded card
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (expandedCardRef.current && !expandedCardRef.current.contains(event.target as Node)) {
        setExpandedCard(null);
        setSelectedMetric(null);
        setPopupPosition(null);
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

  // Add metric details data with proper typing
  const metricDetails: MetricDetailsMap = {
    // SPEED DIMENSION METRICS
    'Diffs per engineer': {
      name: 'Diffs per engineer',
      description: 'A measurement of the number of code changes (pull requests or commits) an engineer produces within a given time period. This is the key metric for the Speed dimension, providing a direct quantification of delivery velocity.',
      examples: [
        'Average PRs merged per developer per week',
        'Number of code reviews participated in',
        'Commit frequency distribution across team members',
        'Relative velocity compared to organizational benchmarks'
      ],
      bestPractices: [
        'Target 3-4 PRs per engineer per week (industry median)',
        'Focus on right-sized PRs that balance review efficiency and context',
        'Avoid using this metric in isolation or for individual performance reviews',
        'Correlate with quality metrics to ensure speed isn\'t compromising reliability'
      ],
      benchmarks: {
        median: '3-4 PRs per week',
        top25Percent: '5+ PRs per week',
        context: 'Varies by team type, organization size, and product complexity'
      }
    },
    'Lead time': {
      name: 'Lead time',
      description: 'The time it takes for code to move from initial development to production. Measures the efficiency of the entire software delivery pipeline, from first commit to deployment.',
      examples: [
        'Time from first commit to production deployment',
        'Time from PR creation to merge',
        'Time from merge to deployment',
        'End-to-end feature delivery timeline'
      ],
      bestPractices: [
        'Break work into smaller, independently deployable units',
        'Implement automated code review tools',
        'Establish clear PR templates and guidelines',
        'Set SLAs for review processes'
      ],
      benchmarks: {
        elite: 'Less than 1 day',
        high: '1-7 days',
        medium: '1-4 weeks',
        low: 'More than 1 month'
      }
    },
    'Deployment frequency': {
      name: 'Deployment frequency',
      description: 'How often code is successfully deployed to production. Indicates the organization\'s ability to deliver changes quickly and reflects the overall agility of the engineering process.',
      examples: [
        'Number of deployments per day/week',
        'Consistency of deployment cadence',
        'Deployment batch size trends',
        'Feature vs. hotfix deployment ratio'
      ],
      bestPractices: [
        'Implement robust CI/CD pipelines',
        'Emphasize small, frequent releases over large batches',
        'Decouple deployments from releases using feature flags',
        'Establish deployment windows that minimize business impact'
      ],
      benchmarks: {
        elite: 'Multiple times per day',
        high: 'Between once per day and once per week',
        medium: 'Between once per week and once per month',
        low: 'Less than once per month'
      }
    },
    'Perceived rate of delivery': {
      name: 'Perceived rate of delivery',
      description: 'A self-reported metric capturing how developers perceive their ability to deliver code changes efficiently. Reveals potential disconnects between actual and perceived velocity.',
      examples: [
        'Survey responses on perceived delivery speed',
        'Feedback on workflow bottlenecks',
        'Comparison of perceived vs. actual delivery metrics',
        'Stakeholder satisfaction with delivery pace'
      ],
      bestPractices: [
        'Conduct regular developer surveys (pulse checks)',
        'Address perception gaps with data visualization',
        'Create feedback mechanisms for workflow improvement',
        'Correlate with objective delivery metrics'
      ]
    },
    'Time to 10th PR': {
      name: 'Time to 10th PR',
      description: 'Measures how quickly a new engineer can become productive by tracking the time from joining to completing their 10th pull request. Indicates onboarding efficiency and codebase accessibility.',
      examples: [
        'Time to first PR for new hires',
        'Progression of PR complexity for new team members',
        'Onboarding milestone achievement rates',
        'Comparison across teams or departments'
      ],
      bestPractices: [
        'Create standardized onboarding processes with clear milestones',
        'Provide well-documented starter tasks for new engineers',
        'Implement mentorship programs for code review guidance',
        'Maintain comprehensive documentation and architecture diagrams'
      ],
      benchmarks: {
        target: 'First PR within 1-2 weeks, 10th PR within 6-8 weeks'
      }
    },

    // EFFECTIVENESS DIMENSION METRICS
    'Developer Experience Index (DXI)': {
      name: 'Developer Experience Index (DXI)',
      description: 'A composite metric measuring 14 dimensions of developer experience predictive of productivity, including deep work, iteration speed, confidence in making changes, technical debt, and more. Each one-point gain translates to approximately 13 minutes saved per developer per week.',
      examples: [
        'Survey-based assessment of developer workflow experience',
        'Combined score across 14 experience dimensions',
        'Team-level DXI compared to organizational average',
        'Trend analysis of DXI over quarterly periods'
      ],
      bestPractices: [
        'Use standardized surveys with consistent question framing',
        'Measure regularly (quarterly) to track improvements',
        'Analyze dimension-specific scores to identify focus areas',
        'Balance improvements across all 14 dimensions for holistic gains'
      ],
      dimensions: [
        'Deep work',
        'Local iteration speed',
        'Release process',
        'Confidence in making changes',
        'Technical debt',
        'Architecture clarity',
        'Tooling adequacy',
        'Documentation',
        'Onboarding',
        'Team processes',
        'Collaboration',
        'Vision clarity',
        'Requirements quality',
        'Product management'
      ],
      benchmarks: {
        median: '68-75 (varies by industry)',
        target: '80+'
      }
    },
    'Ease of delivery': {
      name: 'Ease of delivery',
      description: 'Measures how straightforward it is for developers to move code changes through the delivery pipeline to production. Assesses the friction in deployment processes and infrastructure.',
      examples: [
        'Self-reported satisfaction with deployment processes',
        'Number of steps required for deployment',
        'Frequency of deployment pipeline failures',
        'Time spent debugging deployment issues'
      ],
      bestPractices: [
        'Implement comprehensive CI/CD pipelines',
        'Automate testing before deployment',
        'Use feature flags to control releases',
        'Establish monitoring and alerting for deployment health'
      ]
    },
    'Regrettable attrition': {
      name: 'Regrettable attrition',
      description: 'The rate at which valued engineers leave the organization. Serves as a lagging indicator of developer experience issues and can signal problems with team culture or work environment.',
      examples: [
        'Percentage of high-performing engineers who leave voluntarily',
        'Correlation between attrition and DXI scores',
        'Exit interview insights categorized by theme',
        'Tenure length trends over time'
      ],
      bestPractices: [
        'Conduct thorough exit interviews to identify patterns',
        'Track leading indicators of satisfaction before attrition occurs',
        'Implement retention programs for key talent',
        'Compare attrition rates to industry benchmarks'
      ],
      benchmarks: {
        healthy: 'Less than 8% annual regrettable attrition',
        concerning: '15%+ annual regrettable attrition'
      }
    },

    // QUALITY DIMENSION METRICS
    'Change failure rate': {
      name: 'Change failure rate',
      description: 'The percentage of changes (deployments or releases) that result in degraded service or require remediation (such as hotfixes or rollbacks). Primary metric for the Quality dimension.',
      examples: [
        'Percentage of deployments causing incidents',
        'Hotfix frequency following releases',
        'Rollback rate for deployments',
        'Production bug introduction rate'
      ],
      bestPractices: [
        'Implement rigorous pre-deployment testing',
        'Use progressive deployment strategies (canary, blue-green)',
        'Establish comprehensive monitoring and alerting',
        'Conduct regular post-incident reviews'
      ],
      benchmarks: {
        elite: 'Less than 0-15%',
        high: '16-30%',
        medium: '31-45%',
        low: '46-60%+'
      }
    },
    'Failed deployment recovery time': {
      name: 'Failed deployment recovery time',
      description: 'Measures how quickly teams can recover from deployment failures or service disruptions. Indicates the resilience of systems and effectiveness of incident response procedures.',
      examples: [
        'Mean time to recovery (MTTR) for production incidents',
        'Time from identification to resolution',
        'Time to rollback failed deployments',
        'Incident response efficiency'
      ],
      bestPractices: [
        'Implement automated rollback capabilities',
        'Create detailed incident response playbooks',
        'Establish on-call rotations with clear escalation paths',
        'Conduct regular incident response drills'
      ],
      benchmarks: {
        elite: 'Less than 1 hour',
        high: 'Less than 1 day',
        medium: 'Less than 1 week',
        low: 'More than 1 week'
      }
    },
    'Perceived software quality': {
      name: 'Perceived software quality',
      description: 'Self-reported assessment of the software\'s quality from the developer perspective. Captures insights about maintainability, technical debt, and codebase health that may not be visible in automated metrics.',
      examples: [
        'Developer satisfaction with codebase quality',
        'Engineer confidence in system reliability',
        'Perceptions of technical debt impact',
        'Evaluation of code maintainability'
      ],
      bestPractices: [
        'Conduct regular code quality surveys',
        'Use standardized questions to track trends',
        'Compare perceptions across teams and areas',
        'Correlate with objective quality metrics'
      ]
    },
    'Operational health metrics': {
      name: 'Operational health metrics',
      description: 'Collection of metrics that indicate the operational stability and performance of software systems in production. Provides objective data on actual system behavior.',
      examples: [
        'System availability percentage',
        'Error rates and distribution',
        'Performance metrics (latency, throughput)',
        'Resource utilization efficiency'
      ],
      bestPractices: [
        'Establish comprehensive monitoring dashboards',
        'Define and track service level objectives (SLOs)',
        'Implement proactive alerting thresholds',
        'Create operational health scorecards'
      ],
      benchmarks: {
        target: '99.9% availability or higher for critical systems'
      }
    },
    'Security metrics': {
      name: 'Security metrics',
      description: 'Measures the security posture of software and development processes. Encompasses vulnerability management, security testing, and compliance adherence.',
      examples: [
        'Vulnerability density per 1,000 lines of code',
        'Time to remediate security issues',
        'Security testing coverage',
        'Compliance audit pass rate'
      ],
      bestPractices: [
        'Integrate security scanning into CI/CD pipeline',
        'Establish vulnerability severity classification',
        'Implement regular security training',
        'Conduct periodic penetration testing'
      ]
    },

    // IMPACT DIMENSION METRICS
    'Percentage of time spent on new capabilities': {
      name: 'Percentage of time spent on new capabilities',
      description: 'The proportion of engineering effort dedicated to developing new features versus maintenance, technical debt, and non-feature work. Primary metric for the Impact dimension.',
      examples: [
        'Percentage breakdown of engineering time allocation',
        'Feature vs. non-feature work ratio',
        'Time investment in technical debt reduction',
        'Maintenance effort trend analysis'
      ],
      bestPractices: [
        'Target 60-70% time on new capabilities (industry benchmark)',
        'Create explicit policies for technical debt allocation',
        'Track feature impact to justify investment',
        'Periodically reassess allocation based on business needs'
      ],
      benchmarks: {
        median: '56-68% on feature work',
        target: 'Balance based on product lifecycle stage'
      }
    },
    'Initiative progress and ROI': {
      name: 'Initiative progress and ROI',
      description: 'Tracks the advancement and return on investment of key engineering initiatives. Links technical efforts to business outcomes and value creation.',
      examples: [
        'Progress against initiative milestones',
        'Business value delivered per initiative',
        'ROI calculation for major engineering investments',
        'Feature adoption and usage metrics'
      ],
      bestPractices: [
        'Define clear success metrics for initiatives',
        'Establish methodology for calculating engineering ROI',
        'Create dashboards for initiative tracking',
        'Conduct regular initiative retrospectives'
      ]
    },
    'Revenue per engineer': {
      name: 'Revenue per engineer',
      description: 'A high-level efficiency metric that divides company revenue by the number of engineers. Provides a broad measure of engineering productivity from a business perspective.',
      examples: [
        'Annual revenue generated per engineering headcount',
        'Trend analysis of revenue efficiency over time',
        'Comparison to industry benchmarks',
        'Revenue efficiency by product area'
      ],
      bestPractices: [
        'Use as a trend indicator rather than absolute measure',
        'Compare against industry and company-stage peers',
        'Factor in product maturity and market conditions',
        'Consider alongside other efficiency metrics'
      ],
      benchmarks: {
        varies: 'Highly dependent on industry, company stage, and business model'
      }
    },
    'R&D as percentage of revenue': {
      name: 'R&D as percentage of revenue',
      description: 'The proportion of company revenue invested in research and development. Indicates prioritization of innovation and technical investment.',
      examples: [
        'Engineering budget as percentage of revenue',
        'R&D investment compared to industry averages',
        'R&D efficiency (output per dollar invested)',
        'Investment allocation across product areas'
      ],
      bestPractices: [
        'Benchmark against industry standards',
        'Adjust based on company growth stage',
        'Balance with profitability targets',
        'Analyze R&D ROI to optimize allocation'
      ],
      benchmarks: {
        software: '15-25% of revenue for established software companies',
        startups: 'Often higher, can exceed 50% in early stages'
      }
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

  const handleMetricClick = (metric: string, event: React.MouseEvent) => {
    event.stopPropagation();

    if (selectedMetric === metric) {
      setSelectedMetric(null);
      setPopupPosition(null);
    } else {
      // Get the target element's dimensions and position
      const targetElement = event.currentTarget as HTMLElement;
      const targetRect = targetElement.getBoundingClientRect();

      // Critical fix: Use absolute coordinates
      // This positions the popup at an absolute position on the page,
      // regardless of any scrolling that has occurred
      const absolutePosition = {
        // Position at the bottom of the clicked element
        top: targetRect.bottom + window.scrollY,
        // Position at the left edge of the clicked element
        left: targetRect.left + window.scrollX
      };

      // Update the metric and position states
      setSelectedMetric(metric);
      setPopupPosition(absolutePosition);
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
          className={`px-4 py-2 mr-2 rounded-md ${activeTab === 'why' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('why')}
        >
          Why Core DX
        </button>
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

      {/* Why Core DX Content */}
      {activeTab === 'why' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-3">Why Developer Experience (DX) Matters</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Developer Experience is a strategic imperative that directly impacts business outcomes through enhanced productivity, quality, and retention.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Business Impact */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Business Impact</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-1">✓</span>
                  <span>13 minutes saved per developer per week for each DXI point improvement</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-1">✓</span>
                  <span>20-40% increase in development velocity with optimized DX</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-1">✓</span>
                  <span>Reduced time-to-market for new features and products</span>
                </li>
              </ul>
            </div>

            {/* Engineering Excellence */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
              <h3 className="text-xl font-bold text-green-900 mb-4">Engineering Excellence</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-1">✓</span>
                  <span>Higher code quality and reduced technical debt</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-1">✓</span>
                  <span>Improved system reliability and maintainability</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-1">✓</span>
                  <span>Faster onboarding and knowledge transfer</span>
                </li>
              </ul>
            </div>

            {/* Team Success */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Team Success</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 mt-1">✓</span>
                  <span>Increased developer satisfaction and retention</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 mt-1">✓</span>
                  <span>Enhanced collaboration and knowledge sharing</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 mt-1">✓</span>
                  <span>Reduced burnout and improved work-life balance</span>
                </li>
              </ul>
            </div>

            {/* Innovation & Growth */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500">
              <h3 className="text-xl font-bold text-orange-900 mb-4">Innovation & Growth</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-3 mt-1">✓</span>
                  <span>More time for innovation and experimentation</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-3 mt-1">✓</span>
                  <span>Improved ability to adopt new technologies</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-3 mt-1">✓</span>
                  <span>Accelerated organizational learning and adaptation</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Key Insights</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded p-4 shadow-sm">
                <div className="text-2xl font-bold text-blue-600 mb-2">42%</div>
                <p className="text-sm text-gray-600">Average productivity gain from high DX investment</p>
              </div>
              <div className="bg-white rounded p-4 shadow-sm">
                <div className="text-2xl font-bold text-blue-600 mb-2">23%</div>
                <p className="text-sm text-gray-600">Reduction in development cycle time</p>
              </div>
              <div className="bg-white rounded p-4 shadow-sm">
                <div className="text-2xl font-bold text-blue-600 mb-2">38%</div>
                <p className="text-sm text-gray-600">Improvement in employee retention</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Core 4 Dimension Filters */}
      {activeTab !== 'core4' && activeTab !== 'why' && (
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
                {/* Stakeholder label - MODIFIED THIS SECTION */}
                <div className="bg-blue-700 text-white p-2 rounded-md flex flex-col">
                  <div className="font-semibold">{stakeholder.title}</div>
                  <div className="flex gap-1 mt-1">
                    {stakeholder.primaryDimensions?.map(dim => (
                      <span
                        key={dim}
                        className={`${getDimensionColor(dim)} text-xs px-1.5 py-0.5 rounded-full border text-xs`}
                        style={{ fontSize: '0.65rem' }}
                      >
                        {dim.charAt(0).toUpperCase() + dim.slice(1, 3)}
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
                            className="absolute z-50 bg-white border border-gray-300 shadow-lg rounded-md p-3 w-80 text-sm"
                            style={{
                              top: 'calc(100% + 4px)',
                              left: '0'
                            }}
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

                                      className={`flex relative items-center p-1 rounded ${dimensionColor} border hover:opacity-80 transition-opacity duration-200`}
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

          {/* Legend section - moved inside roles tab */}
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
                          onClick={(e) => handleMetricClick(metric, e)}
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
                      onClick={(e) => handleMetricClick(dimension.keyMetric, e)}
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
                          onClick={(e) => handleMetricClick(metric, e)}
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

      {/* Add metric popup */}
      {selectedMetric && metricDetails[selectedMetric] && popupPosition && (
        <div
          ref={expandedCardRef}
          className="absolute z-50 bg-white border border-gray-300 shadow-lg rounded-md p-3 w-80 text-sm"
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-bold mb-2 text-blue-900">{metricDetails[selectedMetric].name}</h3>
          <p className="mb-3">{metricDetails[selectedMetric].description}</p>
          <div className="border-t pt-2">
            <h4 className="font-semibold text-blue-800 mb-2">Examples:</h4>
            <ul className="list-disc pl-4 space-y-1">
              {metricDetails[selectedMetric].examples.map((example, index) => (
                <li key={index} className="text-gray-700">{example}</li>
              ))}
            </ul>
          </div>
          {metricDetails[selectedMetric].bestPractices && (
            <div className="border-t mt-2 pt-2">
              <h4 className="font-semibold text-blue-800 mb-2">Best Practices:</h4>
              <ul className="list-disc pl-4 space-y-1">
                {metricDetails[selectedMetric].bestPractices?.map((practice, index) => (
                  <li key={index} className="text-gray-700">{practice}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-2 text-xs text-gray-500">
            {getMetricDimension(selectedMetric) && (
              <span className={`${getDimensionColor(getMetricDimension(selectedMetric))} px-2 py-0.5 rounded-full text-xs`}>
                {dxCore4Dimensions.find(d => d.id === getMetricDimension(selectedMetric))?.title}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Click on any activity card to view detailed information and related metrics. Switch tabs to see metrics dashboard and Core 4 dimensions.</p>
      </div>
    </div>
  );
}