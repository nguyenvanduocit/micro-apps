import { useState } from 'react';
import React from 'react';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, ChevronRight, CircleHelp, Trophy } from 'lucide-react';

type TutorialStep = {
  id: string;
  title: string;
  description: string;
  content: string;
  action: string;
  tips: string[];
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
};

type TutorialPhase = {
  id: string;
  title: string;
  description: string;
  steps: TutorialStep[];
};

const tutorialPhases: TutorialPhase[] = [
  {
    id: 'preparation',
    title: 'Phase 1: Preparation',
    description: 'Understand the framework and establish your baseline metrics',
    steps: [
      {
        id: 'understand-framework',
        title: 'Understanding the Framework',
        description: 'Learn about the Core 4 dimensions and how they work together',
        content: `
          <div class="space-y-4">
            <p>The DX Core 4 framework measures developer experience across four critical dimensions:</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 class="font-semibold text-blue-800">Speed</h3>
                <p class="text-sm text-blue-700">How quickly can developers deliver value? This dimension measures deployment frequency, lead time, and overall velocity metrics.</p>
              </div>
              
              <div class="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <h3 class="font-semibold text-purple-800">Effectiveness</h3>
                <p class="text-sm text-purple-700">How productive are developers in their daily work? Measures flow state, context switching, and overall developer productivity.</p>
              </div>
              
              <div class="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 class="font-semibold text-green-800">Quality</h3>
                <p class="text-sm text-green-700">How reliable is the software being produced? Tracks defect rates, test coverage, and measures of software quality.</p>
              </div>
              
              <div class="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <h3 class="font-semibold text-amber-800">Impact</h3>
                <p class="text-sm text-amber-700">How does development work contribute to business outcomes? Connects engineering metrics to customer value and business results.</p>
              </div>
            </div>
            
            <p class="italic text-gray-600 border-l-4 border-gray-200 pl-4 py-1">
              "The power of the Core 4 framework lies in its balance. When you optimize all dimensions together, you create
              a virtuous cycle where improvements in one area positively affect others."
              <span class="block mt-1 text-gray-500">— Laura Tacho, DX Core 4 Framework Creator</span>
            </p>
          </div>
        `,
        action: 'Continue to next step',
        tips: [
          'Remember that all four dimensions are interconnected',
          'Consider how each dimension affects your specific team challenges',
          'Balanced optimization is key to sustainable improvement'
        ],
        quiz: {
          question: 'What is the primary focus of the "Effectiveness" dimension?',
          options: [
            'How quickly teams can ship code',
            'How productive developers are in their daily work',
            'How reliable the software is',
            'How development work impacts business outcomes'
          ],
          correctIndex: 1,
          explanation: 'The Effectiveness dimension focuses on developer productivity in daily work, including measures of flow state, context switching, and satisfaction. It helps identify barriers to productive work.'
        }
      },
      {
        id: 'assess-current-state',
        title: 'Assessing Your Current State',
        description: 'Establish baseline metrics for each Core 4 dimension',
        content: `
          <div class="space-y-4">
            <p>Before implementing improvements, you need to understand your current metrics across all four dimensions:</p>
            
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white rounded-lg overflow-hidden">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Dimension</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Metrics to Establish</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Data Sources</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr>
                    <td class="px-4 py-3 text-sm text-blue-800 font-medium">Speed</td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                      <ul class="list-disc list-inside">
                        <li>Deployment frequency</li>
                        <li>Lead time for changes</li>
                        <li>Time to first commit</li>
                        <li>PR/MR cycle time</li>
                      </ul>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                      <ul class="list-disc list-inside">
                        <li>CI/CD systems</li>
                        <li>Version control history</li>
                        <li>Release management tools</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 text-sm text-purple-800 font-medium">Effectiveness</td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                      <ul class="list-disc list-inside">
                        <li>Context switching frequency</li>
                        <li>Meeting load</li>
                        <li>Developer satisfaction</li>
                        <li>Flow state disruption</li>
                      </ul>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                      <ul class="list-disc list-inside">
                        <li>Developer surveys</li>
                        <li>Calendar analysis</li>
                        <li>Work management tools</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 text-sm text-green-800 font-medium">Quality</td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                      <ul class="list-disc list-inside">
                        <li>Defect rates</li>
                        <li>Test coverage</li>
                        <li>Time spent on rework</li>
                        <li>MTTR (Mean Time to Recovery)</li>
                      </ul>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                      <ul class="list-disc list-inside">
                        <li>Bug tracking systems</li>
                        <li>Test coverage reports</li>
                        <li>Incident management tools</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 text-sm text-amber-800 font-medium">Impact</td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                      <ul class="list-disc list-inside">
                        <li>Feature usage rates</li>
                        <li>Customer satisfaction</li>
                        <li>Revenue attribution</li>
                        <li>Business outcome alignment</li>
                      </ul>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                      <ul class="list-disc list-inside">
                        <li>Product analytics</li>
                        <li>Customer feedback systems</li>
                        <li>Business metrics dashboards</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <h3 class="font-medium text-yellow-800">Important Note:</h3>
              <p class="text-sm text-yellow-700">Don't be discouraged if you can't establish all metrics immediately. Start with what's accessible and build your measurement capabilities over time.</p>
            </div>
          </div>
        `,
        action: 'Continue to next step',
        tips: [
          'Start with metrics that are easy to measure',
          'Involve developers in the measurement process',
          'Document your baseline for future comparison',
          'Look for existing data sources before creating new ones'
        ],
        quiz: {
          question: 'What is the recommended approach if you cannot establish all metrics immediately?',
          options: [
            'Delay implementation until all metrics can be measured',
            'Focus only on speed metrics as they are easiest to measure',
            'Start with accessible metrics and build measurement capabilities over time',
            'Use industry benchmarks instead of your own metrics'
          ],
          correctIndex: 2,
          explanation: 'It\'s recommended to start with metrics that are currently accessible to you and gradually build your measurement capabilities over time. This pragmatic approach allows you to begin implementation without being blocked by perfect measurement.'
        }
      },
      {
        id: 'establish-goals',
        title: 'Establishing Improvement Goals',
        description: 'Define clear, balanced objectives across all four dimensions',
        content: `
          <div class="space-y-4">
            <p>With baseline metrics established, it's time to set improvement goals. Effective goals should be:</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 class="font-semibold text-gray-800">Specific & Measurable</h3>
                <p class="text-sm text-gray-700">Use concrete metrics with clear targets (e.g., "Reduce deployment lead time from 5 days to 2 days")</p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 class="font-semibold text-gray-800">Balanced Across Dimensions</h3>
                <p class="text-sm text-gray-700">Avoid overemphasizing one dimension at the expense of others</p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 class="font-semibold text-gray-800">Realistic & Time-bound</h3>
                <p class="text-sm text-gray-700">Set achievable targets with clear timeframes for accomplishment</p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 class="font-semibold text-gray-800">Team-focused</h3>
                <p class="text-sm text-gray-700">Oriented around team metrics, not individual performance</p>
              </div>
            </div>
            
            <p>Sample improvement goals for each dimension:</p>
            
            <div class="space-y-3">
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center bg-blue-100 rounded-full h-6 w-6 text-blue-800 mr-3 flex-shrink-0 mt-0.5">S</span>
                <div>
                  <h4 class="font-medium text-blue-800">Speed Goal Example</h4>
                  <p class="text-sm text-gray-700">"Increase deployment frequency from twice monthly to weekly within 90 days while maintaining quality metrics."</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center bg-purple-100 rounded-full h-6 w-6 text-purple-800 mr-3 flex-shrink-0 mt-0.5">E</span>
                <div>
                  <h4 class="font-medium text-purple-800">Effectiveness Goal Example</h4>
                  <p class="text-sm text-gray-700">"Reduce meeting time by 25% within 60 days to increase available focus time for developers."</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center bg-green-100 rounded-full h-6 w-6 text-green-800 mr-3 flex-shrink-0 mt-0.5">Q</span>
                <div>
                  <h4 class="font-medium text-green-800">Quality Goal Example</h4>
                  <p class="text-sm text-gray-700">"Increase test coverage from 65% to 80% and reduce critical bugs by 30% within 120 days."</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center bg-amber-100 rounded-full h-6 w-6 text-amber-800 mr-3 flex-shrink-0 mt-0.5">I</span>
                <div>
                  <h4 class="font-medium text-amber-800">Impact Goal Example</h4>
                  <p class="text-sm text-gray-700">"Increase feature adoption rates by 15% within 90 days by improving developer-product collaboration."</p>
                </div>
              </div>
            </div>
            
            <div class="bg-red-50 p-4 rounded-lg border border-red-100">
              <h3 class="font-medium text-red-800">Warning:</h3>
              <p class="text-sm text-red-700">Be careful not to create goals that optimize one dimension at the expense of others. For example, increasing speed while neglecting quality can lead to technical debt and future slowdowns.</p>
            </div>
          </div>
        `,
        action: 'Complete Phase 1',
        tips: [
          'Involve the entire team in goal setting',
          'Consider your organization\'s strategic priorities',
          'Start with 1-2 goals per dimension to avoid overwhelming the team',
          'Look for goals that create positive reinforcement between dimensions'
        ],
        quiz: {
          question: 'What important characteristic should improvement goals have to avoid problems?',
          options: [
            'They should focus primarily on speed metrics',
            'They should be created solely by management',
            'They should be balanced across all four dimensions',
            'They should target individual developer performance'
          ],
          correctIndex: 2,
          explanation: 'Goals should be balanced across all four dimensions of the DX Core 4 framework. Focusing too heavily on one dimension (like speed) at the expense of others can create problems like technical debt, burnout, or poor quality. Balance ensures sustainable improvement.'
        }
      }
    ]
  },
  {
    id: 'implementation',
    title: 'Phase 2: Implementation',
    description: 'Apply targeted improvements across all four dimensions',
    steps: [
      {
        id: 'speed-improvements',
        title: 'Speed Dimension Improvements',
        description: 'Streamline processes to deliver value faster',
        content: `
          <div class="space-y-4">
            <p>The Speed dimension focuses on how quickly developers can deliver value. Here are proven tactics to improve speed metrics:</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-800 text-lg">Continuous Integration</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Implement automated CI pipelines</li>
                    <li>Set up automated testing in the pipeline</li>
                    <li>Configure fast feedback mechanisms</li>
                    <li>Standardize build environments</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-800 text-lg">Pull Request Workflow</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Create PR templates to standardize information</li>
                    <li>Implement PR size limits (200-400 lines ideal)</li>
                    <li>Set up automated code review tools</li>
                    <li>Establish SLAs for PR reviews (24 hours max)</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-800 text-lg">Deployment Automation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Implement Continuous Deployment</li>
                    <li>Automate environment provisioning</li>
                    <li>Create rollback mechanisms</li>
                    <li>Use feature flags for safer releases</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-800 text-lg">Development Environment</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Standardize dev environment setup</li>
                    <li>Create automated onboarding scripts</li>
                    <li>Document environment quirks</li>
                    <li>Implement local testing capabilities</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 class="font-medium text-blue-800">Implementation Checklist:</h3>
              <div class="mt-2 space-y-2">
                <div class="flex items-center">
                  <input type="checkbox" id="ci" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label for="ci" class="ml-2 block text-sm text-blue-700">Implement or improve CI/CD pipeline</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="pr" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label for="pr" class="ml-2 block text-sm text-blue-700">Optimize pull request workflow</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="auto" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label for="auto" class="ml-2 block text-sm text-blue-700">Increase automation in build and deployment</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="env" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label for="env" class="ml-2 block text-sm text-blue-700">Standardize development environments</label>
                </div>
              </div>
            </div>
            
            <p class="italic text-gray-600 border-l-4 border-gray-200 pl-4 py-1">
              "Engineering teams that deploy frequently build a deployment muscle memory that dramatically reduces the risk of each release."
              <span class="block mt-1 text-gray-500">— From "Accelerate: The Science of Lean Software and DevOps"</span>
            </p>
          </div>
        `,
        action: 'Continue to next step',
        tips: [
          'Focus on eliminating bottlenecks first',
          'Measure baseline speed metrics before making changes',
          'Look for quick wins in the deployment pipeline',
          'Consider trunk-based development to reduce merge complications'
        ],
        quiz: {
          question: 'What is an optimal size range for pull requests that balances speed and review quality?',
          options: [
            '50-100 lines of code',
            '200-400 lines of code',
            '500-1000 lines of code',
            'Size doesn\'t impact review quality or speed'
          ],
          correctIndex: 1,
          explanation: 'Research shows that pull requests between 200-400 lines of code offer the best balance between review quality and speed. Smaller PRs may not deliver enough value, while larger PRs become too difficult to review effectively and often get delayed.'
        }
      },
      {
        id: 'effectiveness-improvements',
        title: 'Effectiveness Dimension Improvements',
        description: 'Maximize developer productivity and job satisfaction',
        content: `
          <div class="space-y-4">
            <p>The Effectiveness dimension focuses on developer productivity and satisfaction. Here are proven ways to improve effectiveness:</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-800 text-lg">Focus Time Protection</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Implement no-meeting days or blocks</li>
                    <li>Create focus time policies (4+ hour blocks)</li>
                    <li>Use status indicators for focus sessions</li>
                    <li>Batch communications and notifications</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-800 text-lg">Meeting Optimization</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Audit and reduce recurring meetings</li>
                    <li>Implement meeting-free days</li>
                    <li>Require agendas and timeboxing</li>
                    <li>Convert status meetings to async updates</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-800 text-lg">Context Switching Reduction</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Limit WIP (work in progress) items</li>
                    <li>Create adequate documentation</li>
                    <li>Improve knowledge sharing</li>
                    <li>Reduce dependencies between teams</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-800 text-lg">Developer Tooling</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Provide high-quality development tools</li>
                    <li>Invest in fast hardware and environments</li>
                    <li>Create code snippets and templates</li>
                    <li>Automate repetitive tasks</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div class="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h3 class="font-medium text-purple-800">Implementation Checklist:</h3>
              <div class="mt-2 space-y-2">
                <div class="flex items-center">
                  <input type="checkbox" id="focus" class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                  <label for="focus" class="ml-2 block text-sm text-purple-700">Establish focus time policies</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="meetings" class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                  <label for="meetings" class="ml-2 block text-sm text-purple-700">Audit and optimize meeting schedule</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="context" class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                  <label for="context" class="ml-2 block text-sm text-purple-700">Implement WIP limits and reduce context switching</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="tools" class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                  <label for="tools" class="ml-2 block text-sm text-purple-700">Improve development tools and environment</label>
                </div>
              </div>
            </div>
            
            <p class="italic text-gray-600 border-l-4 border-gray-200 pl-4 py-1">
              "Each time a developer is interrupted, it takes an average of 23 minutes to get back into flow state. Protecting focus time isn't a luxury—it's a necessity for complex problem solving."
              <span class="block mt-1 text-gray-500">— From "Developer Effectiveness" by Laura Tacho</span>
            </p>
          </div>
        `,
        action: 'Continue to next step',
        tips: [
          'Start by tracking interruptions and context switches',
          'Survey developers to identify their biggest productivity blockers',
          'Pilot changes with a single team before rolling out widely',
          'Combine effectiveness initiatives with speed improvements'
        ],
        quiz: {
          question: 'According to research, how long does it take on average for a developer to regain focus after being interrupted?',
          options: [
            '5 minutes',
            '10 minutes',
            '23 minutes',
            '45 minutes'
          ],
          correctIndex: 2,
          explanation: 'Research shows it takes an average of 23 minutes for a developer to return to a flow state after an interruption. This significant context-switching cost is why focused time protection is critical for developer effectiveness.'
        }
      },
      {
        id: 'quality-improvements',
        title: 'Quality Dimension Improvements',
        description: 'Enhance software reliability and reduce technical debt',
        content: `
          <div class="space-y-4">
            <p>The Quality dimension focuses on the reliability and maintainability of your software. Here are proven ways to improve quality:</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800 text-lg">Automated Testing</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Implement comprehensive test automation</li>
                    <li>Establish code coverage requirements</li>
                    <li>Create testing guidelines and training</li>
                    <li>Set up test-driven development practices</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800 text-lg">Code Review Process</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Establish clear code review guidelines</li>
                    <li>Implement automated code analysis</li>
                    <li>Create PR templates with quality checklist</li>
                    <li>Pair programming for complex changes</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800 text-lg">Technical Debt Management</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Schedule regular refactoring time</li>
                    <li>Track and visualize technical debt</li>
                    <li>Create standards for new code</li>
                    <li>Allocate 20% time for improvements</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800 text-lg">Observability & Monitoring</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Implement comprehensive logging</li>
                    <li>Create detailed error reporting</li>
                    <li>Set up performance monitoring</li>
                    <li>Establish on-call rotations and processes</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 class="font-medium text-green-800">Implementation Checklist:</h3>
              <div class="mt-2 space-y-2">
                <div class="flex items-center">
                  <input type="checkbox" id="testing" class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <label for="testing" class="ml-2 block text-sm text-green-700">Improve test automation coverage</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="review" class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <label for="review" class="ml-2 block text-sm text-green-700">Enhance code review process</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="debt" class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <label for="debt" class="ml-2 block text-sm text-green-700">Create technical debt management plan</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="observe" class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <label for="observe" class="ml-2 block text-sm text-green-700">Improve observability and monitoring</label>
                </div>
              </div>
            </div>
            
            <p class="italic text-gray-600 border-l-4 border-gray-200 pl-4 py-1">
              "Quality is not a trade-off with speed, but rather its enabler. Teams with high-quality codebases and strong testing practices can confidently move faster over time."
              <span class="block mt-1 text-gray-500">— From "The DevOps Handbook"</span>
            </p>
          </div>
        `,
        action: 'Continue to next step',
        tips: [
          'Balance immediate fixes with long-term quality improvements',
          'Measure quality metrics before and after changes',
          'Celebrate quality improvements as much as feature deliveries',
          'Build quality checks into your CI/CD pipeline'
        ],
        quiz: {
          question: 'What percentage of time should ideally be allocated for technical debt reduction and system improvements?',
          options: [
            '5%',
            '10%',
            '20%',
            '50%'
          ],
          correctIndex: 2,
          explanation: 'Industry best practices suggest allocating around 20% of development time for technical debt reduction, refactoring, and system improvements. This "20% time" helps balance short-term feature delivery with long-term codebase health.'
        }
      },
      {
        id: 'impact-improvements',
        title: 'Impact Dimension Improvements',
        description: 'Connect engineering work to business outcomes',
        content: `
          <div class="space-y-4">
            <p>The Impact dimension connects engineering work to business outcomes. Here are proven approaches to improve impact:</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-amber-800 text-lg">Business Outcome Alignment</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Connect tickets/stories to business goals</li>
                    <li>Include "why" context in requirements</li>
                    <li>Track feature outcomes vs. just completion</li>
                    <li>Implement OKRs that connect to code</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-amber-800 text-lg">Feature Instrumentation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Build analytics into all new features</li>
                    <li>Create dashboards for feature usage</li>
                    <li>Set success metrics before building</li>
                    <li>Implement A/B testing capabilities</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-amber-800 text-lg">Customer Feedback Loops</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Involve developers in customer research</li>
                    <li>Share customer feedback directly with teams</li>
                    <li>Implement direct feedback mechanisms</li>
                    <li>Create rapid iteration cycles</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-amber-800 text-lg">Business Metric Visibility</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Share business metrics with engineers</li>
                    <li>Connect engineering activities to revenue</li>
                    <li>Calculate ROI of engineering investments</li>
                    <li>Celebrate business impact achievements</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div class="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <h3 class="font-medium text-amber-800">Implementation Checklist:</h3>
              <div class="mt-2 space-y-2">
                <div class="flex items-center">
                  <input type="checkbox" id="alignment" class="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                  <label for="alignment" class="ml-2 block text-sm text-amber-700">Connect work items to business outcomes</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="analytics" class="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                  <label for="analytics" class="ml-2 block text-sm text-amber-700">Implement feature usage analytics</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="feedback" class="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                  <label for="feedback" class="ml-2 block text-sm text-amber-700">Create customer feedback loops</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="metrics" class="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                  <label for="metrics" class="ml-2 block text-sm text-amber-700">Share business metrics with engineering teams</label>
                </div>
              </div>
            </div>
            
            <p class="italic text-gray-600 border-l-4 border-gray-200 pl-4 py-1">
              "The best engineers understand the 'why' behind their work. When developers see how their code impacts business outcomes, engagement and innovation naturally increase."
              <span class="block mt-1 text-gray-500">— From "Developer Experience Impact" by Laura Tacho</span>
            </p>
          </div>
        `,
        action: 'Complete Phase 2',
        tips: [
          'Start by making business metrics visible to all developers',
          'Include customer impact stories in team meetings',
          'Build analytics into features from the beginning',
          'Create regular opportunities for developers to interact with users'
        ],
        quiz: {
          question: 'What is a key practice for improving the impact dimension of developer experience?',
          options: [
            'Focusing exclusively on technical metrics',
            'Keeping business metrics separate from engineering teams',
            'Connecting work items directly to business outcomes',
            'Prioritizing feature delivery speed over customer feedback'
          ],
          correctIndex: 2,
          explanation: 'A key practice for improving the impact dimension is connecting engineering work items directly to business outcomes. This gives developers context on why their work matters, helps prioritize the most valuable work, and creates alignment between development activities and business goals.'
        }
      }
    ]
  },
  {
    id: 'measurement',
    title: 'Phase 3: Measurement',
    description: 'Track and analyze improvements across all dimensions',
    steps: [
      {
        id: 'metrics-dashboards',
        title: 'Creating Metrics Dashboards',
        description: 'Build visualizations that provide insights across all dimensions',
        content: `
          <div class="space-y-4">
            <p>Effective measurement requires clear visualization of your Core 4 metrics. When creating dashboards:</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 class="font-semibold text-gray-800">Balance All Dimensions</h3>
                <p class="text-sm text-gray-700">Include metrics from all four Core 4 dimensions to avoid optimization of one area at the expense of others</p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 class="font-semibold text-gray-800">Show Trends Over Time</h3>
                <p class="text-sm text-gray-700">Display historical data to highlight improvement trajectories rather than just point-in-time measurements</p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 class="font-semibold text-gray-800">Create Team-Level Views</h3>
                <p class="text-sm text-gray-700">Allow filtering by team while avoiding individual performance comparisons</p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 class="font-semibold text-gray-800">Include Benchmarks</h3>
                <p class="text-sm text-gray-700">Show target values and industry benchmarks as reference points</p>
              </div>
            </div>
            
            <p>Sample metrics to include in your dashboard:</p>
            
            <table class="min-w-full border border-gray-200 bg-white text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="border-b border-gray-200 px-4 py-2 text-left font-medium text-gray-500">Dimension</th>
                  <th class="border-b border-gray-200 px-4 py-2 text-left font-medium text-gray-500">Primary Metrics</th>
                  <th class="border-b border-gray-200 px-4 py-2 text-left font-medium text-gray-500">Secondary Metrics</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="px-4 py-2 font-medium text-blue-800">Speed</td>
                  <td class="px-4 py-2">
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Deployment Frequency</li>
                      <li>Lead Time for Changes</li>
                    </ul>
                  </td>
                  <td class="px-4 py-2">
                    <ul class="list-disc pl-5 space-y-1">
                      <li>PR Size</li>
                      <li>PR Cycle Time</li>
                      <li>Build Time</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-2 font-medium text-purple-800">Effectiveness</td>
                  <td class="px-4 py-2">
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Flow State Ratio</li>
                      <li>Developer Satisfaction</li>
                    </ul>
                  </td>
                  <td class="px-4 py-2">
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Meeting Hours/Week</li>
                      <li>Context Switching Frequency</li>
                      <li>Time to Onboard</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-2 font-medium text-green-800">Quality</td>
                  <td class="px-4 py-2">
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Change Failure Rate</li>
                      <li>Mean Time to Restore</li>
                    </ul>
                  </td>
                  <td class="px-4 py-2">
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Test Coverage</li>
                      <li>Technical Debt Ratio</li>
                      <li>Bug Escape Rate</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-2 font-medium text-amber-800">Impact</td>
                  <td class="px-4 py-2">
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Feature Adoption Rate</li>
                      <li>Business Value Delivered</li>
                    </ul>
                  </td>
                  <td class="px-4 py-2">
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Customer Satisfaction</li>
                      <li>Revenue Impact</li>
                      <li>Feature Usage Growth</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 class="font-medium text-blue-800">Dashboard Tools:</h3>
              <p class="text-sm text-blue-700 mt-1">Choose tools that allow for easy data integration and visualization:</p>
              <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-blue-700">
                <li>For engineering metrics: GitHub Insights, GitLab Analytics, Azure DevOps Dashboard</li>
                <li>For business metrics: Looker, Tableau, PowerBI</li>
                <li>For custom dashboards: Grafana, Datadog, New Relic</li>
                <li>For DX-specific: LinearB, Haystack, Swarmia</li>
              </ul>
            </div>
          </div>
        `,
        action: 'Continue to next step',
        tips: [
          'Start with a simple dashboard and iterate',
          'Ensure metrics are accessible to all team members',
          'Automate data collection where possible',
          'Review and discuss metrics regularly in team meetings'
        ],
        quiz: {
          question: 'Which approach is recommended when creating metrics dashboards?',
          options: [
            'Focus primarily on speed metrics as they\'re most important',
            'Create individual performance comparisons to motivate developers',
            'Display only current values to simplify the dashboard',
            'Include metrics from all four dimensions with historical trends'
          ],
          correctIndex: 3,
          explanation: 'When creating metrics dashboards, you should include metrics from all four Core 4 dimensions (Speed, Effectiveness, Quality, and Impact) and display historical trends over time. This provides a balanced view and shows improvement trajectories rather than just point-in-time measurements.'
        }
      },
      {
        id: 'regular-reviews',
        title: 'Conducting Regular Reviews',
        description: 'Establish a cadence for reviewing metrics and making adjustments',
        content: `
          <div class="space-y-4">
            <p>Regular reviews of your Core 4 metrics are essential for continuous improvement. Here's how to structure your review process:</p>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 class="font-semibold text-gray-800">Review Cadence</h3>
              <div class="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white p-3 rounded border border-gray-100">
                  <p class="font-medium text-gray-700">Weekly</p>
                  <ul class="list-disc pl-5 mt-1 text-sm text-gray-600 space-y-1">
                    <li>Quick team check-ins</li>
                    <li>Speed and quality metrics</li>
                    <li>Blockers and issues</li>
                  </ul>
                </div>
                <div class="bg-white p-3 rounded border border-gray-100">
                  <p class="font-medium text-gray-700">Monthly</p>
                  <ul class="list-disc pl-5 mt-1 text-sm text-gray-600 space-y-1">
                    <li>Detailed team reviews</li>
                    <li>All four dimensions</li>
                    <li>Trend analysis</li>
                  </ul>
                </div>
                <div class="bg-white p-3 rounded border border-gray-100">
                  <p class="font-medium text-gray-700">Quarterly</p>
                  <ul class="list-disc pl-5 mt-1 text-sm text-gray-600 space-y-1">
                    <li>Organization-wide review</li>
                    <li>ROI calculation</li>
                    <li>Strategic adjustments</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <p>A structured review meeting should include these components:</p>
            
            <div class="space-y-3">
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center bg-gray-200 rounded-full h-6 w-6 text-gray-800 mr-3 flex-shrink-0 mt-0.5">1</span>
                <div>
                  <h4 class="font-medium text-gray-800">Metrics Review</h4>
                  <p class="text-sm text-gray-700">Examine all Core 4 metrics, noting changes and trends. Highlight any metrics that are improving or declining significantly.</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center bg-gray-200 rounded-full h-6 w-6 text-gray-800 mr-3 flex-shrink-0 mt-0.5">2</span>
                <div>
                  <h4 class="font-medium text-gray-800">Root Cause Analysis</h4>
                  <p class="text-sm text-gray-700">For metrics that are off-target, dig into the root causes. Use techniques like the "5 Whys" to identify underlying issues.</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center bg-gray-200 rounded-full h-6 w-6 text-gray-800 mr-3 flex-shrink-0 mt-0.5">3</span>
                <div>
                  <h4 class="font-medium text-gray-800">Success Celebration</h4>
                  <p class="text-sm text-gray-700">Recognize and celebrate improvements and achievements. Share success stories and give credit to the team.</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center bg-gray-200 rounded-full h-6 w-6 text-gray-800 mr-3 flex-shrink-0 mt-0.5">4</span>
                <div>
                  <h4 class="font-medium text-gray-800">Adjustment Planning</h4>
                  <p class="text-sm text-gray-700">Identify actions to address issues or further improve metrics. Assign owners and deadlines for each action item.</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center bg-gray-200 rounded-full h-6 w-6 text-gray-800 mr-3 flex-shrink-0 mt-0.5">5</span>
                <div>
                  <h4 class="font-medium text-gray-800">Goals Revision</h4>
                  <p class="text-sm text-gray-700">Periodically reassess and adjust goals based on progress and changing priorities. Ensure goals remain challenging but achievable.</p>
                </div>
              </div>
            </div>
            
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <h3 class="font-medium text-yellow-800">Common Review Pitfalls to Avoid:</h3>
              <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-yellow-700">
                <li><span class="font-medium">Over-focusing on a single dimension</span> - Always review all four dimensions together</li>
                <li><span class="font-medium">Blame culture</span> - Focus on system improvements, not individual performance</li>
                <li><span class="font-medium">Analysis paralysis</span> - Balance discussion with action-oriented outcomes</li>
                <li><span class="font-medium">Ignoring context</span> - Consider external factors that may affect metrics (e.g., holidays, product launches)</li>
              </ul>
            </div>
            
            <p class="italic text-gray-600 border-l-4 border-gray-200 pl-4 py-1">
              "The most powerful improvements come from teams who regularly review their metrics, openly discuss challenges, and collaboratively develop solutions."
              <span class="block mt-1 text-gray-500">— Laura Tacho, DX Core 4 Framework Creator</span>
            </p>
          </div>
        `,
        action: 'Continue to next step',
        tips: [
          'Make review meetings action-oriented with clear follow-ups',
          'Involve the whole team in metrics reviews',
          'Keep the focus on system improvements, not individual blame',
          'Document decisions and action items from each review'
        ],
        quiz: {
          question: 'What is a recommended cadence for detailed team reviews of all four Core 4 dimensions?',
          options: [
            'Daily',
            'Weekly',
            'Monthly',
            'Annually'
          ],
          correctIndex: 2,
          explanation: 'Monthly reviews are recommended for detailed team analysis of all four Core 4 dimensions. This provides enough time to see meaningful trends while still allowing for timely adjustments. Weekly reviews are typically focused on speed and quality metrics, while quarterly reviews tend to be more strategic and organization-wide.'
        }
      },
      {
        id: 'roi-calculation',
        title: 'Calculating DX ROI',
        description: 'Quantify the business impact of your DX improvements',
        content: `
          <div class="space-y-4">
            <p>Calculating the return on investment (ROI) of your DX Core 4 implementation helps justify continued investment and demonstrate business value:</p>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 class="font-semibold text-gray-800">ROI Calculation Formula</h3>
              <div class="mt-2 bg-white p-3 rounded border border-gray-100">
                <p class="font-mono text-sm">
                  ROI = (Value of Benefits - Cost of Implementation) / Cost of Implementation × 100%
                </p>
              </div>
            </div>
            
            <p>To calculate DX ROI effectively, quantify these components:</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-800 text-lg">Cost Components</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Tool and infrastructure investments</li>
                    <li>Training and education expenses</li>
                    <li>Consultant or coach fees</li>
                    <li>Time spent implementing changes</li>
                    <li>Temporary productivity dips during transition</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-800 text-lg">Benefit Components</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Developer productivity gains</li>
                    <li>Reduced defect remediation costs</li>
                    <li>Faster time-to-market value</li>
                    <li>Increased revenue from features</li>
                    <li>Reduced turnover and hiring costs</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <p>Example ROI calculations by dimension:</p>
            
            <div class="space-y-3">
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center bg-blue-100 rounded-full h-6 w-6 text-blue-800 mr-3 flex-shrink-0 mt-0.5">S</span>
                <div>
                  <h4 class="font-medium text-blue-800">Speed ROI Example</h4>
                  <p class="text-sm text-gray-700">If deployment frequency increases from bi-weekly to daily, calculate the value of getting features to market 13× faster. For a product generating $10M annually, each day of delay costs ~$27K in potential revenue.</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center bg-purple-100 rounded-full h-6 w-6 text-purple-800 mr-3 flex-shrink-0 mt-0.5">E</span>
                <div>
                  <h4 class="font-medium text-purple-800">Effectiveness ROI Example</h4>
                  <p class="text-sm text-gray-700">If context switching is reduced by 30%, calculate the productivity gain. For a team of 20 developers at $150K avg salary, a 30% productivity gain equals ~$900K in annual value.</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center bg-green-100 rounded-full h-6 w-6 text-green-800 mr-3 flex-shrink-0 mt-0.5">Q</span>
                <div>
                  <h4 class="font-medium text-green-800">Quality ROI Example</h4>
                  <p class="text-sm text-gray-700">If defect rates decrease by 40%, calculate support cost savings and customer retention improvement. For a SaaS product, this might mean $500K in support savings and $1.2M in reduced churn.</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center bg-amber-100 rounded-full h-6 w-6 text-amber-800 mr-3 flex-shrink-0 mt-0.5">I</span>
                <div>
                  <h4 class="font-medium text-amber-800">Impact ROI Example</h4>
                  <p class="text-sm text-gray-700">If feature adoption increases by 25%, calculate the revenue impact. For a product with usage-based pricing, this might translate to $2M in additional annual recurring revenue.</p>
                </div>
              </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 class="font-medium text-blue-800">ROI Communication Tips:</h3>
              <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-blue-700">
                <li>Present ROI in terms that resonate with executives (revenue, cost savings, market share)</li>
                <li>Use visuals to demonstrate before/after improvements</li>
                <li>Include both quantitative metrics and qualitative benefits</li>
                <li>Compare your ROI to industry benchmarks when available</li>
                <li>Document assumptions in your calculations for transparency</li>
              </ul>
            </div>
            
            <p class="italic text-gray-600 border-l-4 border-gray-200 pl-4 py-1">
              "Organizations implementing the Core 4 framework typically see 3-5x ROI within the first year. The compounding effects of improvements across all dimensions create value greater than the sum of individual changes."
              <span class="block mt-1 text-gray-500">— From "The Business Value of Developer Experience"</span>
            </p>
          </div>
        `,
        action: 'Complete Phase 3',
        tips: [
          'Be conservative in your benefit estimates to maintain credibility',
          'Include both hard savings (direct costs) and soft benefits (productivity)',
          'Calculate ROI at both team and organization levels',
          'Update your ROI calculations quarterly as more data becomes available'
        ],
        quiz: {
          question: 'What is the typical ROI range that organizations see in the first year of implementing the Core 4 framework?',
          options: [
            '1-2x ROI',
            '3-5x ROI',
            '8-10x ROI',
            'ROI is typically negative in the first year'
          ],
          correctIndex: 1,
          explanation: 'Organizations implementing the DX Core 4 framework typically see a 3-5x ROI within the first year. This means that for every dollar invested in improving developer experience across the four dimensions, they receive $3-5 in value through productivity gains, quality improvements, faster delivery, and business impact.'
        }
      }
    ]
  }
];

