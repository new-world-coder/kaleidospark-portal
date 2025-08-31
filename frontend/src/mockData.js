// Mock data for KaleidoSpark website

export const services = [
  {
    id: 1,
    title: "AI Strategy & Readiness",
    description: "Roadmaps aligned with business goals, maturity assessments, and governance frameworks.",
    icon: "target",
    color: "accent-purple",
    outcomes: ["Prioritized initiatives", "Executive alignment", "Reduced risk of wasted spend"],
    proof: "Retail client achieved 12% inventory efficiency gains within 9 months of roadmap execution."
  },
  {
    id: 2,
    title: "Process Transformation & Automation",
    description: "Streamlined operations through AI + RPA integration and workflow optimization.",
    icon: "settings",
    color: "accent-blue",
    outcomes: ["Automated workflows", "Cost reduction", "Improved efficiency"],
    proof: "Manufacturing client reduced operational costs by 25% through intelligent automation."
  },
  {
    id: 3,
    title: "GenAI & Copilots",
    description: "Secure, domain-specific copilots that accelerate knowledge work and decision-making.",
    icon: "brain",
    color: "accent-orange",
    outcomes: ["Accelerated knowledge work", "Domain expertise", "Secure deployment"],
    proof: "Healthcare network improved clinical documentation efficiency by 40%."
  },
  {
    id: 4,
    title: "Data, MLOps & Governance",
    description: "Reliable data pipelines and compliance-first AI infrastructure and monitoring.",
    icon: "database",
    color: "accent-pink",
    outcomes: ["Reliable pipelines", "GDPR compliance", "Scalable infrastructure"],
    proof: "Fintech client achieved 99.9% data pipeline reliability with full regulatory compliance."
  },
  {
    id: 5,
    title: "Training & Change Management",
    description: "Upskilling people so transformation sticks through comprehensive training programs.",
    icon: "users",
    color: "accent-green",
    outcomes: ["Team upskilling", "Change adoption", "Cultural transformation"],
    proof: "Enterprise client achieved 85% AI tool adoption rate across 500+ employees."
  }
];

export const industries = [
  {
    id: 1,
    name: "Retail",
    description: "Smarter demand forecasting and personalization",
    icon: "shopping-cart",
    color: "accent-purple",
    challenges: ["Inventory optimization", "Customer personalization", "Demand prediction"],
    solutions: ["AI-powered forecasting", "Personalization engines", "Customer analytics"],
    outcomes: ["Reduced stockouts", "Increased conversion", "Better margins"],
    proof: "Retail client reduced $8M in lost sales with AI forecasting."
  },
  {
    id: 2,
    name: "Manufacturing",
    description: "Predictive maintenance and automation",
    icon: "factory",
    color: "accent-blue",
    challenges: ["Equipment downtime", "Quality control", "Supply chain optimization"],
    solutions: ["Predictive maintenance", "Digital twins", "Process automation"],
    outcomes: ["Reduced downtime", "Quality improvement", "Cost savings"],
    proof: "Manufacturing client achieved 30% reduction in unplanned downtime."
  },
  {
    id: 3,
    name: "Healthcare",
    description: "HIPAA-aligned, patient-first AI",
    icon: "heart",
    color: "accent-orange",
    challenges: ["Rising costs", "Regulatory scrutiny", "Fragmented data"],
    solutions: ["Predictive analytics", "Patient engagement copilots", "Compliant data governance"],
    outcomes: ["Reduced readmissions", "Faster diagnostics", "HIPAA compliance"],
    proof: "Healthcare network reduced claims errors by 15% with AI governance framework."
  },
  {
    id: 4,
    name: "Real Estate",
    description: "Market intelligence and asset optimization",
    icon: "building",
    color: "accent-pink",
    challenges: ["Market volatility", "Valuation accuracy", "Asset management"],
    solutions: ["Market analytics", "Valuation models", "Portfolio optimization"],
    outcomes: ["Better valuations", "Risk reduction", "Optimized portfolios"],
    proof: "Real estate firm improved valuation accuracy by 22% using AI models."
  },
  {
    id: 5,
    name: "Fintech",
    description: "Fraud detection and regulatory-ready AI",
    icon: "credit-card",
    color: "accent-green",
    challenges: ["Fraud detection", "Regulatory compliance", "Risk management"],
    solutions: ["ML fraud detection", "Compliance automation", "Risk modeling"],
    outcomes: ["Reduced fraud", "Regulatory compliance", "Better risk management"],
    proof: "Fintech client reduced fraud losses by 45% while maintaining compliance."
  }
];

