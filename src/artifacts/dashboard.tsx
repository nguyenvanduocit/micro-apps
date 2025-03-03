import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area, ScatterChart, Scatter, ZAxis, Cell } from 'recharts';

// Formula Definitions for DX Core 4 Primary Metrics
const formulaDefinitions = {
  speed: {
    formula: "Diffs per Engineer = Total PRs merged / Number of active engineers",
    description: "Measures delivery velocity normalized by team size. Higher values indicate more frequent code delivery.",
    calculation: "Typically calculated on a weekly or monthly basis to account for natural variations in delivery cadence.",
    benchmarks: "Industry median: 3-4 PRs per engineer per week",
    targetRange: [3, 5]
  },
  effectiveness: {
    formula: "DXI = Weighted average of 14 developer experience dimensions",
    description: "Composite metric measuring all aspects of developer experience that impact productivity.",
    calculation: "Collected via standardized developer surveys with questions across 14 dimensions of developer experience.",
    benchmarks: "Industry median: 68-75 (varies by industry), Target: 80+",
    targetRange: [75, 85],
    dimensions: [
      "Deep work", "Local iteration speed", "Release process", "Confidence in making changes",
      "Technical debt", "Architecture clarity", "Tooling adequacy", "Documentation",
      "Onboarding", "Team processes", "Collaboration", "Vision clarity",
      "Requirements quality", "Product management"
    ]
  },
  quality: {
    formula: "Quality Score = 100% - Change Failure Rate",
    description: "Measures the percentage of changes that don't result in degraded service or require remediation.",
    calculation: "Change Failure Rate = (Failed deployments / Total deployments) × 100%",
    benchmarks: "Industry rates: Elite: 0-15%, High: 16-30%, Medium: 31-45%, Low: 46-60%+",
    targetRange: [95, 99]
  },
  impact: {
    formula: "Impact Score = (Time spent on new capabilities / Total engineering time) × 100%",
    description: "Measures the proportion of engineering effort directed toward delivering new business value.",
    calculation: "Calculated by categorizing engineering time into feature vs. non-feature work (maintenance, tech debt, etc.)",
    benchmarks: "Industry median: 56-68% spent on feature work",
    targetRange: [60, 75]
  }
};

// Secondary Metrics Calculation Details
// Aligned with Core 4 Framework definitions
const secondaryMetricCalculations = {
  speed: {
    lead_time: {
      formula: "Average time from first commit to production deployment (days)",
      targetRange: [1, 3],
      interpretation: "lower-is-better"
    },
    deployment_frequency: {
      formula: "Count of successful deployments per week",
      targetRange: [3, 7],
      interpretation: "higher-is-better"
    },
    perceived_delivery_rate: {
      formula: "Developer survey score on perceived speed of delivery (0-100)",
      targetRange: [70, 90],
      interpretation: "higher-is-better"
    },
    time_to_10th_pr: {
      formula: "Average weeks for new engineers to complete 10 PRs",
      targetRange: [6, 8],
      interpretation: "lower-is-better"
    },
    pr_size: {
      formula: "Average lines of code per pull request",
      targetRange: [100, 300],
      interpretation: "middle-is-better"
    }
  },
  effectiveness: {
    dxi_components: {
      formula: "Aggregate score of 14 developer experience dimensions",
      targetRange: [70, 90],
      interpretation: "higher-is-better"
    },
    ease_of_delivery: {
      formula: "Developer survey score on deployment process satisfaction",
      targetRange: [70, 90],
      interpretation: "higher-is-better"
    },
    regrettable_attrition: {
      formula: "Percentage of valued engineers leaving voluntarily",
      targetRange: [0, 8],
      interpretation: "lower-is-better"
    },
    meeting_time: {
      formula: "Percentage of work week spent in meetings",
      targetRange: [10, 25],
      interpretation: "lower-is-better"
    },
    build_time: {
      formula: "Average time for build completion (minutes)",
      targetRange: [3, 10],
      interpretation: "lower-is-better"
    }
  },
  quality: {
    change_failure_rate: {
      formula: "Percentage of deployments causing incidents or requiring fix",
      targetRange: [0, 15],
      interpretation: "lower-is-better"
    },
    failed_deployment_recovery: {
      formula: "Mean time to recover from failed deployments (hours)",
      targetRange: [1, 8],
      interpretation: "lower-is-better"
    },
    perceived_software_quality: {
      formula: "Developer survey score on codebase quality (0-100)",
      targetRange: [70, 90],
      interpretation: "higher-is-better"
    },
    operational_health: {
      formula: "Composite score of system stability metrics",
      targetRange: [90, 99],
      interpretation: "higher-is-better"
    },
    security_metrics: {
      formula: "Percentage of security standards compliance",
      targetRange: [90, 100],
      interpretation: "higher-is-better"
    }
  },
  impact: {
    feature_time_ratio: {
      formula: "Percentage of time spent on new capabilities vs. maintenance",
      targetRange: [60, 75],
      interpretation: "higher-is-better"
    },
    initiative_roi: {
      formula: "Ratio of business value to engineering investment",
      targetRange: [2, 5],
      interpretation: "higher-is-better"
    },
    revenue_per_engineer: {
      formula: "Annual revenue divided by engineering headcount ($K)",
      targetRange: [500, 1000],
      interpretation: "higher-is-better"
    },
    rd_revenue_ratio: {
      formula: "R&D spend as percentage of company revenue",
      targetRange: [15, 25],
      interpretation: "middle-is-better"
    },
    business_value_delivery: {
      formula: "Percentage of features delivering measurable business value",
      targetRange: [65, 90],
      interpretation: "higher-is-better"
    }
  }
};