export default function InteractiveTutorial() {
  const [activePhase, setActivePhase] = useState<string>(tutorialPhases[0].id);
  const [activeStep, setActiveStep] = useState<string>(tutorialPhases[0].steps[0].id);
  const [progress, setProgress] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  // Calculate the current step and phase
  const currentPhaseIndex = tutorialPhases.findIndex(phase => phase.id === activePhase);
  const currentPhase = tutorialPhases[currentPhaseIndex];
  const currentStepIndex = currentPhase.steps.findIndex(step => step.id === activeStep);
  const currentStep = currentPhase.steps[currentStepIndex];

  // Calculate total steps for progress bar
  const totalSteps = tutorialPhases.reduce((acc, phase) => acc + phase.steps.length, 0);
  const completedSteps = tutorialPhases.slice(0, currentPhaseIndex).reduce((acc, phase) => acc + phase.steps.length, 0) + currentStepIndex + 1;

  // Update progress when step changes
  React.useEffect(() => {
    setProgress((completedSteps / totalSteps) * 100);
  }, [completedSteps, totalSteps]);

  // Handle next step
  const handleNextStep = () => {
    // If there are more steps in the current phase
    if (currentStepIndex < currentPhase.steps.length - 1) {
      setActiveStep(currentPhase.steps[currentStepIndex + 1].id);
    }
    // If there are more phases
    else if (currentPhaseIndex < tutorialPhases.length - 1) {
      setActivePhase(tutorialPhases[currentPhaseIndex + 1].id);
      setActiveStep(tutorialPhases[currentPhaseIndex + 1].steps[0].id);
    }
  };

  // Handle quiz answer
  const handleQuizAnswer = (stepId: string, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [stepId]: answerIndex });
    setShowExplanation({ ...showExplanation, [stepId]: true });
  };

  // Check if answer is correct
  const isAnswerCorrect = (stepId: string) => {
    const step = tutorialPhases.flatMap(phase => phase.steps).find(s => s.id === stepId);
    return step?.quiz?.correctIndex === quizAnswers[stepId];
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">DX Core 4 Framework Interactive Tutorial</h1>
          <p className="mt-2 text-gray-600 max-w-3xl mx-auto">
            Learn how to implement the DX Core 4 framework in your organization with this step-by-step tutorial.
            Each phase will guide you through understanding, implementing, and measuring developer experience improvements.
          </p>
        </div>

        <div className="flex items-center mb-8">
          <div className="w-full">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Progress</span>
              <span className="text-sm font-medium text-gray-500">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-800">Tutorial Phases</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-4">
                  {tutorialPhases.map((phase, index) => (
                    <li key={phase.id}>
                      <button
                        onClick={() => {
                          setActivePhase(phase.id);
                          setActiveStep(phase.steps[0].id);
                        }}
                        className={`w-full text-left flex items-center p-2 rounded-md ${activePhase === phase.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        <span className={`inline-flex items-center justify-center rounded-full h-6 w-6 mr-3 flex-shrink-0 ${activePhase === phase.id
                          ? 'bg-blue-100 text-blue-700'
                          : currentPhaseIndex > index
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                          }`}>
                          {currentPhaseIndex > index ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                        </span>
                        <span className="font-medium">{phase.title}</span>
                      </button>

                      {activePhase === phase.id && (
                        <ul className="mt-2 ml-9 space-y-1">
                          {phase.steps.map((step, stepIndex) => (
                            <li key={step.id}>
                              <button
                                onClick={() => setActiveStep(step.id)}
                                className={`text-left w-full p-1.5 text-sm rounded ${activeStep === step.id
                                  ? 'bg-blue-50 text-blue-700 font-medium'
                                  : 'text-gray-600 hover:bg-gray-50'
                                  }`}
                              >
                                {step.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h2 className="text-2xl font-semibold text-gray-800">{currentStep.title}</h2>
                <p className="mt-1 text-gray-600">{currentStep.description}</p>
              </div>

              <div className="p-6">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: currentStep.content }} />

                {currentStep.tips && currentStep.tips.length > 0 && (
                  <div className="mt-6 bg-amber-50 border border-amber-100 rounded-lg p-4">
                    <h3 className="flex items-center text-amber-800 font-medium">
                      <CircleHelp className="h-5 w-5 mr-2" />
                      Pro Tips
                    </h3>
                    <ul className="mt-2 space-y-1">
                      {currentStep.tips.map((tip, index) => (
                        <li key={index} className="text-amber-700 text-sm flex items-start">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 mr-2 flex-shrink-0"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentStep.quiz && (
                  <div className="mt-8 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-3">Knowledge Check</h3>
                    <p className="text-gray-700 mb-4">{currentStep.quiz.question}</p>

                    <div className="space-y-2">
                      {currentStep.quiz.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(currentStep.id, index)}
                          disabled={quizAnswers[currentStep.id] !== undefined}
                          className={`w-full text-left p-3 rounded-md border ${quizAnswers[currentStep.id] === index
                            ? (isAnswerCorrect(currentStep.id)
                              ? 'border-green-200 bg-green-50 text-green-800'
                              : 'border-red-200 bg-red-50 text-red-800')
                            : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                            }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {showExplanation[currentStep.id] && (
                      <div className={`mt-4 p-3 rounded-md ${isAnswerCorrect(currentStep.id)
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                        }`}>
                        <p className="font-medium mb-1">
                          {isAnswerCorrect(currentStep.id) ? 'Correct!' : 'Incorrect'}
                        </p>
                        <p className="text-sm">{currentStep.quiz.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (currentStepIndex > 0) {
                      setActiveStep(currentPhase.steps[currentStepIndex - 1].id);
                    } else if (currentPhaseIndex > 0) {
                      const prevPhase = tutorialPhases[currentPhaseIndex - 1];
                      setActivePhase(prevPhase.id);
                      setActiveStep(prevPhase.steps[prevPhase.steps.length - 1].id);
                    }
                  }}
                  disabled={currentPhaseIndex === 0 && currentStepIndex === 0}
                >
                  Previous
                </Button>

                <Button
                  onClick={handleNextStep}
                  disabled={
                    (currentStep.quiz && quizAnswers[currentStep.id] === undefined) ||
                    (currentPhaseIndex === tutorialPhases.length - 1 &&
                      currentStepIndex === currentPhase.steps.length - 1)
                  }
                  className="flex items-center"
                >
                  {currentStep.action}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>

            {currentPhaseIndex === tutorialPhases.length - 1 &&
              currentStepIndex === currentPhase.steps.length - 1 && (
                <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <Trophy className="h-8 w-8" />
                  </div>
                  <h2 className="text-xl font-semibold text-blue-800 mb-2">Congratulations!</h2>
                  <p className="text-blue-700 max-w-xl mx-auto">
                    You've completed the DX Core 4 framework tutorial. You now have the knowledge to implement
                    and measure developer experience improvements across all four dimensions. Continue your journey
                    by exploring our case studies and advanced visualization tools.
                  </p>
                  <div className="mt-6">
                    <Button asChild className="mr-4">
                      <a href="/artifacts/dashboard">Explore the Dashboard</a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/artifacts/case-studies">View Case Studies</a>
                    </Button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </Layout>
  );
}