export const caseStudies = [
  {
    id: 1,
    title: "Retail Inventory Optimization",
    industry: "Retail",
    challenge: "Global retailer struggling with $8M in lost sales due to stockouts and overstock situations across 200+ locations.",
    approach: "Implemented AI-powered demand forecasting with real-time inventory optimization and automated replenishment systems.",
    outcome: "Reduced lost sales by $8M annually, improved inventory turnover by 35%, and achieved 95% stock availability.",
    testimonial: "KaleidoSpark was the first firm that delivered AI with both speed and governance. Their approach transformed our supply chain.",
    client: "VP of Operations, Global Retail Chain",
    metrics: ["$8M in recovered sales", "35% inventory improvement", "95% availability"]
  },
  {
    id: 2,
    title: "Healthcare Claims Processing",
    industry: "Healthcare",
    challenge: "Healthcare network facing 25% claims error rate leading to delayed payments and compliance risks.",
    approach: "Deployed AI-powered claims validation with automated error detection and HIPAA-compliant data processing.",
    outcome: "Reduced claims errors by 15%, accelerated processing time by 60%, and maintained full HIPAA compliance.",
    testimonial: "The governance framework they built gave us confidence to scale AI across sensitive healthcare data.",
    client: "Chief Technology Officer, Healthcare Network",
    metrics: ["15% error reduction", "60% faster processing", "100% HIPAA compliance"]
  },
  {
    id: 3,
    title: "Manufacturing Predictive Maintenance",
    industry: "Manufacturing",
    challenge: "Equipment downtime costing $2M annually with traditional reactive maintenance approaches.",
    approach: "Implemented IoT sensors and predictive analytics to forecast equipment failures and optimize maintenance schedules.",
    outcome: "Reduced unplanned downtime by 30%, saved $1.2M in maintenance costs, and improved OEE by 18%.",
    testimonial: "Their predictive maintenance solution paid for itself in the first year while improving our operations.",
    client: "Plant Manager, Manufacturing Company",
    metrics: ["30% downtime reduction", "$1.2M cost savings", "18% OEE improvement"]
  }
];

export const teamMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Founder & CEO",
    bio: "Former McKinsey Principal with 12+ years in AI strategy and digital transformation. Led $100M+ AI initiatives.",
    image: "/api/placeholder/300/300",
    linkedin: "#",
    expertise: ["AI Strategy", "Digital Transformation", "Enterprise Architecture"]
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Head of AI Engineering",
    bio: "Ex-Google AI researcher specializing in responsible AI implementation and MLOps at enterprise scale.",
    image: "/api/placeholder/300/300",
    linkedin: "#",
    expertise: ["Machine Learning", "MLOps", "Responsible AI"]
  },
  {
    id: 3,
    name: "Dr. Aisha Patel",
    role: "Head of Data Governance",
    bio: "Former Deloitte partner with expertise in GDPR, HIPAA, and EU AI Act compliance frameworks.",
    image: "/api/placeholder/300/300",
    linkedin: "#",
    expertise: ["Data Governance", "Compliance", "Risk Management"]
  }
];

export const resources = [
  {
    id: 1,
    title: "AI Readiness Toolkit",
    description: "Comprehensive assessment framework and implementation roadmap for enterprise AI adoption.",
    type: "PDF Guide",
    downloadUrl: "#",
    category: "Strategy"
  },
  {
    id: 2,
    title: "RFP Template for AI Projects",
    description: "Battle-tested template for evaluating AI vendors and solutions with compliance considerations.",
    type: "Word Document",
    downloadUrl: "#",
    category: "Procurement"
  },
  {
    id: 3,
    title: "Prompt Engineering Playbook",
    description: "Best practices and templates for effective prompt engineering across business functions.",
    type: "PDF Playbook",
    downloadUrl: "#",
    category: "Implementation"
  }
];

export const events = [
  {
    id: 1,
    title: "Responsible AI in Healthcare",
    date: "2025-02-15",
    time: "2:00 PM EST",
    type: "Webinar",
    description: "Learn how to implement AI in healthcare while maintaining HIPAA compliance and patient trust.",
    registrationUrl: "#"
  },
  {
    id: 2,
    title: "AI Strategy Workshop for Retail",
    date: "2025-02-28",
    time: "10:00 AM EST",
    type: "Workshop",
    description: "Hands-on workshop for retail executives on building AI roadmaps that drive ROI.",
    registrationUrl: "#"
  }
];

// Contact form submission (mock)
export const submitContactForm = async (formData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      resolve({ success: true, message: 'Thank you! We\'ll be in touch within 24 hours.' });
    }, 1000);
  });
};

// Newsletter subscription (mock)
export const subscribeNewsletter = async (email) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Newsletter subscription:', email);
      resolve({ success: true, message: 'Successfully subscribed to our newsletter!' });
    }, 800);
  });
};

// Discovery call booking (mock)
export const bookDiscoveryCall = async (bookingData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Discovery call booked:', bookingData);
      resolve({ success: true, message: 'Discovery call booked! You\'ll receive a calendar invite shortly.' });
    }, 1200);
  });
};