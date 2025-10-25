'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, FileText, Link, BarChart3, Lightbulb, FileSignature, MessageSquare, Globe } from 'lucide-react'

export default function Home() {
  const [language, setLanguage] = useState('english')
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobLink, setJobLink] = useState('')
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null)
  const [jobInputMethod, setJobInputMethod] = useState<'url' | 'upload'>('url')
  const [compatibilityScore, setCompatibilityScore] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isJobDragging, setIsJobDragging] = useState(false)
  const [coverLetterTone, setCoverLetterTone] = useState<'professional' | 'enthusiastic' | 'formal'>('professional')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const jobFileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setResumeFile(file)
      }
    }
  }

  const handleJobDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsJobDragging(true)
  }

  const handleJobDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsJobDragging(false)
  }

  const handleJobDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsJobDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'text/plain') {
        setJobDescriptionFile(file)
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setResumeFile(files[0])
    }
  }

  const handleJobFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setJobDescriptionFile(files[0])
    }
  }

  const analyzeResume = async () => {
    if (!resumeFile || (!jobLink && !jobDescriptionFile)) return
    
    setIsAnalyzing(true)
    
    try {
      const formData = new FormData()
      formData.append('resume', resumeFile)
      if (jobInputMethod === 'url' && jobLink) {
        formData.append('jobLink', jobLink)
      } else if (jobInputMethod === 'upload' && jobDescriptionFile) {
        formData.append('jobDescription', jobDescriptionFile)
      }
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error('Analysis failed')
      }
      
      const result = await response.json()
      
      // Animate the compatibility score
      let progress = 0
      const interval = setInterval(() => {
        progress += 5
        setCompatibilityScore(Math.min(progress, result.compatibilityScore))
        if (progress >= result.compatibilityScore) {
          clearInterval(interval)
          setIsAnalyzing(false)
        }
      }, 100)
      
    } catch (error) {
      console.error('Error analyzing resume:', error)
      setIsAnalyzing(false)
      // Show error toast or message here
    }
  }

  const improveResume = () => {
    // Placeholder for resume improvement logic
    console.log('Improving resume...')
  }

  const generateCoverLetter = () => {
    // Placeholder for cover letter generation
    console.log('Generating cover letter...')
  }

  const content = {
    english: {
      hero: "Get Hired Smarter — Analyze Your Resume Instantly",
      uploadResume: "Upload Your Resume",
      dragDrop: "Drag & drop your resume here or click to browse",
      jobLink: "Job Posting",
      jobUrl: "Job Posting URL",
      jobUpload: "Upload Job Description",
      analyzeBtn: "Analyze My Resume",
      improveBtn: "Improve Resume",
      coverLetterBtn: "Generate Cover Letter",
      jobFit: "Job Fit",
      recommendations: "Recommendations",
      tailoredResume: "Tailored Resume",
      coverLetter: "Cover Letter",
      compatibility: "Compatibility Score",
      skillsMatch: "Skills Match",
      experienceMatch: "Experience Match",
      educationMatch: "Education Match",
      suggestions: "AI Suggestions",
      chatPlaceholder: "Ask AI for career advice...",
      missingKeywords: "Missing Keywords",
      keyStrengths: "Key Strengths",
      atsOptimization: "ATS Optimization",
      templates: "Resume Templates",
      professional: "Professional",
      enthusiastic: "Enthusiastic",
      formal: "Formal"
    },
    hindi: {
      hero: "स्मार्टर तरीके से नौकरी पाएं — अपना रिज्यूमे तुरंत विश्लेषित करें",
      uploadResume: "अपना रिज्यूमे अपलोड करें",
      dragDrop: "अपना रिज्यूमे यहां खींचें और छोड़ें या ब्राउज़ करने के लिए क्लिक करें",
      jobLink: "नौकरी पोस्टिंग",
      jobUrl: "नौकरी पोस्टिंग URL",
      jobUpload: "नौकरी विवरण अपलोड करें",
      analyzeBtn: "मेरा रिज्यूमे विश्लेषित करें",
      improveBtn: "रिज्यूमे सुधारें",
      coverLetterBtn: "कवर लेटर जेनरेट करें",
      jobFit: "नौकरी फिट",
      recommendations: "सिफारिशें",
      tailoredResume: "कस्टम रिज्यूमे",
      coverLetter: "कवर लेटर",
      compatibility: "कंपैटिबिलिटी स्कोर",
      skillsMatch: "स्किल्स मैच",
      experienceMatch: "अनुभव मैच",
      educationMatch: "शिक्षा मैच",
      suggestions: "AI सुझाव",
      chatPlaceholder: "करियर सलाह के लिए AI से पूछें...",
      missingKeywords: "छूटे हुए कीवर्ड",
      keyStrengths: "मुख्य शक्तियां",
      atsOptimization: "ATS अनुकूलन",
      templates: "रिज्यूमे टेम्पलेट",
      professional: "पेशेवर",
      enthusiastic: "उत्साही",
      formal: "औपचारिक"
    }
  }

  const t = content[language as keyof typeof content]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            JobFit AI
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">हिंदी</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            {t.hero}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'english' 
              ? "AI-powered resume analysis and job matching to help you land your dream job"
              : "AI-संचालित रिज्यूमे विश्लेषण और नौकरी मिलान जो आपको अपनी सपनों की नौकरी पाने में मदद करता है"
            }
          </p>
        </section>

        {/* Upload Section */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Resume Upload */}
          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t.uploadResume}
              </CardTitle>
              <CardDescription>
                {language === 'english' 
                  ? "Upload your resume in PDF or Word format"
                  : "अपना रिज्यूमे PDF या Word फॉर्मेट में अपलोड करें"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragging 
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950' 
                    : 'border-gray-300 hover:border-purple-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-muted-foreground mb-2">{t.dragDrop}</p>
                {resumeFile && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      {resumeFile.name}
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Job Link Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                {t.jobLink}
              </CardTitle>
              <CardDescription>
                {language === 'english' 
                  ? "Paste URL or upload job description"
                  : "URL पेस्ट करें या नौकरी विवरण अपलोड करें"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Toggle between URL and Upload */}
              <div className="flex gap-2 mb-4">
                <Button
                  variant={jobInputMethod === 'url' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setJobInputMethod('url')}
                >
                  {t.jobUrl}
                </Button>
                <Button
                  variant={jobInputMethod === 'upload' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setJobInputMethod('upload')}
                >
                  {t.jobUpload}
                </Button>
              </div>

              {jobInputMethod === 'url' ? (
                <Input
                  placeholder={language === 'english' ? "https://example.com/job-posting" : "https://example.com/job-posting"}
                  value={jobLink}
                  onChange={(e) => setJobLink(e.target.value)}
                />
              ) : (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                    isJobDragging 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-950' 
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                  onDragOver={handleJobDragOver}
                  onDragLeave={handleJobDragLeave}
                  onDrop={handleJobDrop}
                  onClick={() => jobFileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-muted-foreground mb-2">
                    {language === 'english' 
                      ? "Drag & drop job description or click to browse"
                      : "नौकरी विवरण यहां खींचें और छोड़ें या ब्राउज़ करने के लिए क्लिक करें"
                    }
                  </p>
                  {jobDescriptionFile && (
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">
                        {jobDescriptionFile.name}
                      </p>
                    </div>
                  )}
                </div>
              )}
              <input
                ref={jobFileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleJobFileSelect}
                className="hidden"
              />
              
              {/* Compatibility Score */}
              {compatibilityScore > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4 text-center">{t.compatibility}</h3>
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        className="text-purple-600 transition-all duration-500 ease-out"
                        strokeDasharray="314.16"
                        strokeDashoffset={314.16 - (314.16 * compatibilityScore) / 100}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-purple-600">{compatibilityScore}%</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-wrap gap-4 justify-center mb-12">
          <Button 
            onClick={analyzeResume} 
            disabled={!resumeFile || (!jobLink && !jobDescriptionFile) || isAnalyzing}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {language === 'english' ? "Analyzing..." : "विश्लेषण कर रहे हैं..."}
              </>
            ) : (
              t.analyzeBtn
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={improveResume}
            disabled={!resumeFile}
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            {t.improveBtn}
          </Button>
          <Button 
            variant="outline" 
            onClick={generateCoverLetter}
            disabled={!resumeFile || (!jobLink && !jobDescriptionFile)}
          >
            <FileSignature className="h-4 w-4 mr-2" />
            {t.coverLetterBtn}
          </Button>
        </section>

        {/* Dashboard Tabs */}
        {compatibilityScore > 0 && (
          <section className="mb-12">
            <Tabs defaultValue="job-fit" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="job-fit">{t.jobFit}</TabsTrigger>
                <TabsTrigger value="recommendations">{t.recommendations}</TabsTrigger>
                <TabsTrigger value="tailored-resume">{t.tailoredResume}</TabsTrigger>
                <TabsTrigger value="cover-letter">{t.coverLetter}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="job-fit" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.jobFit} Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{t.skillsMatch}</span>
                            <Badge variant="secondary">85%</Badge>
                          </div>
                          <Progress value={85} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {language === 'english' 
                              ? "JavaScript, React, Node.js, Python, SQL"
                              : "JavaScript, React, Node.js, Python, SQL"
                            }
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{t.experienceMatch}</span>
                            <Badge variant="secondary">78%</Badge>
                          </div>
                          <Progress value={78} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {language === 'english' 
                              ? "5+ years vs required 4+ years"
                              : "5+ वर्ष बनाम आवश्यक 4+ वर्ष"
                            }
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{t.educationMatch}</span>
                            <Badge variant="secondary">92%</Badge>
                          </div>
                          <Progress value={92} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {language === 'english' 
                              ? "Bachelor's in Computer Science"
                              : "कंप्यूटर साइंस में बैचलर"
                            }
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {language === 'english' ? "Technical Skills" : "तकनीकी कौशल"}
                            </span>
                            <Badge variant="secondary">88%</Badge>
                          </div>
                          <Progress value={88} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {language === 'english' 
                              ? "Frontend, Backend, Database, DevOps"
                              : "फ्रंटएंड, बैकएंड, डेटाबेस, DevOps"
                            }
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {language === 'english' ? "Soft Skills" : "सॉफ्ट स्किल्स"}
                            </span>
                            <Badge variant="secondary">82%</Badge>
                          </div>
                          <Progress value={82} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {language === 'english' 
                              ? "Leadership, Communication, Teamwork"
                              : "लीडरशिप, संचार, टीमवर्क"
                            }
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {language === 'english' ? "Certifications" : "प्रमाणपत्र"}
                            </span>
                            <Badge variant="secondary">70%</Badge>
                          </div>
                          <Progress value={70} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {language === 'english' 
                              ? "AWS Certified, Scrum Master"
                              : "AWS प्रमाणित, स्क्रम मास्टर"
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                        {language === 'english' ? "Overall Assessment" : "समग्र मूल्यांकन"}
                      </h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        {language === 'english' 
                          ? "Your profile shows strong alignment with the job requirements. Focus on highlighting your leadership experience and consider adding Python certification to further improve your match score."
                          : "आपकी प्रोफ़ाइल नौकरी की आवश्यकताओं के साथ मजबूत संरेखण दिखाती है। अपने लीडरशिप अनुभव को हाइलाइट करने पर ध्यान केंद्रित करें और अपने मैच स्कोर को और बेहतर बनाने के लिए Python प्रमाणपत्र जोड़ने पर विचार करें।"
                        }
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="recommendations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.recommendations}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Missing Keywords */}
                      <div>
                        <h4 className="font-semibold mb-3 text-red-700 dark:text-red-300">{t.missingKeywords}</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950">
                            Python
                          </Badge>
                          <Badge variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950">
                            Docker
                          </Badge>
                          <Badge variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950">
                            Kubernetes
                          </Badge>
                          <Badge variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950">
                            GraphQL
                          </Badge>
                          <Badge variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950">
                            CI/CD
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {language === 'english' 
                            ? "Adding these keywords to your resume could improve your ATS score by up to 25%."
                            : "अपने रिज्यूमे में इन कीवर्ड्स को जोड़ने से आपका ATS स्कोर 25% तक सुधार सकता है।"
                          }
                        </p>
                      </div>

                      {/* Key Strengths */}
                      <div>
                        <h4 className="font-semibold mb-3 text-green-700 dark:text-green-300">{t.keyStrengths}</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                            <h5 className="font-medium text-green-700 dark:text-green-300 mb-1">
                              {language === 'english' ? "Technical Leadership" : "तकनीकी नेतृत्व"}
                            </h5>
                            <p className="text-xs text-green-600 dark:text-green-400">
                              {language === 'english' 
                                ? "5+ years leading development teams"
                                : "5+ वर्ष विकास टीमों का नेतृत्व"
                              }
                            </p>
                          </div>
                          <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                            <h5 className="font-medium text-green-700 dark:text-green-300 mb-1">
                              {language === 'english' ? "Full-Stack Development" : "फुल-स्टैक डेवलपमेंट"}
                            </h5>
                            <p className="text-xs text-green-600 dark:text-green-400">
                              {language === 'english' 
                                ? "Expert in MERN stack technologies"
                                : "MERN स्टैक तकनीकों में विशेषज्ञ"
                              }
                            </p>
                          </div>
                          <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                            <h5 className="font-medium text-green-700 dark:text-green-300 mb-1">
                              {language === 'english' ? "System Architecture" : "सिस्टम आर्किटेक्चर"}
                            </h5>
                            <p className="text-xs text-green-600 dark:text-green-400">
                              {language === 'english' 
                                ? "Designed scalable microservices"
                                : "स्केलेबल माइक्रोसर्विसेस डिज़ाइन किए"
                              }
                            </p>
                          </div>
                          <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                            <h5 className="font-medium text-green-700 dark:text-green-300 mb-1">
                              {language === 'english' ? "Performance Optimization" : "प्रदर्शन अनुकूलन"}
                            </h5>
                            <p className="text-xs text-green-600 dark:text-green-400">
                              {language === 'english' 
                                ? "40% improvement in system performance"
                                : "सिस्टम प्रदर्शन में 40% सुधार"
                              }
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* ATS Optimization */}
                      <div>
                        <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">{t.atsOptimization}</h4>
                        <div className="space-y-3">
                          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                            <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                              {language === 'english' ? "Format Optimization" : "फॉर्मेट अनुकूलन"}
                            </h5>
                            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                              <li>• {language === 'english' ? "Use standard section headings" : "मानक अनुभाग शीर्षक का उपयोग करें"}</li>
                              <li>• {language === 'english' ? "Avoid tables and columns" : "टेबल और कॉलम से बचें"}</li>
                              <li>• {language === 'english' ? "Use bullet points for achievements" : "उपलब्धियों के लिए बुलेट पॉइंट्स का उपयोग करें"}</li>
                            </ul>
                          </div>
                          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                            <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                              {language === 'english' ? "Keyword Strategy" : "कीवर्ड रणनीति"}
                            </h5>
                            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                              <li>• {language === 'english' ? "Include job-specific keywords naturally" : "नौकरी-विशिष्ट कीवर्ड्स को प्राकृतिक रूप से शामिल करें"}</li>
                              <li>• {language === 'english' ? "Use variations of key terms" : "मुख्य शब्दों के विविधताओं का उपयोग करें"}</li>
                              <li>• {language === 'english' ? "Match job description language" : "नौकरी विवरण भाषा से मेल खाएं"}</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Resume Improvement Suggestions */}
                      <div className="space-y-4">
                        <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                            {language === 'english' ? "Add Python certification" : "Python प्रमाणपत्र जोड़ें"}
                          </h4>
                          <p className="text-sm text-purple-600 dark:text-purple-400">
                            {language === 'english' 
                              ? "The job posting mentions Python as a preferred skill. Consider adding a Python certification to boost your profile."
                              : "नौकरी पोस्टिंग में Python को एक पसंदीदा कौशल के रूप में उल्लिखित किया गया है। अपनी प्रोफ़ाइल को बढ़ावा देने के लिए Python प्रमाणपत्र जोड़ने पर विचार करें।"
                            }
                          </p>
                        </div>
                        
                        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                            {language === 'english' ? "Highlight leadership experience" : "लीडरशिप अनुभव को हाइलाइट करें"}
                          </h4>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            {language === 'english' 
                              ? "Emphasize your team leadership experience in your resume summary."
                              : "अपने रिज्यूमे सारांश में अपने टीम लीडरशिप अनुभव पर जोर दें।"
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tailored-resume" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.tailoredResume}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Template Selection */}
                      <div>
                        <h4 className="font-semibold mb-3">{t.templates}</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="p-4 border rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                            <div className="h-32 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded mb-3 flex items-center justify-center">
                              <FileText className="h-8 w-8 text-blue-600" />
                            </div>
                            <h5 className="font-medium mb-1">
                              {language === 'english' ? "Professional" : "पेशेवर"}
                            </h5>
                            <p className="text-xs text-muted-foreground">
                              {language === 'english' 
                                ? "Clean, corporate-friendly design"
                                : "साफ, कॉर्पोरेट-अनुकूल डिज़ाइन"
                              }
                            </p>
                          </div>
                          <div className="p-4 border rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                            <div className="h-32 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded mb-3 flex items-center justify-center">
                              <FileText className="h-8 w-8 text-green-600" />
                            </div>
                            <h5 className="font-medium mb-1">
                              {language === 'english' ? "Modern" : "आधुनिक"}
                            </h5>
                            <p className="text-xs text-muted-foreground">
                              {language === 'english' 
                                ? "Contemporary, creative layout"
                                : "समकालीन, रचनात्मक लेआउट"
                              }
                            </p>
                          </div>
                          <div className="p-4 border rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                            <div className="h-32 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded mb-3 flex items-center justify-center">
                              <FileText className="h-8 w-8 text-purple-600" />
                            </div>
                            <h5 className="font-medium mb-1">
                              {language === 'english' ? "Technical" : "तकनीकी"}
                            </h5>
                            <p className="text-xs text-muted-foreground">
                              {language === 'english' 
                                ? "Skills-focused, ATS-optimized"
                                : "कौशल-केंद्रित, ATS-अनुकूलित"
                              }
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Smart Format Suggestions */}
                      <div>
                        <h4 className="font-semibold mb-3">
                          {language === 'english' ? "Smart Format Suggestions" : "स्मार्ट फॉर्मेट सुझाव"}
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                            <h5 className="font-medium text-orange-700 dark:text-orange-300 mb-2">
                              {language === 'english' ? "Section Order" : "अनुभाग क्रम"}
                            </h5>
                            <ol className="text-sm text-orange-600 dark:text-orange-400 space-y-1">
                              <li>1. {language === 'english' ? "Summary" : "सारांश"}</li>
                              <li>2. {language === 'english' ? "Skills" : "कौशल"}</li>
                              <li>3. {language === 'english' ? "Experience" : "अनुभव"}</li>
                              <li>4. {language === 'english' ? "Education" : "शिक्षा"}</li>
                              <li>5. {language === 'english' ? "Certifications" : "प्रमाणपत्र"}</li>
                            </ol>
                          </div>
                          <div className="p-4 bg-teal-50 dark:bg-teal-950 rounded-lg">
                            <h5 className="font-medium text-teal-700 dark:text-teal-300 mb-2">
                              {language === 'english' ? "Layout Tips" : "लेआउट टिप्स"}
                            </h5>
                            <ul className="text-sm text-teal-600 dark:text-teal-400 space-y-1">
                              <li>• {language === 'english' ? "Use consistent spacing" : "सुसंगत रिक्ति का उपयोग करें"}</li>
                              <li>• {language === 'english' ? "Highlight key achievements" : "मुख्य उपलब्धियों को हाइलाइट करें"}</li>
                              <li>• {language === 'english' ? "Keep to 1-2 pages" : "1-2 पृष्ठों तक सीमित रखें"}</li>
                              <li>• {language === 'english' ? "Use professional fonts" : "पेशेवर फॉन्ट का उपयोग करें"}</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Tailored Resume Content */}
                      <div>
                        <h4 className="font-semibold mb-3">
                          {language === 'english' ? "Optimized Resume Content" : "अनुकूलित रिज्यूमे सामग्री"}
                        </h4>
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                          <pre className="text-sm whitespace-pre-wrap">
                            {language === 'english' 
                              ? `JOHN DOE
Senior Software Engineer

CONTACT
• Email: john.doe@email.com
• Phone: (555) 123-4567
• LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Results-driven Senior Software Engineer with 5+ years of experience in full-stack development and team leadership. Passionate about creating scalable solutions and mentoring junior developers. Expertise in JavaScript, React, Node.js, and cloud technologies.

TECHNICAL SKILLS
• Languages: JavaScript, TypeScript, Python, SQL
• Frontend: React, Next.js, HTML5, CSS3, Tailwind CSS
• Backend: Node.js, Express, MongoDB, PostgreSQL
• Cloud: AWS, Docker, CI/CD
• Tools: Git, Jira, Agile methodologies

PROFESSIONAL EXPERIENCE
Senior Software Engineer | Tech Corp (2020-Present)
• Led a team of 5 developers in building microservices architecture
• Improved system performance by 40% through optimization
• Mentored 3 junior developers, improving team productivity
• Implemented CI/CD pipelines, reducing deployment time by 60%

Software Developer | StartupXYZ (2018-2020)
• Developed RESTful APIs using Node.js and Express
• Collaborated with cross-functional teams to deliver projects
• Built responsive web applications using React and Next.js

EDUCATION
Bachelor of Science in Computer Science
University of Technology (2014-2018)

CERTIFICATIONS
• AWS Certified Developer Associate
• Scrum Master Certification`
                              : `जॉन डो
सीनियर सॉफ्टवेयर इंजीनियर

संपर्क
• ईमेल: john.doe@email.com
• फोन: (555) 123-4567
• LinkedIn: linkedin.com/in/johndoe

पेशेवर सारांश
5+ वर्षों के फुल-स्टैक डेवलपमेंट और टीम लीडरशिप अनुभव के साथ परिणाम-उन्मुख सीनियर सॉफ्टवेयर इंजीनियर। स्केलेबल समाधान बनाने और जूनियर डेवलपर्स को मेंटर करने के लिए उत्साही। JavaScript, React, Node.js, और क्लाउड तकनीकों में विशेषज्ञता।

तकनीकी कौशल
• भाषाएं: JavaScript, TypeScript, Python, SQL
• फ्रंटएंड: React, Next.js, HTML5, CSS3, Tailwind CSS
• बैकएंड: Node.js, Express, MongoDB, PostgreSQL
• क्लाउड: AWS, Docker, CI/CD
• टूल्स: Git, Jira, एजाइल मेथडोलॉजी

पेशेवर अनुभव
सीनियर सॉफ्टवेयर इंजीनियर | टेक कॉर्प (2020-वर्तमान)
• माइक्रोसर्विसेस आर्किटेक्चर बनाने में 5 डेवलपर्स की टीम का नेतृत्व किया
• अनुकूलन के माध्यम से सिस्टम प्रदर्शन 40% बेहतर किया
• 3 जूनियर डेवलपर्स को मेंटर किया, टीम उत्पादकता में सुधार
• CI/CD पाइपलाइन्स लागू की, डिप्लॉयमेंट समय 60% कम किया

सॉफ्टवेयर डेवलपर | स्टार्टअपXYZ (2018-2020)
• Node.js और Express का उपयोग करके RESTful APIs विकसित किए
• प्रोजेक्ट्स डिलीवर करने के लिए क्रॉस-फंक्शनल टीमों के साथ सहयोग किया
• React और Next.js का उपयोग करके रेस्पॉन्सिव वेब एप्लिकेशन बनाए

शिक्षा
कंप्यूटर साइंस में बैचलर ऑफ साइंस
टेक्नोलॉजी यूनिवर्सिटी (2014-2018)

प्रमाणपत्र
• AWS सर्टिफाइड डेवलपर एसोसिएट
• स्क्रम मास्टर सर्टिफिकेशन`
                            }
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="cover-letter" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.coverLetter}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      <pre className="text-sm whitespace-pre-wrap">
                        {language === 'english' 
                          ? `Dear Hiring Manager,

I am excited to apply for the Senior Software Engineer position at Tech Corp. With over 5 years of experience in full-stack development and a proven track record of leading successful projects, I am confident in my ability to contribute significantly to your team.

In my current role at Tech Corp, I have led a team of 5 developers in implementing microservices architecture that improved system performance by 40%. My experience in mentoring junior developers has also helped me develop strong leadership and communication skills.

I am particularly drawn to this position because of Tech Corp's commitment to innovation and excellence. My technical skills in JavaScript, TypeScript, React, and Node.js align perfectly with your requirements.

I look forward to the opportunity to discuss how my experience and skills can benefit your team.

Sincerely,
John Doe`
                          : `प्रिय भर्ती प्रबंधक,

मैं टेक कॉर्प में सीनियर सॉफ्टवेयर इंजीनियर पद के लिए आवेदन करने के लिए उत्साहित हूं। फुल-स्टैक डेवलपमेंट में 5+ वर्षों के अनुभव और सफल प्रोजेक्ट्स के नेतृत्व के सिद्ध ट्रैक रिकॉर्ड के साथ, मैं अपनी टीम में महत्वपूर्ण योगदान देने की क्षमता में आत्मविश्वासी हूं।

टेक कॉर्प में अपने वर्तमान भूमिका में, मैंने 5 डेवलपर्स की टीम का नेतृत्व किया है जिसने माइक्रोसर्विसेस आर्किटेक्चर लागू किया जिससे सिस्टम प्रदर्शन 40% बेहतर हुआ। जूनियर डेवलपर्स को मेंटर करने का मेरा अनुभव ने मुझे मजबूत लीडरशिप और संचार कौशल विकसित करने में भी मदद की है।

मैं विशेष रूप से इस पद से आकर्षित हूं क्योंकि टेक कॉर्प का नवाचार और उत्कृष्टता के प्रति समर्पण। JavaScript, TypeScript, React, और Node.js में मेरे तकनीकी कौशल आपकी आवश्यकताओं के साथ पूरी तरह से मेल खाते हैं।

मैं इस अवसर का इंतजार कर रहा हूं कि कैसे मेरा अनुभव और कौशल आपकी टीम को लाभ पहुंचा सकता है, इस पर चर्चा करने के लिए।

ईमानदारी से,
जॉन डो`
                        }
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        )}

        {/* AI Chat Suggestions */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {t.suggestions}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-950">
                    {language === 'english' ? "How to improve my resume?" : "मेरा रिज्यूमे कैसे सुधारूं?"}
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-950">
                    {language === 'english' ? "Best skills for tech jobs" : "टेक नौकरियों के लिए सर्वोत्तम कौशल"}
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-950">
                    {language === 'english' ? "Interview preparation tips" : "इंटरव्यू तैयारी टिप्स"}
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-950">
                    {language === 'english' ? "Salary negotiation advice" : "वेतन बातचीत सलाह"}
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    placeholder={t.chatPlaceholder} 
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}