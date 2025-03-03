import { useState } from 'react';
import React from 'react';
import Layout from '@/components/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown, Info, Download, Share2, LineChart, BarChart, PieChart, HelpCircle, Sliders } from 'lucide-react';

// Mock chart component - in a real app, you would use a proper charting library
const Chart = ({ type, title, description }: { type: string; title: string; description: string }) => {
  const colors = {
    speed: 'bg-blue-100 text-blue-800 border-blue-200',
    effectiveness: 'bg-purple-100 text-purple-800 border-purple-200',
    quality: 'bg-green-100 text-green-800 border-green-200',
    impact: 'bg-amber-100 text-amber-800 border-amber-200',
    mixed: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const icons = {
    line: <LineChart className="h-16 w-16 opacity-40" />,
    bar: <BarChart className="h-16 w-16 opacity-40" />,
    pie: <PieChart className="h-16 w-16 opacity-40" />
  };

  // Determine chart type for the icon
  const chartType = type.includes('line') ? 'line' : type.includes('bar') ? 'bar' : 'pie';

  // Determine color based on dimension
  let colorClass = colors.mixed;
  if (title.toLowerCase().includes('speed')) colorClass = colors.speed;
  else if (title.toLowerCase().includes('effectiveness')) colorClass = colors.effectiveness;
  else if (title.toLowerCase().includes('quality')) colorClass = colors.quality;
  else if (title.toLowerCase().includes('impact')) colorClass = colors.impact;

  return (
    <div className={`border rounded-lg p-6 flex flex-col items-center justify-center h-64 ${colorClass}`}>
      {icons[chartType]}
      <h3 className="mt-3 text-lg font-medium">{title}</h3>
      <p className="text-sm text-center mt-2">{description}</p>
    </div>
  );
};

export default function AdvancedVisualizations() {
  const [timeRange, setTimeRange] = useState('90d');
  const [teamFilter, setTeamFilter] = useState('all');
  const [comparisonMode, setComparisonMode] = useState(false);

  // Mock data for visualization config
  const visualizationConfigs = [
    // Speed dimension visualizations
    {
      id: 'speed-trend',
      title: 'Speed Metrics Trend',
      description: 'Deployment Frequency and Lead Time over time',
      type: 'line-chart',
      dimension: 'speed',
      recommended: true
    },
    {
      id: 'speed-comparison',
      title: 'Team Speed Comparison',
      description: 'Comparative analysis of team deployment speeds',
      type: 'bar-chart',
      dimension: 'speed'
    },
    {
      id: 'speed-pr-size',
      title: 'PR Size Impact on Lead Time',
      description: 'Correlation between PR size and time to merge',
      type: 'scatter-chart',
      dimension: 'speed'
    },

    // Effectiveness dimension visualizations
    {
      id: 'effectiveness-focus',
      title: 'Focus Time Analysis',
      description: 'Distribution of focus time vs interruptions',
      type: 'area-chart',
      dimension: 'effectiveness',
      recommended: true
    },
    {
      id: 'effectiveness-satisfaction',
      title: 'Developer Satisfaction Trend',
      description: 'Survey results over time with key events',
      type: 'line-chart',
      dimension: 'effectiveness'
    },
    {
      id: 'effectiveness-meetings',
      title: 'Meeting Load Distribution',
      description: 'Analysis of meeting time across teams',
      type: 'stacked-bar-chart',
      dimension: 'effectiveness'
    },

    // Quality dimension visualizations
    {
      id: 'quality-defects',
      title: 'Defect Rate Trend',
      description: 'Bug density and escape rate over time',
      type: 'line-chart',
      dimension: 'quality',
      recommended: true
    },
    {
      id: 'quality-coverage',
      title: 'Test Coverage Heatmap',
      description: 'Coverage distribution across codebase components',
      type: 'heatmap',
      dimension: 'quality'
    },
    {
      id: 'quality-debt',
      title: 'Technical Debt Allocation',
      description: 'Distribution of tech debt by category and severity',
      type: 'treemap',
      dimension: 'quality'
    },

    // Impact dimension visualizations
    {
      id: 'impact-feature',
      title: 'Feature Adoption Rates',
      description: 'User adoption rates for recent features',
      type: 'bar-chart',
      dimension: 'impact',
      recommended: true
    },
    {
      id: 'impact-business',
      title: 'Engineering Impact on Revenue',
      description: 'Correlation between releases and revenue metrics',
      type: 'combo-chart',
      dimension: 'impact'
    },
    {
      id: 'impact-customer',
      title: 'Customer Satisfaction Trend',
      description: 'NPS and CSAT scores over time with release markers',
      type: 'line-chart',
      dimension: 'impact'
    },

    // Multi-dimensional visualizations
    {
      id: 'multi-radar',
      title: 'Core 4 Dimensions Radar',
      description: 'Balanced view across all four dimensions',
      type: 'radar-chart',
      dimension: 'multi',
      recommended: true
    },
    {
      id: 'multi-correlation',
      title: 'Cross-Dimension Correlations',
      description: 'How metrics from different dimensions affect each other',
      type: 'correlation-matrix',
      dimension: 'multi'
    },
    {
      id: 'multi-team',
      title: 'Team Balance Analysis',
      description: 'Balanced performance across teams and dimensions',
      type: 'stacked-bar-chart',
      dimension: 'multi'
    }
  ];

  // Filter visualizations by selected dimension tab
  const getFilteredVisualizations = (dimension: string) => {
    if (dimension === 'recommended') {
      return visualizationConfigs.filter(config => config.recommended);
    }
    if (dimension === 'all') {
      return visualizationConfigs;
    }
    return visualizationConfigs.filter(config =>
      config.dimension === dimension || config.dimension === 'multi'
    );
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced DX Core 4 Visualizations</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Customizable visualization tools for deeper insights into your developer experience metrics
            across different timeframes, teams, and organizational contexts.
          </p>
        </div>

        {/* Filters and controls */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Visualization Controls</CardTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <HelpCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">Help</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h3 className="font-medium">Using the visualization tools</h3>
                    <p className="text-sm text-muted-foreground">
                      Customize your view using the filters above. You can select time ranges,
                      filter by team, and toggle comparison mode to see how metrics change over time.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      In a full implementation, these charts would be interactive and allow
                      drilling down into specific data points.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <CardDescription>
              Customize your view with filters and controls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="time-range" className="text-sm font-medium mb-1.5 block">
                  Time Range
                </Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger id="time-range">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 90 Days</SelectItem>
                    <SelectItem value="6m">Last 6 Months</SelectItem>
                    <SelectItem value="1y">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="team-filter" className="text-sm font-medium mb-1.5 block">
                  Team Filter
                </Label>
                <Select value={teamFilter} onValueChange={setTeamFilter}>
                  <SelectTrigger id="team-filter">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teams</SelectItem>
                    <SelectItem value="frontend">Frontend Team</SelectItem>
                    <SelectItem value="backend">Backend Team</SelectItem>
                    <SelectItem value="mobile">Mobile Team</SelectItem>
                    <SelectItem value="platform">Platform Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col justify-end">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="comparison-mode"
                    checked={comparisonMode}
                    onCheckedChange={setComparisonMode}
                  />
                  <Label htmlFor="comparison-mode">
                    Enable Comparison Mode
                  </Label>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Compare current metrics with previous periods
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <div className="flex items-center">
              <Badge variant="outline" className="mr-2">
                {teamFilter === 'all' ? 'All Teams' : `${teamFilter.charAt(0).toUpperCase() + teamFilter.slice(1)} Team`}
              </Badge>
              <Badge variant="outline">
                {timeRange === '30d' ? 'Last 30 Days' :
                  timeRange === '90d' ? 'Last 90 Days' :
                    timeRange === '6m' ? 'Last 6 Months' :
                      timeRange === '1y' ? 'Last Year' : 'Custom Range'}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Visualization tabs and displays */}
        <Tabs defaultValue="recommended" className="w-full">
          <TabsList className="grid grid-cols-6 mb-8">
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="speed">Speed</TabsTrigger>
            <TabsTrigger value="effectiveness">Effectiveness</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
          </TabsList>

          {/* Tab content for each category */}
          {['recommended', 'all', 'speed', 'effectiveness', 'quality', 'impact'].map(dimension => (
            <TabsContent key={dimension} value={dimension} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredVisualizations(dimension).map(visualization => (
                  <Card key={visualization.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{visualization.title}</CardTitle>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <Sliders className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="end" className="w-56 p-3">
                            <div className="space-y-3">
                              <div>
                                <h4 className="font-medium text-sm mb-1">Chart Options</h4>
                                <div className="grid gap-1.5">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id={`${visualization.id}-annotations`} />
                                    <Label htmlFor={`${visualization.id}-annotations`} className="text-xs">Show annotations</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id={`${visualization.id}-trends`} defaultChecked />
                                    <Label htmlFor={`${visualization.id}-trends`} className="text-xs">Show trend lines</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id={`${visualization.id}-benchmarks`} defaultChecked />
                                    <Label htmlFor={`${visualization.id}-benchmarks`} className="text-xs">Show benchmarks</Label>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm mb-1">Date Range</h4>
                                <div className="grid gap-1.5">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id={`${visualization.id}-custom-range`} />
                                    <Label htmlFor={`${visualization.id}-custom-range`} className="text-xs">Custom for this chart</Label>
                                  </div>
                                </div>
                              </div>
                              <Button size="sm" className="w-full">Apply</Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <CardDescription>
                        {visualization.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Chart
                        type={visualization.type}
                        title={visualization.title}
                        description={visualization.description}
                      />
                    </CardContent>
                    <CardFooter className="border-t px-6 py-3 flex justify-between items-center">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Info className="h-3 w-3" />
                        <span>{timeRange === '90d' ? 'Last 90 Days' : 'Custom Period'}</span>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                        Expand
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Custom dashboard button */}
              <div className="flex justify-center mt-8">
                <Button className="px-6">
                  Create Custom Dashboard
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Advanced features section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Visualization Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Custom Metrics Integration</CardTitle>
                <CardDescription>Connect your own data sources</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  Integrate metrics from your own data sources and systems to create custom visualizations.
                  Support for GitHub, GitLab, Jira, Jenkins, and custom API endpoints.
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-1">
                  <li>Data source connectors</li>
                  <li>Custom metric definitions</li>
                  <li>Automated data refresh</li>
                  <li>Historical data import</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Configure Data Sources</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Correlation Analysis</CardTitle>
                <CardDescription>Discover relationships between metrics</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  Use advanced statistical analysis to discover how metrics from different dimensions
                  correlate with each other, revealing hidden patterns and opportunities.
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-1">
                  <li>Cross-dimension correlations</li>
                  <li>Leading indicator identification</li>
                  <li>Anomaly detection</li>
                  <li>Predictive trend analysis</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Explore Correlations</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Executive Dashboards</CardTitle>
                <CardDescription>Business-focused views of DX metrics</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  Create executive-friendly dashboards that connect developer experience metrics
                  directly to business outcomes and ROI, perfect for leadership presentations.
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-1">
                  <li>Business impact focus</li>
                  <li>ROI calculation widgets</li>
                  <li>Competitive benchmarking</li>
                  <li>Auto-generated insights</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Build Executive View</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Coming soon features */}
        <div className="mt-16 bg-gray-50 border border-gray-100 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
          <p className="text-gray-600 mb-6">New visualization capabilities under development</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-medium text-gray-900">AI-Powered Insights</h3>
              <p className="text-sm text-gray-600 mt-1">Automated analysis and recommendations based on your metrics patterns</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-medium text-gray-900">Team Comparison Tools</h3>
              <p className="text-sm text-gray-600 mt-1">Advanced team comparison features with normalized metrics for fair evaluation</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-medium text-gray-900">Predictive Analytics</h3>
              <p className="text-sm text-gray-600 mt-1">Forecast future metrics based on historical trends and planned changes</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-medium text-gray-900">Mobile Dashboards</h3>
              <p className="text-sm text-gray-600 mt-1">Access your DX Core 4 visualizations on the go with responsive mobile interfaces</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}