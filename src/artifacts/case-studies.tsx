import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout';

type CaseStudy = {
  id: string;
  company: string;
  industry: string;
  size: string;
  challenge: string;
  solution: string;
  results: {
    speed: string;
    effectiveness: string;
    quality: string;
    impact: string;
    roi: string;
  };
  dimensions: ('speed' | 'effectiveness' | 'quality' | 'impact')[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
};

const caseStudies: CaseStudy[] = [
  {
    id: 'fintech-speed',
    company: 'MoneyWise Technologies',
    industry: 'FinTech',
    size: '250+ developers',
    challenge: 'Slow deployment cycles (2-3 weeks) leading to delayed feature releases and competitive disadvantage',
    solution: 'Implemented automated CI/CD pipelines with integrated DX Core 4 metrics to identify and remove deployment bottlenecks',
    results: {
      speed: 'Reduced lead time from 17 days to 2.5 days; increased deployment frequency from bi-weekly to daily',
      effectiveness: 'Decreased context switching by 42%; improved developer satisfaction scores from 6.2 to 8.4/10',
      quality: 'Reduced post-deployment incidents by 35%',
      impact: 'Accelerated time-to-market for new features by 64%; increased revenue by 22% YoY',
      roi: '315% ROI over 12 months with $3.2M in additional revenue and $850K in cost savings'
    },
    dimensions: ['speed', 'effectiveness'],
    testimonial: {
      quote: "The DX Core 4 framework gave us precise metrics to identify where our development process was breaking down. The speed dimension metrics showed us exactly where to focus our improvement efforts, and the results were transformative.",
      author: "Sarah Chen",
      role: "CTO, MoneyWise Technologies"
    }
  },
  {
    id: 'healthcare-quality',
    company: 'MediCare Solutions',
    industry: 'Healthcare',
    size: '120+ developers',
    challenge: 'High defect rates and compliance issues causing regulatory concerns and customer dissatisfaction',
    solution: 'Applied DX Core 4 quality metrics to implement test-driven development, code reviews, and automated compliance checks',
    results: {
      speed: 'Maintained deployment frequency while adding compliance checks',
      effectiveness: 'Reduced time spent on defect remediation by 40%',
      quality: 'Decreased critical bugs by 78%; improved code coverage from 62% to 94%; zero compliance violations for 12 months',
      impact: 'Customer satisfaction scores increased from 3.2 to 4.7/5; secured two major enterprise contracts worth $5.4M',
      roi: '280% ROI with $1.2M reduction in support costs and $4.2M in new business'
    },
    dimensions: ['quality', 'impact'],
    testimonial: {
      quote: "In healthcare tech, quality isn't optional—it's essential. The DX Core 4 framework helped us build a development culture where quality is measurable, visible, and prioritized.",
      author: "Dr. Michael Okoye",
      role: "VP of Engineering, MediCare Solutions"
    }
  },
  {
    id: 'ecommerce-effectiveness',
    company: 'ShopFast',
    industry: 'E-Commerce',
    size: '180+ developers',
    challenge: 'Developer burnout and productivity issues during seasonal peaks causing missed deadlines',
    solution: 'Implemented DX Core 4 effectiveness dimension measurements and workflow optimizations',
    results: {
      speed: 'Increased deployment frequency by 35% during peak seasons',
      effectiveness: 'Reduced meeting time by 60%; decreased flow state interruptions from 8.2 to 2.1 per day; improved developer satisfaction from 5.9 to 8.8/10',
      quality: 'Maintained quality metrics despite increased velocity',
      impact: 'Successfully handled 42% YoY growth in Black Friday traffic with zero outages',
      roi: '240% ROI through $1.8M in developer productivity gains and $2.2M in prevented outage losses'
    },
    dimensions: ['effectiveness', 'speed'],
    testimonial: {
      quote: "Our developers were working harder but accomplishing less. The effectiveness metrics in DX Core 4 showed us exactly why—too many interruptions and context switching. Once we addressed those issues, our team's capabilities seemed to multiply.",
      author: "Jamie Rodriguez",
      role: "Engineering Director, ShopFast"
    }
  },
  {
    id: 'saas-impact',
    company: 'CloudServe',
    industry: 'SaaS',
    size: '350+ developers',
    challenge: 'Difficulty measuring and demonstrating engineering contribution to business value',
    solution: 'Implemented DX Core 4 impact dimension metrics with business outcome tracking',
    results: {
      speed: 'Maintained existing deployment velocities',
      effectiveness: 'Improved developer satisfaction by 24%',
      quality: 'Maintained existing quality standards',
      impact: 'Increased feature usage by 38%; reduced churn by 12%; boosted conversion rates by 8.5%; secured $12M in additional funding',
      roi: '420% ROI with $8.4M in retained revenue and $6.3M in new revenue'
    },
    dimensions: ['impact', 'effectiveness'],
    testimonial: {
      quote: "Before DX Core 4, we couldn't clearly connect our engineering work to business outcomes. The impact metrics changed everything—now we can show exactly how our development decisions affect customer retention, acquisition, and revenue.",
      author: "Alex Thompson",
      role: "CEO, CloudServe"
    }
  },
  {
    id: 'gaming-balanced',
    company: 'GameVerse',
    industry: 'Gaming',
    size: '200+ developers',
    challenge: 'Balancing rapid updates with stability in a competitive live service game environment',
    solution: 'Implemented all four DX Core 4 dimensions with balanced metrics and team-level dashboards',
    results: {
      speed: 'Increased deployment frequency from bi-weekly to twice-weekly',
      effectiveness: 'Improved flow state time by 65%; reduced onboarding time for new developers by 43%',
      quality: 'Reduced game-breaking bugs by 82%; improved test coverage from 70% to 91%',
      impact: 'Monthly active users increased by 28%; in-game purchases up 35%; player session length increased by 22%',
      roi: '380% ROI with $4.2M in additional revenue and $1.8M in efficiency gains'
    },
    dimensions: ['speed', 'effectiveness', 'quality', 'impact'],
    testimonial: {
      quote: "The magic of DX Core 4 is in the balance. We improved in all four dimensions simultaneously, which created a virtuous cycle. Better developer experience led to better games, happier players, and stronger business results.",
      author: "Elena Kuznetsova",
      role: "CTO, GameVerse"
    }
  }
];

const DimensionBadge = ({ dimension }: { dimension: string }) => {
  const colors: Record<string, string> = {
    speed: 'bg-blue-100 text-blue-800',
    effectiveness: 'bg-purple-100 text-purple-800',
    quality: 'bg-green-100 text-green-800',
    impact: 'bg-amber-100 text-amber-800'
  };

  const labels: Record<string, string> = {
    speed: 'Speed',
    effectiveness: 'Effectiveness',
    quality: 'Quality',
    impact: 'Impact'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[dimension]}`}>
      {labels[dimension]}
    </span>
  );
};

export default function CaseStudies() {
  const [filter, setFilter] = useState<string>('all');

  const filteredCaseStudies = filter === 'all'
    ? caseStudies
    : caseStudies.filter(study => study.dimensions.includes(filter as any));

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">DX Core 4 Framework Case Studies</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Real-world examples of organizations that have successfully implemented the DX Core 4 framework,
            with measurable improvements across Speed, Effectiveness, Quality, and Impact dimensions.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full mb-8">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setFilter('all')}>All Case Studies</TabsTrigger>
              <TabsTrigger value="speed" onClick={() => setFilter('speed')}>Speed</TabsTrigger>
              <TabsTrigger value="effectiveness" onClick={() => setFilter('effectiveness')}>Effectiveness</TabsTrigger>
              <TabsTrigger value="quality" onClick={() => setFilter('quality')}>Quality</TabsTrigger>
              <TabsTrigger value="impact" onClick={() => setFilter('impact')}>Impact</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCaseStudies.map((study) => (
                <Card key={study.id} className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-1">{study.company}</CardTitle>
                        <CardDescription>{study.industry} • {study.size}</CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {study.dimensions.map((dim) => (
                          <DimensionBadge key={dim} dimension={dim} />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 mb-1">Challenge:</h3>
                      <p className="text-gray-600 text-sm">{study.challenge}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 mb-1">Solution:</h3>
                      <p className="text-gray-600 text-sm">{study.solution}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-1">Key Results:</h3>
                      <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                        {study.dimensions.map((dim) => (
                          <li key={dim}><span className="font-medium">{dim.charAt(0).toUpperCase() + dim.slice(1)}:</span> {study.results[dim]}</li>
                        ))}
                        <li><span className="font-medium">ROI:</span> {study.results.roi}</li>
                      </ul>
                    </div>
                  </CardContent>
                  {study.testimonial && (
                    <CardFooter className="border-t bg-gray-50 rounded-b-lg">
                      <div>
                        <p className="text-gray-600 text-sm italic mb-2">"{study.testimonial.quote}"</p>
                        <p className="text-gray-700 text-sm font-medium">{study.testimonial.author}, {study.testimonial.role}</p>
                      </div>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* The same content for all tabs but with filtered data */}
          <TabsContent value="speed" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCaseStudies.map((study) => (
                <Card key={study.id} className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-1">{study.company}</CardTitle>
                        <CardDescription>{study.industry} • {study.size}</CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {study.dimensions.map((dim) => (
                          <DimensionBadge key={dim} dimension={dim} />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 mb-1">Challenge:</h3>
                      <p className="text-gray-600 text-sm">{study.challenge}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 mb-1">Solution:</h3>
                      <p className="text-gray-600 text-sm">{study.solution}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-1">Key Results:</h3>
                      <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                        {study.dimensions.map((dim) => (
                          <li key={dim}><span className="font-medium">{dim.charAt(0).toUpperCase() + dim.slice(1)}:</span> {study.results[dim]}</li>
                        ))}
                        <li><span className="font-medium">ROI:</span> {study.results.roi}</li>
                      </ul>
                    </div>
                  </CardContent>
                  {study.testimonial && (
                    <CardFooter className="border-t bg-gray-50 rounded-b-lg">
                      <div>
                        <p className="text-gray-600 text-sm italic mb-2">"{study.testimonial.quote}"</p>
                        <p className="text-gray-700 text-sm font-medium">{study.testimonial.author}, {study.testimonial.role}</p>
                      </div>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Repeat for effectiveness, quality, and impact tabs */}
          <TabsContent value="effectiveness" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCaseStudies.map((study) => (
                <Card key={study.id} className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-1">{study.company}</CardTitle>
                        <CardDescription>{study.industry} • {study.size}</CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {study.dimensions.map((dim) => (
                          <DimensionBadge key={dim} dimension={dim} />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 mb-1">Challenge:</h3>
                      <p className="text-gray-600 text-sm">{study.challenge}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 mb-1">Solution:</h3>
                      <p className="text-gray-600 text-sm">{study.solution}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-1">Key Results:</h3>
                      <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                        {study.dimensions.map((dim) => (
                          <li key={dim}><span className="font-medium">{dim.charAt(0).toUpperCase() + dim.slice(1)}:</span> {study.results[dim]}</li>
                        ))}
                        <li><span className="font-medium">ROI:</span> {study.results.roi}</li>
                      </ul>
                    </div>
                  </CardContent>
                  {study.testimonial && (
                    <CardFooter className="border-t bg-gray-50 rounded-b-lg">
                      <div>
                        <p className="text-gray-600 text-sm italic mb-2">"{study.testimonial.quote}"</p>
                        <p className="text-gray-700 text-sm font-medium">{study.testimonial.author}, {study.testimonial.role}</p>
                      </div>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quality" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCaseStudies.map((study) => (
                <Card key={study.id} className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-1">{study.company}</CardTitle>
                        <CardDescription>{study.industry} • {study.size}</CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {study.dimensions.map((dim) => (
                          <DimensionBadge key={dim} dimension={dim} />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 mb-1">Challenge:</h3>
                      <p className="text-gray-600 text-sm">{study.challenge}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 mb-1">Solution:</h3>
                      <p className="text-gray-600 text-sm">{study.solution}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-1">Key Results:</h3>
                      <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                        {study.dimensions.map((dim) => (
                          <li key={dim}><span className="font-medium">{dim.charAt(0).toUpperCase() + dim.slice(1)}:</span> {study.results[dim]}</li>
                        ))}
                        <li><span className="font-medium">ROI:</span> {study.results.roi}</li>
                      </ul>
                    </div>
                  </CardContent>
                  {study.testimonial && (
                    <CardFooter className="border-t bg-gray-50 rounded-b-lg">
                      <div>
                        <p className="text-gray-600 text-sm italic mb-2">"{study.testimonial.quote}"</p>
                        <p className="text-gray-700 text-sm font-medium">{study.testimonial.author}, {study.testimonial.role}</p>
                      </div>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="impact" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCaseStudies.map((study) => (
                <Card key={study.id} className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-1">{study.company}</CardTitle>
                        <CardDescription>{study.industry} • {study.size}</CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {study.dimensions.map((dim) => (
                          <DimensionBadge key={dim} dimension={dim} />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 mb-1">Challenge:</h3>
                      <p className="text-gray-600 text-sm">{study.challenge}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-700 mb-1">Solution:</h3>
                      <p className="text-gray-600 text-sm">{study.solution}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-1">Key Results:</h3>
                      <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                        {study.dimensions.map((dim) => (
                          <li key={dim}><span className="font-medium">{dim.charAt(0).toUpperCase() + dim.slice(1)}:</span> {study.results[dim]}</li>
                        ))}
                        <li><span className="font-medium">ROI:</span> {study.results.roi}</li>
                      </ul>
                    </div>
                  </CardContent>
                  {study.testimonial && (
                    <CardFooter className="border-t bg-gray-50 rounded-b-lg">
                      <div>
                        <p className="text-gray-600 text-sm italic mb-2">"{study.testimonial.quote}"</p>
                        <p className="text-gray-700 text-sm font-medium">{study.testimonial.author}, {study.testimonial.role}</p>
                      </div>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 max-w-4xl mx-auto mt-12">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">How to Use These Case Studies</h2>
          <ul className="space-y-3 text-blue-800">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center bg-blue-200 rounded-full h-6 w-6 text-blue-800 mr-3 flex-shrink-0 mt-0.5">1</span>
              <span><strong>Identify similar challenges</strong> - Find organizations that faced challenges similar to yours</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center bg-blue-200 rounded-full h-6 w-6 text-blue-800 mr-3 flex-shrink-0 mt-0.5">2</span>
              <span><strong>Understand implementation approaches</strong> - Learn from their solutions and adaptations of the DX Core 4 framework</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center bg-blue-200 rounded-full h-6 w-6 text-blue-800 mr-3 flex-shrink-0 mt-0.5">3</span>
              <span><strong>Set realistic expectations</strong> - Use their results as benchmarks for your own implementation</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center bg-blue-200 rounded-full h-6 w-6 text-blue-800 mr-3 flex-shrink-0 mt-0.5">4</span>
              <span><strong>Craft your success story</strong> - Document your metrics before, during, and after implementation to create your own case study</span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}