// Enhanced Sample Data with ROI Calculations
const SAMPLE_DATA = {
  teamName: "Frontend Platform Team",
  timeRange: "Last 8 weeks",
  // Primary metrics data (weekly)
  weeklyData: [
    { week: 'Week 1', speed: 3.2, effectiveness: 72, quality: 96.5, impact: 64 },
    { week: 'Week 2', speed: 3.4, effectiveness: 71, quality: 97.2, impact: 66 },
    { week: 'Week 3', speed: 3.1, effectiveness: 69, quality: 95.8, impact: 63 },
    { week: 'Week 4', speed: 3.8, effectiveness: 73, quality: 96.1, impact: 68 },
    { week: 'Week 5', speed: 4.1, effectiveness: 75, quality: 97.5, impact: 70 },
    { week: 'Week 6', speed: 3.9, effectiveness: 76, quality: 98.1, impact: 71 },
    { week: 'Week 7', speed: 4.2, effectiveness: 78, quality: 97.8, impact: 73 },
    { week: 'Week 8', speed: 4.4, effectiveness: 79, quality: 98.3, impact: 74 }
  ],

  // Current metrics
  current: {
    // Primary metrics
    primary: {
      speed: 4.4,
      effectiveness: 79,
      quality: 98.3,
      impact: 74
    },

    // Secondary metrics for each dimension
    secondary: {
      // Speed secondary metrics
      speed: {
        deployment_frequency: 5.2, // deployments per week
        lead_time: 2.3, // days
        perceived_delivery_rate: 76, // survey score (0-100)
        time_to_10th_pr: 7.2, // weeks
        pr_size: 142 // lines of code
      },

      // Effectiveness secondary metrics
      effectiveness: {
        dxi_components: 78, // aggregate score
        ease_of_delivery: 81, // survey score
        regrettable_attrition: 4.2, // percentage
        meeting_time: 22, // percentage of work week
        build_time: 7.2 // minutes
      },

      // Quality secondary metrics
      quality: {
        change_failure_rate: 3.8, // percentage
        failed_deployment_recovery: 6.2, // hours
        perceived_software_quality: 82, // survey score
        operational_health: 94, // percentage
        security_metrics: 91 // percentage
      },

      // Impact secondary metrics
      impact: {
        feature_time_ratio: 68, // percentage
        initiative_roi: 3.2, // ratio
        revenue_per_engineer: 685, // $K
        rd_revenue_ratio: 18, // percentage
        business_value_delivery: 76 // percentage
      }
    }
  },

  // Team benchmarks
  benchmarks: {
    // Primary metric benchmarks
    primary: {
      speed: 3.5, // PRs per engineer per week
      effectiveness: 74, // DXI Score
      quality: 96.5, // 100 - Change Fail Rate (%)
      impact: 65 // % of time on feature work
    },

    // Secondary metric benchmarks
    secondary: {
      speed: {
        deployment_frequency: 4.5,
        lead_time: 3.0,
        perceived_delivery_rate: 70,
        time_to_10th_pr: 8.0,
        pr_size: 180
      },
      effectiveness: {
        dxi_components: 72,
        ease_of_delivery: 75,
        regrettable_attrition: 6.5,
        meeting_time: 25,
        build_time: 8.5
      },
      quality: {
        change_failure_rate: 5.2,
        failed_deployment_recovery: 8.1,
        perceived_software_quality: 75,
        operational_health: 90,
        security_metrics: 85
      },
      impact: {
        feature_time_ratio: 62,
        initiative_roi: 2.8,
        revenue_per_engineer: 580,
        rd_revenue_ratio: 20,
        business_value_delivery: 70
      }
    }
  },

  // Industry benchmarks
  industry: {
    speed: {
      low: 2.5,
      medium: 3.5,
      high: 4.5
    },
    effectiveness: {
      low: 65,
      medium: 75,
      high: 85
    },
    quality: {
      low: 95.0,
      medium: 97.0,
      high: 99.0
    },
    impact: {
      low: 55,
      medium: 65,
      high: 75
    }
  },

  // ROI metrics (new)
  roi: {
    effectivenessGain: 7, // 7 point gain in DXI over 8 weeks
    developersCount: 18, // Number of developers on team
    timePerPoint: 13, // Minutes saved per week per DXI point
    hourlyRate: 90, // Blended hourly rate for engineers
    annualSavings: 145152, // = 7 points * 18 devs * 13 min/week * 52 weeks * $90/hr / 60 min/hr
    // Quality ROI
    previousFailRate: 3.5, // Previous change failure rate
    currentFailRate: 1.7, // Current change failure rate
    failureCostReduction: 126000, // Estimated cost reduction from fewer failures
    // Speed ROI
    previousPRsPerWeek: 3.5, // Previous PRs per engineer per week
    currentPRsPerWeek: 4.4, // Current PRs per engineer per week
    speedImprovementValue: 92800 // Estimated value from increased delivery speed
  },

  // Dimension interaction scores (new)
  dimensionInteractions: [
    { dimensions: "Speed vs. Quality", score: 0.82, ideal: 0.85, description: "Maintaining high quality while improving speed" },
    { dimensions: "Speed vs. Effectiveness", score: 0.88, ideal: 0.85, description: "Effectiveness supporting speed improvements" },
    { dimensions: "Quality vs. Impact", score: 0.79, ideal: 0.80, description: "Quality enabling business impact" },
    { dimensions: "Effectiveness vs. Impact", score: 0.90, ideal: 0.85, description: "Developer experience supporting business goals" }
  ],

  // Engineering productivity improvement trajectory
  productivityTrend: {
    previousQuarters: [65, 68, 70, 74], // Last 4 quarters
    projectedNext: [78, 81, 84] // Projected next 3 quarters
  }
};

// Detailed Calculation Functions for Primary Metrics
const calculateMetrics = {
  // Speed metric calculation
  calculateSpeed: (prs, engineers, period) => {
    // period should be in weeks
    return (prs / engineers) / period;
  },

  // Effectiveness (DXI) calculation - simplified version of the actual complex calculation
  calculateDXI: (dimensionScores) => {
    // In practice this would be a weighted average of 14 dimension scores
    // This is a simplified placeholder
    const sum = dimensionScores.reduce((acc, score) => acc + score, 0);
    return sum / dimensionScores.length;
  },

  // Quality calculation based on change failure rate
  calculateQuality: (failedDeployments, totalDeployments) => {
    const failureRate = (failedDeployments / totalDeployments) * 100;
    return 100 - failureRate; // Convert failure rate to success rate
  },

  // Impact calculation based on feature work percentage
  calculateImpact: (featureWorkHours, totalWorkHours) => {
    return (featureWorkHours / totalWorkHours) * 100;
  },

  // ROI calculation for DXI improvements
  calculateDXIRoi: (dxiGain, developerCount, timePerPoint, hourlyRate) => {
    const minutesPerYear = dxiGain * developerCount * timePerPoint * 52; // 52 weeks in a year
    const hoursPerYear = minutesPerYear / 60;
    return hoursPerYear * hourlyRate;
  }
};

// Helper functions for metric analysis
const calculateTrend = (data, metric) => {
  if (data.length < 2) return 0;
  const firstValue = data[0][metric];
  const lastValue = data[data.length - 1][metric];
  return ((lastValue - firstValue) / firstValue) * 100;
};

const getMetricStatus = (current, benchmark) => {
  const ratio = current / benchmark;
  if (ratio >= 1.1) return "excellent";
  if (ratio >= 1.0) return "good";
  if (ratio >= 0.9) return "needs-attention";
  return "at-risk";
};

const getMetricDescription = (dimension) => {
  const descriptions = {
    speed: "How quickly developers can deliver production-ready code.",
    effectiveness: "How well teams navigate development processes and workflows.",
    quality: "The stability and reliability of software in production.",
    impact: "How much developers contribute to business value beyond writing code."
  };
  return descriptions[dimension] || "";
};

const getSecondaryMetricLabel = (dimension, metric) => {
  const labels = {
    speed: {
      deployment_frequency: "Deployment Frequency",
      lead_time: "Lead Time",
      perceived_delivery_rate: "Perceived Delivery Rate",
      time_to_10th_pr: "Time to 10th PR",
      pr_size: "PR Size"
    },
    effectiveness: {
      dxi_components: "DXI Components Score",
      ease_of_delivery: "Ease of Delivery",
      regrettable_attrition: "Regrettable Attrition",
      meeting_time: "Meeting Time",
      build_time: "Build Time"
    },
    quality: {
      change_failure_rate: "Change Failure Rate",
      failed_deployment_recovery: "Deployment Recovery Time",
      perceived_software_quality: "Perceived Software Quality",
      operational_health: "Operational Health",
      security_metrics: "Security Compliance"
    },
    impact: {
      feature_time_ratio: "Feature Time Ratio",
      initiative_roi: "Initiative ROI",
      revenue_per_engineer: "Revenue per Engineer",
      rd_revenue_ratio: "R&D Revenue Ratio",
      business_value_delivery: "Business Value Delivery"
    }
  };
  return labels[dimension]?.[metric] || metric;
};

const getSecondaryMetricUnit = (dimension, metric) => {
  const units = {
    speed: {
      deployment_frequency: "per week",
      lead_time: "days",
      perceived_delivery_rate: "",
      time_to_10th_pr: "weeks",
      pr_size: "lines"
    },
    effectiveness: {
      dxi_components: "",
      ease_of_delivery: "",
      regrettable_attrition: "%",
      meeting_time: "%",
      build_time: "min"
    },
    quality: {
      change_failure_rate: "%",
      failed_deployment_recovery: "hours",
      perceived_software_quality: "",
      operational_health: "%",
      security_metrics: "%"
    },
    impact: {
      feature_time_ratio: "%",
      initiative_roi: "x",
      revenue_per_engineer: "K",
      rd_revenue_ratio: "%",
      business_value_delivery: "%"
    }
  };
  return units[dimension]?.[metric] || "";
};

const shouldInvertMetric = (dimension, metric) => {
  // These metrics are "better" when lower
  const invertedMetrics = {
    speed: ["lead_time", "time_to_10th_pr", "pr_size"],
    effectiveness: ["regrettable_attrition", "meeting_time", "build_time"],
    quality: ["change_failure_rate", "failed_deployment_recovery"],
    impact: []
  };

  // Special case for rd_revenue_ratio which is "middle-is-better"
  if (dimension === "impact" && metric === "rd_revenue_ratio") {
    // For middle-is-better metrics, we'll consider them as non-inverted
    // but handle them specially in the UI
    return false;
  }

  return invertedMetrics[dimension]?.includes(metric) || false;
};

// Calculate expected ROI from metric improvements
const calculateRoi = (current, previous, engineersCount, hourlyRate) => {
  // This would be a more sophisticated calculation in a real scenario
  const dxiGain = current.effectiveness - previous.effectiveness;
  const minutesPerWeek = dxiGain * 13; // 13 minutes saved per week per DXI point gained
  const hoursPerYear = (minutesPerWeek * engineersCount * 52) / 60;
  return hoursPerYear * hourlyRate;
};

// Generate insights based on primary and secondary metrics
const generateInsights = (data) => {
  const current = data.current;
  const benchmarks = data.benchmarks;
  const industry = data.industry;
  const weeklyData = data.weeklyData;

  const insights = [];

  // Primary metrics insights
  Object.keys(current.primary).forEach(dimension => {
    const value = current.primary[dimension];
    const benchmark = benchmarks.primary[dimension];
    const trend = calculateTrend(weeklyData, dimension);

    // Significant positive deviation
    if (value > benchmark * 1.1) {
      insights.push({
        dimension: dimension,
        type: "positive",
        severity: "high",
        message: `Your ${dimension} performance is significantly above benchmark (${Math.round((value / benchmark - 1) * 100)}% higher).`,
        recommendation: `Analyze your successful ${dimension} practices and document them for other teams.`
      });
    }

    // Significant negative deviation
    if (value < benchmark * 0.9) {
      insights.push({
        dimension: dimension,
        type: "negative",
        severity: "high",
        message: `Your ${dimension} is notably below benchmark (${Math.round((1 - value / benchmark) * 100)}% lower).`,
        recommendation: `Conduct a focused workshop to identify ${dimension} bottlenecks.`
      });
    }

    // Positive trend
    if (trend > 10) {
      insights.push({
        dimension: dimension,
        type: "positive",
        severity: "medium",
        message: `${dimension.charAt(0).toUpperCase() + dimension.slice(1)} has improved ${Math.round(trend)}% over the last ${weeklyData.length} weeks.`,
        recommendation: `Identify what changes led to this improvement.`
      });
    }

    // Negative trend
    if (trend < -10) {
      insights.push({
        dimension: dimension,
        type: "negative",
        severity: "medium",
        message: `${dimension.charAt(0).toUpperCase() + dimension.slice(1)} has declined ${Math.round(Math.abs(trend))}% over the last ${weeklyData.length} weeks.`,
        recommendation: `Investigate what changes may have caused this decline.`
      });
    }
  });

  // Secondary metrics insights
  Object.keys(current.secondary).forEach(dimension => {
    Object.keys(current.secondary[dimension]).forEach(metric => {
      const value = current.secondary[dimension][metric];
      const benchmark = benchmarks.secondary[dimension][metric];
      const label = getSecondaryMetricLabel(dimension, metric);
      const invert = shouldInvertMetric(dimension, metric);

      // For inverted metrics (where lower is better), invert the comparison
      const betterThanBenchmark = invert
        ? value < benchmark * 0.9
        : value > benchmark * 1.1;

      const worseThanBenchmark = invert
        ? value > benchmark * 1.1
        : value < benchmark * 0.9;

      if (betterThanBenchmark) {
        insights.push({
          dimension: dimension,
          metric: metric,
          type: "positive",
          severity: "medium",
          message: `${label} is performing exceptionally well compared to benchmark.`,
          recommendation: `Consider whether practices from this area can be applied elsewhere.`
        });
      }

      if (worseThanBenchmark) {
        insights.push({
          dimension: dimension,
          metric: metric,
          type: "negative",
          severity: "medium",
          message: `${label} needs attention, performing well below benchmark.`,
          recommendation: `Prioritize improvements in this specific area.`
        });
      }
    });
  });

  // Balance insights (checking for dimensional imbalances)
  if (current.primary.speed > industry.speed.high && current.primary.quality < industry.quality.medium) {
    insights.push({
      dimension: "balance",
      type: "warning",
      severity: "high",
      message: "High speed with lower quality detected, suggesting potential trade-offs.",
      recommendation: "Review your delivery process to ensure quality isn't being sacrificed for speed."
    });
  }

  if (current.primary.impact > industry.impact.high && current.primary.effectiveness < industry.effectiveness.medium) {
    insights.push({
      dimension: "balance",
      type: "warning",
      severity: "high",
      message: "High business impact with lower developer effectiveness suggests potential burnout risk.",
      recommendation: "Balance feature delivery with improving developer workflows."
    });
  }

  // Add ROI-based insights
  if (data.roi) {
    insights.push({
      dimension: "effectiveness",
      type: "positive",
      severity: "high",
      message: `DXI improvements have generated an estimated $${(data.roi.annualSavings).toLocaleString()} in annual productivity gains.`,
      recommendation: "Continue to focus on the DXI dimensions with highest impact on developer productivity."
    });

    if (data.roi.failureCostReduction) {
      insights.push({
        dimension: "quality",
        type: "positive",
        severity: "high",
        message: `Reduction in change failure rate has saved approximately $${(data.roi.failureCostReduction).toLocaleString()} in incident costs.`,
        recommendation: "Document the quality practices that led to this improvement for organizational learning."
      });
    }
  }

  // Sort by severity and type
  insights.sort((a, b) => {
    if (a.severity !== b.severity) {
      return a.severity === "high" ? -1 : 1;
    }
    if (a.type !== b.type) {
      return a.type === "negative" ? -1 : 1;
    }
    return 0;
  });

  return insights;
};

// Component for primary metric card with formula section
const PrimaryMetricCard = ({ title, value, benchmark, industryAvg, industryHigh, description, unit = "", decimals = 1, dimension }) => {
  const [showFormula, setShowFormula] = useState(false);
  const formattedValue = typeof value === 'number' ? value.toFixed(decimals) : value;
  const formattedBenchmark = typeof benchmark === 'number' ? benchmark.toFixed(decimals) : benchmark;
  const percentDiff = ((value - benchmark) / benchmark * 100).toFixed(1);
  const status = getMetricStatus(value, benchmark);

  const formula = formulaDefinitions[dimension];

  return (
    <div className={`rounded-lg border p-4 flex flex-col h-full relative overflow-hidden ${status === "excellent" ? "border-l-4 border-l-green-500" :
      status === "good" ? "border-l-4 border-l-blue-500" :
        status === "needs-attention" ? "border-l-4 border-l-yellow-500" :
          "border-l-4 border-l-red-500"
      }`}>
      <div className="flex justify-between items-start">
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
        <div className={`text-xs font-medium px-2 py-1 rounded-full ${status === "excellent" ? "bg-green-100 text-green-800" :
          status === "good" ? "bg-blue-100 text-blue-800" :
            status === "needs-attention" ? "bg-yellow-100 text-yellow-800" :
              "bg-red-100 text-red-800"
          }`}>
          {percentDiff > 0 ? "+" : ""}{percentDiff}%
        </div>
      </div>

      <div className="mt-1 flex items-baseline">
        <span className="text-3xl font-semibold text-gray-900">{formattedValue}{unit}</span>
        <span className="ml-2 text-xs text-gray-500">vs {formattedBenchmark}{unit}</span>
      </div>

      <div className="mt-4 h-1 w-full bg-gray-200 rounded">
        <div
          className={`h-1 rounded ${status === "excellent" ? "bg-green-500" :
            status === "good" ? "bg-blue-500" :
              status === "needs-attention" ? "bg-yellow-500" :
                "bg-red-500"
            }`}
          style={{ width: `${Math.min(value / industryHigh * 100, 100)}%` }}
        />
      </div>

      <div className="mt-1 flex justify-between text-xs text-gray-500">
        <span>0</span>
        <span>{industryAvg}{unit}</span>
        <span>{industryHigh}{unit}</span>
      </div>

      <p className="mt-3 text-xs text-gray-600">{description}</p>

      {formula && (
        <div className="mt-2">
          <button
            onClick={() => setShowFormula(!showFormula)}
            className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
          >
            {showFormula ? "Hide formula" : "Show formula"}
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 ml-1 transition-transform ${showFormula ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showFormula && (
            <div className="mt-2 p-2 bg-gray-50 rounded-md border border-gray-200 text-xs">
              <div className="font-medium text-gray-800">{formula.formula}</div>
              <div className="mt-1 text-gray-600">{formula.calculation}</div>
              <div className="mt-1 text-gray-600">Benchmark: {formula.benchmarks}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Component for secondary metric item with formula tooltip
const SecondaryMetricItem = ({ label, value, benchmark, unit, invert = false, dimension, metric }) => {
  const [showFormula, setShowFormula] = useState(false);
  const percentDiff = ((value - benchmark) / benchmark * 100).toFixed(1);
  const isPositive = invert ? value < benchmark : value > benchmark;

  const calculation = secondaryMetricCalculations[dimension]?.[metric];

  return (
    <div className="flex flex-col py-3 border-b border-gray-100 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-800">
          {label}
          {calculation && (
            <button
              onClick={(e) => { e.stopPropagation(); setShowFormula(!showFormula); }}
              className="ml-1 text-blue-500 hover:text-blue-700"
              aria-label="Show formula details"
              title="Click to see metric details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}
        </span>
        <div className="flex items-center">
          <span className="text-sm font-medium">{value}{unit}</span>
          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {isPositive ? '↑' : '↓'} {Math.abs(percentDiff)}%
          </span>
        </div>
      </div>

      {showFormula && calculation && (
        <div className="mt-2 mb-1 p-3 bg-gray-50 rounded-md border border-gray-200 text-sm">
          <div className="font-medium text-gray-800 mb-1">Formula: {calculation.formula}</div>
          <div className="text-gray-700 mb-1">
            <span className="font-medium">Target range:</span> {calculation.targetRange[0]}{unit} - {calculation.targetRange[1]}{unit}
          </div>
          <div className="text-gray-700 flex items-center">
            <span className="font-medium mr-2">Goal:</span> 
            {calculation.interpretation === "higher-is-better" && (
              <span className="text-green-700 flex items-center">
                Higher values are better
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </span>
            )}
            {calculation.interpretation === "lower-is-better" && (
              <span className="text-blue-700 flex items-center">
                Lower values are better
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            )}
            {calculation.interpretation === "middle-is-better" && (
              <span className="text-purple-700 flex items-center">
                Mid-range values are optimal
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                </svg>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Insight card component
const InsightCard = ({ insight }) => {
  const typeColors = {
    positive: "bg-green-50 border-green-200",
    negative: "bg-red-50 border-red-200",
    warning: "bg-yellow-50 border-yellow-200"
  };

  const typeIcons = {
    positive: (
      <div className="flex-shrink-0 w-5 h-5 text-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>
    ),
    negative: (
      <div className="flex-shrink-0 w-5 h-5 text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </div>
    ),
    warning: (
      <div className="flex-shrink-0 w-5 h-5 text-yellow-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
    )
  };

  return (
    <div className={`p-4 rounded-lg border ${typeColors[insight.type]} mb-3`}>
      <div className="flex">
        {typeIcons[insight.type]}
        <div className="ml-3 w-full">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium capitalize">
              {insight.dimension} {insight.metric ? `- ${getSecondaryMetricLabel(insight.dimension, insight.metric)}` : ''}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${insight.severity === "high" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
              }`}>
              {insight.severity === "high" ? "High Priority" : "Medium Priority"}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-700">
            <p>{insight.message}</p>
            {insight.recommendation && (
              <p className="mt-1 font-medium">Recommendation: {insight.recommendation}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ROI Impact Card Component
const RoiImpactCard = ({ title, value, description, trend }) => {
  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      <h3 className="text-base font-medium text-gray-900">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <span className="text-2xl font-semibold text-gray-900">${value.toLocaleString()}</span>
        {trend && (
          <span className={`ml-2 text-xs px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="mt-3 text-xs text-gray-600">{description}</p>
    </div>
  );
};

// Main Dashboard Component with NEW ROI Section
const DXCore4Dashboard = () => {
  const [data] = useState(SAMPLE_DATA);
  const [activeDimension, setActiveDimension] = useState('overview');
  const [activeTab, setActiveTab] = useState('metrics');
  const [showDXIComponents, setShowDXIComponents] = useState(false);
  
  // Reset to metrics tab when changing dimensions if on ROI tab
  // (since ROI is only available in overview)
  React.useEffect(() => {
    if (activeTab === 'roi' && activeDimension !== 'overview') {
      setActiveTab('metrics');
    }
  }, [activeDimension, activeTab]);

  const insights = generateInsights(data);

  // Transform data for radar chart - normalize values to percentages for consistent scaling
  const radarData = [
    {
      subject: 'Speed',
      A: (data.current.primary.speed / data.industry.speed.high) * 100, // Normalize to percentage of industry high
      B: (data.industry.speed.medium / data.industry.speed.high) * 100,
      fullMark: 120, // 120% of max
      actualValue: data.current.primary.speed,
      benchmarkValue: data.industry.speed.medium
    },
    {
      subject: 'Effectiveness',
      A: (data.current.primary.effectiveness / data.industry.effectiveness.high) * 100,
      B: (data.industry.effectiveness.medium / data.industry.effectiveness.high) * 100,
      fullMark: 120,
      actualValue: data.current.primary.effectiveness,
      benchmarkValue: data.industry.effectiveness.medium
    },
    {
      subject: 'Quality',
      A: data.current.primary.quality, // Quality is already on 0-100 scale
      B: data.industry.quality.medium,
      fullMark: 100,
      actualValue: data.current.primary.quality,
      benchmarkValue: data.industry.quality.medium
    },
    {
      subject: 'Impact',
      A: data.current.primary.impact, // Impact is already on 0-100 scale
      B: data.industry.impact.medium,
      fullMark: 100,
      actualValue: data.current.primary.impact,
      benchmarkValue: data.industry.impact.medium
    }
  ];

  // Prepare trend line data with projected values
  const getProductivityTrendData = () => {
    const allQuarters = [
      ...data.productivityTrend.previousQuarters.map((value, index) => ({
        quarter: `Q${index + 1}`,
        value: value,
        type: 'historical'
      })),
      ...data.productivityTrend.projectedNext.map((value, index) => ({
        quarter: `Q${index + 5}`,
        value: value,
        type: 'projected'
      }))
    ];
    return allQuarters;
  };

  // Prepare dimension interaction data
  const getDimensionInteractionData = () => {
    return data.dimensionInteractions.map(item => ({
      name: item.dimensions,
      score: item.score * 100,
      ideal: item.ideal * 100,
      description: item.description
    }));
  };

  // Calculate total ROI
  const calculateTotalRoi = () => {
    if (!data.roi) return 0;

    return data.roi.annualSavings +
      (data.roi.failureCostReduction || 0) +
      (data.roi.speedImprovementValue || 0);
  };

  const renderROISection = () => {
    if (!data.roi) return null;

    const totalROI = calculateTotalRoi();

    return (
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">ROI Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <RoiImpactCard
            title="Total Annual ROI"
            value={totalROI}
            description="Estimated annual return from all DX Core 4 improvements"
            trend={18}
          />
          <RoiImpactCard
            title="Effectiveness ROI"
            value={data.roi.annualSavings}
            description={`From ${data.roi.effectivenessGain} point DXI gain across ${data.roi.developersCount} developers`}
            trend={22}
          />
          <RoiImpactCard
            title="Quality ROI"
            value={data.roi.failureCostReduction || 0}
            description={`From reducing failure rate from ${data.roi.previousFailRate}% to ${data.roi.currentFailRate}%`}
            trend={15}
          />
          <RoiImpactCard
            title="Speed ROI"
            value={data.roi.speedImprovementValue || 0}
            description={`From increasing diffs per engineer from ${data.roi.previousPRsPerWeek} to ${data.roi.currentPRsPerWeek}`}
            trend={12}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg border p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Productivity Improvement Trajectory</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getProductivityTrendData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis domain={[60, 90]} />
                  <Tooltip formatter={(value) => [`${value}`, 'Productivity Index']} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                    connectNulls={true}
                  />

                  {/* Reference line for current quarter */}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10B981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 6 }}
                    connectNulls={true}
                    data={getProductivityTrendData().filter(item => item.type === 'projected')}
                    name="Projected"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Dimension Balance Analysis</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getDimensionInteractionData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  barSize={30}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={50}
                    interval={0}
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    formatter={(value, name, props) => {
                      if (name === 'score') return [`${value}%`, 'Current Balance'];
                      return [`${value}%`, 'Ideal Balance'];
                    }}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Legend />
                  <Bar dataKey="score" name="Current Balance" fill="#3B82F6" />
                  <Bar dataKey="ideal" name="Ideal Balance" fill="#E5E7EB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSecondaryMetrics = (dimension) => {
    if (dimension === 'overview' || !data.current.secondary[dimension]) {
      return null;
    }

    return (
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Secondary Metrics</h3>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-600 mb-4">
            These metrics provide detailed measurements related to {dimension}. Each metric shows current value compared to benchmark.
            Click the info icon (ⓘ) next to any metric to see its formula, target range, and whether higher or lower values are better.
          </p>
          {Object.keys(data.current.secondary[dimension]).map(metric => (
            <SecondaryMetricItem
              key={metric}
              label={getSecondaryMetricLabel(dimension, metric)}
              value={data.current.secondary[dimension][metric]}
              benchmark={data.benchmarks.secondary[dimension][metric]}
              unit={getSecondaryMetricUnit(dimension, metric)}
              invert={shouldInvertMetric(dimension, metric)}
              dimension={dimension}
              metric={metric}
            />
          ))}
        </div>
      </div>
    );
  };

  // Transform weekly data for consistent scale in trend charts
  const getNormalizedWeeklyData = () => {
    // Get max values for each metric to normalize
    const maxValues = {
      speed: Math.max(...data.weeklyData.map(week => week.speed)) * 1.1,
      effectiveness: 100, // Already on a 0-100 scale
      quality: 100, // Already on a 0-100 scale
      impact: 100 // Already on a 0-100 scale
    };

    // Create normalized data while preserving original values
    return data.weeklyData.map(week => ({
      week: week.week,
      // Normalized values (0-100)
      speed_normalized: (week.speed / maxValues.speed) * 100,
      effectiveness_normalized: week.effectiveness,
      quality_normalized: week.quality,
      impact_normalized: week.impact,
      // Original values for tooltips
      speed: week.speed,
      effectiveness: week.effectiveness,
      quality: week.quality,
      impact: week.impact
    }));
  };

  const renderTrendChart = (dimension) => {
    const normalizedData = getNormalizedWeeklyData();
    
    if (dimension === 'overview') {
      // For overview, show all primary metrics
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Trends</h3>
          <div className="bg-white rounded-lg border p-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={normalizedData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 100]} label={{ value: '% of Target', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value, name, props) => {
                      // Show original values in tooltip
                      const metric = name.replace('_normalized', '');
                      const originalValue = props.payload[metric];
                      
                      // Return formatted original value with appropriate unit
                      if (metric === 'speed') {
                        return [originalValue.toFixed(1), 'Speed (PRs/Week)'];
                      } else if (metric === 'effectiveness') {
                        return [originalValue, 'Effectiveness (DXI)'];
                      } else if (metric === 'quality') {
                        return [originalValue.toFixed(1) + '%', 'Quality'];
                      } else if (metric === 'impact') {
                        return [originalValue + '%', 'Impact'];
                      }
                      return [value, name];
                    }}
                  />
                  <Legend 
                    formatter={(value) => {
                      const metric = value.replace('_normalized', '');
                      return metric.charAt(0).toUpperCase() + metric.slice(1);
                    }}
                  />
                  <Line type="monotone" name="speed_normalized" dataKey="speed_normalized" stroke="#3B82F6" activeDot={{ r: 8 }} />
                  <Line type="monotone" name="effectiveness_normalized" dataKey="effectiveness_normalized" stroke="#10B981" activeDot={{ r: 8 }} />
                  <Line type="monotone" name="quality_normalized" dataKey="quality_normalized" stroke="#F59E0B" activeDot={{ r: 8 }} />
                  <Line type="monotone" name="impact_normalized" dataKey="impact_normalized" stroke="#6366F1" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-sm text-gray-500 text-center">
              Note: Chart shows normalized values (0-100%) for consistent comparison. Hover for actual values.
            </div>
          </div>
        </div>
      );
    } else {
      // For specific dimension, show only that metric with its natural scale
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{dimension.charAt(0).toUpperCase() + dimension.slice(1)} Trend</h3>
          <div className="bg-white rounded-lg border p-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.weeklyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis 
                    domain={dimension === 'speed' ? ['auto', 'auto'] : [0, 100]}
                    label={{ 
                      value: dimension === 'speed' ? 'PRs per Week' : 
                             (dimension === 'quality' || dimension === 'impact') ? 'Percentage' : 'Score',
                      angle: -90, 
                      position: 'insideLeft' 
                    }}
                  />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (dimension === 'quality' || dimension === 'impact') {
                        return [value + '%', name.charAt(0).toUpperCase() + name.slice(1)];
                      }
                      return [value, name.charAt(0).toUpperCase() + name.slice(1)];
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey={dimension}
                    name={dimension.charAt(0).toUpperCase() + dimension.slice(1)}
                    stroke={
                      dimension === "speed" ? "#3B82F6" :
                        dimension === "effectiveness" ? "#10B981" :
                          dimension === "quality" ? "#F59E0B" :
                            "#6366F1"
                    }
                    fill={
                      dimension === "speed" ? "rgba(59, 130, 246, 0.1)" :
                        dimension === "effectiveness" ? "rgba(16, 185, 129, 0.1)" :
                          dimension === "quality" ? "rgba(245, 158, 11, 0.1)" :
                            "rgba(99, 102, 241, 0.1)"
                    }
                    activeDot={{ r: 8 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderEffectivenessDetails = () => {
    if (activeDimension !== 'effectiveness') return null;

    return (
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Developer Experience Index (DXI) Components</h3>
          <button
            onClick={() => setShowDXIComponents(!showDXIComponents)}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            {showDXIComponents ? "Hide components" : "Show all 14 components"}
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${showDXIComponents ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {showDXIComponents && (
          <div className="bg-white rounded-lg border p-4 mt-2">
            <p className="text-sm text-gray-600 mb-4">
              The DXI is a composite metric measuring 14 dimensions of developer experience predictive of productivity.
              Each one-point gain translates to approximately 13 minutes saved per developer per week.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formulaDefinitions.effectiveness.dimensions.map((dimension, index) => {
                // Mock scores for each dimension - in a real app these would come from your data
                const score = 65 + Math.floor(Math.random() * 25);
                const benchmark = 70 + Math.floor(Math.random() * 10);

                return (
                  <div key={index} className="flex justify-between items-center p-2 border-b">
                    <span className="text-sm">{dimension}</span>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-200 rounded mr-2">
                        <div
                          className={`h-2 rounded ${score >= benchmark ? 'bg-green-500' : 'bg-yellow-500'}`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">{score}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">DX Core 4 Performance Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-4">{data.teamName}</span>
              <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {data.timeRange}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dimension Selector */}
        <div className="mb-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="sm:hidden">
              <select
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                value={activeDimension}
                onChange={(e) => setActiveDimension(e.target.value)}
              >
                <option value="overview">Overview</option>
                <option value="speed">Speed</option>
                <option value="effectiveness">Effectiveness</option>
                <option value="quality">Quality</option>
                <option value="impact">Impact</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    className={`py-4 px-6 text-sm font-medium ${activeDimension === 'overview'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    onClick={() => setActiveDimension('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`py-4 px-6 text-sm font-medium ${activeDimension === 'speed'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    onClick={() => setActiveDimension('speed')}
                  >
                    Speed
                  </button>
                  <button
                    className={`py-4 px-6 text-sm font-medium ${activeDimension === 'effectiveness'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    onClick={() => setActiveDimension('effectiveness')}
                  >
                    Effectiveness
                  </button>
                  <button
                    className={`py-4 px-6 text-sm font-medium ${activeDimension === 'quality'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    onClick={() => setActiveDimension('quality')}
                  >
                    Quality
                  </button>
                  <button
                    className={`py-4 px-6 text-sm font-medium ${activeDimension === 'impact'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    onClick={() => setActiveDimension('impact')}
                  >
                    Impact
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`py-2 px-4 text-sm font-medium ${activeTab === 'metrics'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                onClick={() => setActiveTab('metrics')}
              >
                Metrics
              </button>
              <button
                className={`py-2 px-4 text-sm font-medium ${activeTab === 'insights'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                onClick={() => setActiveTab('insights')}
              >
                Insights
              </button>
              {/* Show ROI Analysis tab only on the Overview dimension */}
              {activeDimension === 'overview' && (
                <button
                  className={`py-2 px-4 text-sm font-medium ${activeTab === 'roi'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  onClick={() => setActiveTab('roi')}
                >
                  ROI Analysis
                </button>
              )}
              <button
                className={`py-2 px-4 text-sm font-medium ${activeTab === 'recommendations'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                onClick={() => setActiveTab('recommendations')}
              >
                Recommendations
              </button>
            </nav>
          </div>
        </div>

        {/* Metrics Content */}
        {activeTab === 'metrics' && (
          <>
            {/* Primary Metrics */}
            <div className="mb-6">
              {activeDimension === 'overview' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <PrimaryMetricCard
                      title="Speed"
                      value={data.current.primary.speed}
                      benchmark={data.benchmarks.primary.speed}
                      industryAvg={data.industry.speed.medium}
                      industryHigh={data.industry.speed.high}
                      description="PRs per engineer per week"
                      decimals={1}
                      dimension="speed"
                    />
                    <PrimaryMetricCard
                      title="Effectiveness"
                      value={data.current.primary.effectiveness}
                      benchmark={data.benchmarks.primary.effectiveness}
                      industryAvg={data.industry.effectiveness.medium}
                      industryHigh={data.industry.effectiveness.high}
                      description="Developer Experience Index (DXI)"
                      decimals={0}
                      dimension="effectiveness"
                    />
                    <PrimaryMetricCard
                      title="Quality"
                      value={data.current.primary.quality}
                      benchmark={data.benchmarks.primary.quality}
                      industryAvg={data.industry.quality.medium}
                      industryHigh={data.industry.quality.high}
                      description="Success rate (100% - Change Fail Rate)"
                      unit="%"
                      decimals={1}
                      dimension="quality"
                    />
                    <PrimaryMetricCard
                      title="Impact"
                      value={data.current.primary.impact}
                      benchmark={data.benchmarks.primary.impact}
                      industryAvg={data.industry.impact.medium}
                      industryHigh={data.industry.impact.high}
                      description="% of time spent on feature work"
                      unit="%"
                      decimals={0}
                      dimension="impact"
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg border p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Balance</h3>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280' }} />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                            <Radar
                              name="Your Team"
                              dataKey="A"
                              stroke="#3B82F6"
                              fill="#3B82F6"
                              fillOpacity={0.3}
                            />
                            <Radar
                              name="Industry Average"
                              dataKey="B"
                              stroke="#10B981"
                              fill="#10B981"
                              fillOpacity={0.3}
                            />
                            <Legend />
                            <Tooltip 
                              formatter={(value, name, props) => {
                                const dataIndex = radarData.findIndex(item => 
                                  item.subject === props.payload.subject);
                                
                                if (dataIndex === -1) return [value, name];
                                
                                // Return actual values instead of normalized percentages
                                const actualValue = name === "Your Team" 
                                  ? radarData[dataIndex].actualValue 
                                  : radarData[dataIndex].benchmarkValue;
                                
                                return [actualValue.toFixed(1), name];
                              }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Top Insights</h3>
                      <div className="h-80 overflow-y-auto pr-2">
                        {insights.slice(0, 3).map((insight, index) => (
                          <InsightCard key={index} insight={insight} />
                        ))}
                        {insights.length > 3 && (
                          <button
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            onClick={() => setActiveTab('insights')}
                          >
                            View all {insights.length} insights →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-lg border p-4 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 capitalize">{activeDimension}</h3>
                  <p className="text-gray-600 mb-4">{getMetricDescription(activeDimension)}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <PrimaryMetricCard
                      title={activeDimension.charAt(0).toUpperCase() + activeDimension.slice(1)}
                      value={data.current.primary[activeDimension]}
                      benchmark={data.benchmarks.primary[activeDimension]}
                      industryAvg={data.industry[activeDimension].medium}
                      industryHigh={data.industry[activeDimension].high}
                      description={getMetricDescription(activeDimension)}
                      unit={activeDimension === 'quality' || activeDimension === 'impact' ? '%' : ''}
                      decimals={activeDimension === 'speed' ? 1 : 0}
                      dimension={activeDimension}
                    />

                    <div className="col-span-2">
                      <h4 className="font-medium text-gray-800 mb-2">About this metric</h4>
                      <p className="text-sm text-gray-600">
                        {activeDimension === 'speed' &&
                          "Speed measures how quickly your team delivers code to production. Higher values indicate more frequent code delivery, while the 'PRs per engineer per week' metric normalizes for team size."}
                        {activeDimension === 'effectiveness' &&
                          "Effectiveness tracks how well your development processes and tools support engineers. The Developer Experience Index (DXI) aggregates survey responses about workflow satisfaction, tools, and development environments."}
                        {activeDimension === 'quality' &&
                          "Quality focuses on software reliability. This metric shows your success rate (the inverse of Change Fail Rate), with higher values indicating fewer production issues from deployed changes."}
                        {activeDimension === 'impact' &&
                          "Impact measures how your engineering time contributes to business value. This percentage shows how much development time is spent on feature work versus maintenance, technical debt, or unplanned work."}
                      </p>

                      <h4 className="font-medium text-gray-800 mt-4 mb-2">Interpretation</h4>
                      <p className="text-sm text-gray-600">
                        Your team is {data.current.primary[activeDimension] > data.benchmarks.primary[activeDimension] ? "above" : "below"} benchmark and {
                          data.current.primary[activeDimension] > data.industry[activeDimension].high ? "well above industry average" :
                            data.current.primary[activeDimension] > data.industry[activeDimension].medium ? "above industry average" :
                              "below industry average"
                        }.

                        {data.current.primary[activeDimension] > data.weeklyData[0][activeDimension] ?
                          ` This metric has improved by ${(((data.current.primary[activeDimension] - data.weeklyData[0][activeDimension]) / data.weeklyData[0][activeDimension]) * 100).toFixed(1)}% over the last ${data.weeklyData.length} weeks.` :
                          ` This metric has decreased by ${(((data.weeklyData[0][activeDimension] - data.current.primary[activeDimension]) / data.weeklyData[0][activeDimension]) * 100).toFixed(1)}% over the last ${data.weeklyData.length} weeks.`
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Secondary Metrics */}
            {renderSecondaryMetrics(activeDimension)}

            {/* DXI Components (only for Effectiveness) */}
            {renderEffectivenessDetails()}

            {/* Trend Charts */}
            {renderTrendChart(activeDimension)}
          </>
        )}

        {/* Insights Content */}
        {activeTab === 'insights' && (
          <div className="bg-white rounded-lg border p-4">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Performance Insights</h2>

            {activeDimension === 'overview' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Positive Insights</h3>
                  <div className="space-y-3">
                    {insights.filter(insight => insight.type === 'positive').map((insight, index) => (
                      <InsightCard key={index} insight={insight} />
                    ))}
                    {insights.filter(insight => insight.type === 'positive').length === 0 && (
                      <p className="text-gray-500 italic">No positive insights available</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Needs Attention</h3>
                  <div className="space-y-3">
                    {insights.filter(insight => insight.type === 'negative' || insight.type === 'warning').map((insight, index) => (
                      <InsightCard key={index} insight={insight} />
                    ))}
                    {insights.filter(insight => insight.type === 'negative' || insight.type === 'warning').length === 0 && (
                      <p className="text-gray-500 italic">No issues requiring attention</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3 capitalize">{activeDimension} Insights</h3>
                <div className="space-y-3">
                  {insights.filter(insight => insight.dimension === activeDimension).map((insight, index) => (
                    <InsightCard key={index} insight={insight} />
                  ))}
                  {insights.filter(insight => insight.dimension === activeDimension).length === 0 && (
                    <p className="text-gray-500 italic">No specific insights for {activeDimension}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ROI Analysis Content */}
        {activeTab === 'roi' && (
          <div className="bg-white rounded-lg border p-4">
            <h2 className="text-xl font-medium text-gray-900 mb-4">ROI Analysis</h2>

            {renderROISection()}

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Core 4 ROI Analysis Formulas</h3>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-medium text-gray-800 mb-2">Effectiveness (DXI) ROI Formula</h4>
                <div className="bg-white p-3 rounded border mb-4 text-sm">
                  <p className="font-mono">Annual Savings = DXI Points Gained × Dev Count × 13 min/week/point × 52 weeks × Hourly Rate ÷ 60</p>
                  <p className="mt-2 text-gray-600">
                    <strong>Example:</strong> A 7-point DXI increase for 18 developers at $90/hr =
                    7 × 18 × 13 × 52 × $90 ÷ 60 = $145,152 annual savings
                  </p>
                </div>

                <h4 className="font-medium text-gray-800 mb-2">Quality ROI Formula</h4>
                <div className="bg-white p-3 rounded border mb-4 text-sm">
                  <p className="font-mono">Quality ROI = (Old Failure Rate - New Failure Rate) × Deployments × Avg Cost Per Failure</p>
                  <p className="mt-2 text-gray-600">
                    <strong>Example:</strong> Reducing failure rate from 3.5% to 1.7% with 500 annual deployments at $7,000 avg cost =
                    (3.5% - 1.7%) × 500 × $7,000 = $63,000 annual savings
                  </p>
                </div>

                <h4 className="font-medium text-gray-800 mb-2">Speed ROI Formula</h4>
                <div className="bg-white p-3 rounded border mb-4 text-sm">
                  <p className="font-mono">Speed ROI = (New PRs/Week - Old PRs/Week) × Dev Count × Weeks × Value Per PR</p>
                  <p className="mt-2 text-gray-600">
                    <strong>Example:</strong> Increasing from 3.5 to 4.4 PRs/week for 18 developers at $200 value per PR =
                    (4.4 - 3.5) × 18 × 52 × $200 = $84,240 additional value
                  </p>
                </div>

                <h4 className="font-medium text-gray-800 mb-2">Impact ROI Formula</h4>
                <div className="bg-white p-3 rounded border text-sm">
                  <p className="font-mono">Impact ROI = (New Feature % - Old Feature %) × Total Dev Hours × Hourly Rate</p>
                  <p className="mt-2 text-gray-600">
                    <strong>Example:</strong> Increasing feature work from 65% to 74% for 18 developers working 2,000 hours/year at $90/hr =
                    (74% - 65%) × 18 × 2,000 × $90 = $1,458,000 additional feature value
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations Content */}
        {activeTab === 'recommendations' && (
          <div className="bg-white rounded-lg border p-4">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Recommendations</h2>

            {activeDimension === 'overview' ? (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Priority Actions</h3>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Focus Area: {
                          Object.keys(data.current.primary).reduce((a, b) =>
                            (data.current.primary[a] / data.benchmarks.primary[a] <
                              data.current.primary[b] / data.benchmarks.primary[b]) ? a : b
                          )
                        }</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>
                            Based on your current metrics, focus on improving {
                              Object.keys(data.current.primary).reduce((a, b) =>
                                (data.current.primary[a] / data.benchmarks.primary[a] <
                                  data.current.primary[b] / data.benchmarks.primary[b]) ? a : b
                              )
                            }.
                          </p>
                          <div className="mt-2 text-xs bg-yellow-50 p-2 rounded border border-yellow-200">
                            <p className="font-medium text-yellow-800">Implementation Best Practice:</p>
                            <p className="text-yellow-700 mt-1">Remember that these metrics should be used for continuous improvement, not as rigid targets or for individual evaluation. Focus on systemic improvements.</p>
                          </div>
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            {activeDimension === 'overview' && (
                              <>
                                <li>Conduct a team workshop to identify specific bottlenecks</li>
                                <li>Set a concrete improvement goal with a clear timeline</li>
                                <li>Implement targeted process changes with weekly check-ins</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Maintain Strength: {
                          Object.keys(data.current.primary).reduce((a, b) =>
                            (data.current.primary[a] / data.benchmarks.primary[a] >
                              data.current.primary[b] / data.benchmarks.primary[b]) ? a : b
                          )
                        }</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>
                            Your team excels in {
                              Object.keys(data.current.primary).reduce((a, b) =>
                                (data.current.primary[a] / data.benchmarks.primary[a] >
                                  data.current.primary[b] / data.benchmarks.primary[b]) ? a : b
                              )
                            }. Document successful practices and share with other teams.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Structural Recommendations</h3>

                  <div className="bg-white border rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Balanced Optimization Strategy</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      To maintain balance across all four dimensions, implement the following structural changes:
                    </p>
                    <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
                      <li>Establish a cross-dimensional metric review in weekly team meetings</li>
                      <li>Implement a "balance check" when optimizing any single metric</li>
                      <li>Set minimum thresholds for all four dimensions to prevent over-optimization</li>
                      <li>Rotate focus areas quarterly to ensure balanced improvement</li>
                    </ol>
                    <div className="mt-3 text-xs bg-blue-50 p-2 rounded border border-blue-200">
                      <p className="font-medium">Why balance matters:</p>
                      <p className="italic">"Speed is great, but if you're going faster while being less effective, that's not great. Business impact is great, but if you're having a lot of business impact but your quality is going down, that's not great either."</p>
                      <p className="text-right mt-1">- Laura Tacho, DX CTO</p>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Long-Term Framework Implementation</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      To fully embed the DX Core 4 framework in your engineering culture:
                    </p>
                    <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
                      <li>Include metric reviews in quarterly planning</li>
                      <li>Connect team-level metrics to goals (never for individual evaluation)</li>
                      <li>Develop training materials to ensure common understanding</li>
                      <li>Share success stories and learnings across teams</li>
                    </ol>
                    <div className="mt-3 bg-green-50 p-2 rounded border border-green-200 text-xs">
                      <p className="font-medium text-green-800">Expected Outcomes:</p>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <div className="text-center">
                          <span className="font-semibold">3-12%</span>
                          <p className="text-green-700">Engineering efficiency gain</p>
                        </div>
                        <div className="text-center">
                          <span className="font-semibold">14%</span>
                          <p className="text-green-700">More time on feature work</p>
                        </div>
                        <div className="text-center">
                          <span className="font-semibold">15%</span>
                          <p className="text-green-700">Higher employee engagement</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3 capitalize">{activeDimension} Recommendations</h3>

                <div className="bg-white border rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Specific Actions</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    {activeDimension === 'speed' && (
                      <>
                        <li>Review and optimize your PR review process to reduce wait times</li>
                        <li>Implement automated testing to accelerate validation steps</li>
                        <li>Break down larger tasks into smaller, more manageable chunks</li>
                        <li>Reduce context switching through focused work periods</li>
                        <li>Automate repetitive development tasks with scripts or tools</li>
                      </>
                    )}

                    {activeDimension === 'effectiveness' && (
                      <>
                        <li>Conduct a developer survey to identify specific pain points</li>
                        <li>Optimize CI/CD pipelines to reduce build and deployment times</li>
                        <li>Improve development environment setup and documentation</li>
                        <li>Establish dedicated time for workflow improvements</li>
                        <li>Create a process for evaluating and adopting new development tools</li>
                      </>
                    )}

                    {activeDimension === 'quality' && (
                      <>
                        <li>Implement or enhance automated testing coverage</li>
                        <li>Establish stronger code review guidelines and practices</li>
                        <li>Incorporate pre-deployment validation checks</li>
                        <li>Create a standardized incident response process</li>
                        <li>Schedule regular technical debt reduction sprints</li>
                      </>
                    )}

                    {activeDimension === 'impact' && (
                      <>
                        <li>Improve alignment between engineering work and business objectives</li>
                        <li>Implement a clear prioritization framework for engineering tasks</li>
                        <li>Establish regular cross-functional planning sessions</li>
                        <li>Create metrics to track feature usage and business impact</li>
                        <li>Balance feature development with strategic technical investments</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="bg-white border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Metrics to Track</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Focus on these specific metrics to improve your {activeDimension}:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(data.current.secondary[activeDimension]).map(metric => (
                      <div key={metric} className="p-3 bg-gray-50 rounded border">
                        <span className="font-medium text-gray-800">{getSecondaryMetricLabel(activeDimension, metric)}</span>
                        <p className="text-xs text-gray-600 mt-1">
                          Current: {data.current.secondary[activeDimension][metric]}{getSecondaryMetricUnit(activeDimension, metric)} |
                          Target: {
                            shouldInvertMetric(activeDimension, metric)
                              ? (data.benchmarks.secondary[activeDimension][metric] * 0.9).toFixed(1)
                              : (data.benchmarks.secondary[activeDimension][metric] * 1.1).toFixed(1)
                          }{getSecondaryMetricUnit(activeDimension, metric)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-6">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 text-center">
            DX Core 4 Dashboard • Based on the framework by Laura Tacho & Abi Noda • Tested with 300+ organizations
          </p>
          <p className="text-xs text-gray-400 text-center mt-1">
            A unified approach to measuring developer productivity that encapsulates DORA, SPACE, and DevEx methodologies
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DXCore4Dashboard;